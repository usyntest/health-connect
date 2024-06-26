import { S3Client } from "@aws-sdk/client-s3";
import { Request, Response } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { CustomRequest } from "./user.authentication";
import { Document } from "../models/document";

if (
  !process.env.AWS_REGION ||
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY ||
  !process.env.S3_BUCKET_NAME
) {
  throw new Error("Missing required environment variables!");
}

const s3 = new S3Client({
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
      cb(null, `${Date.now()}-${file.originalname}`);
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
        isPrivate: req.body?.isPrivate,
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
