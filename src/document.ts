import { S3, GetObjectCommand } from "@aws-sdk/client-s3";
import { Request, Response } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { CustomRequest } from "./user.authentication";
import { Document } from "../models/document";
import { SharedDocument } from "../models/documentShared";

if (
  !process.env.AWS_REGION ||
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY ||
  !process.env.S3_BUCKET_NAME
) {
  throw new Error("Missing required environment variables!");
}

const s3 = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export interface MulterFile extends Express.Multer.File {
  key: string;
  location: string;
}

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req: Request, file: Express.Multer.File, cb) {
      cb(null, `documents/${Date.now()}-${file.originalname}`);
    },
  }),
});

export const uploadDocument = async (req: CustomRequest, res: Response) => {
  try {
    await upload.single("document")(req, res, async (err) => {
      if (err) {
        console.error(`[server]: ${err}`);
        return res.status(500).json({
          status: 500,
          message: "Internal server error: Upload failed",
        });
      }

      const { key, location } = req.file as MulterFile;
      // Upload successful, respond with success message (optional)
      const newDocuement = await Document.create({
        userID: req.user?._id,
        name: req.file?.originalname,
        key,
        type: req.body?.type,
        isPrivate: true,
        documentURL: location,
      });
      return res.status(200).json({
        status: 200,
        message: "Document uploaded successfully",
        document: newDocuement,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const getAllDocuments = async (req: CustomRequest, res: Response) => {
  const userID = req.user?._id;

  try {
    const documentList = await Document.find({
      userID: userID,
    });

    return res.status(200).json({
      status: 200,
      documentList: documentList,
    });
  } catch (error) {
    console.log(`[server]: ${error}`);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export const getDocument = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({
        status: 400,
        message: "Document ID is not given",
      });
    }

    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        status: 404,
        message: "Document not found",
      });
    }

    const command = new GetObjectCommand({
      Bucket: "health-connect", // Ensure this bucket name is correct and properly configured
      Key: document.key, // Ensure this key is correct
    });

    const s3Object = await s3.send(command);

    if (!s3Object.Body) {
      return res.status(404).json({
        status: 404,
        message: "File not found in S3",
      });
    }

    // Set appropriate content headers
    res.setHeader(
      "Content-Type",
      s3Object.ContentType || "application/octet-stream"
    ); // Use ContentType from S3 response
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${document.key}"`
    );

    (s3Object.Body as any).pipe(res);
  } catch (error) {
    console.log(`[server]: ${error}`);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export const shareDocument = async (req: CustomRequest, res: Response) => {
  const userID = req.user?._id;
  const { doctorID, documentID } = req.body;

  if (!(doctorID || documentID)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid request parameters not complete",
    });
  }

  try {
    const newSharedDocument = await SharedDocument.create({
      userID,
      doctorID,
      documentID,
    });

    const changeStatus = await Document.findByIdAndUpdate(documentID, {
      $set: { isPrivate: false },
    });

    console.log(changeStatus);
    if (!changeStatus) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Document successfully shared",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
