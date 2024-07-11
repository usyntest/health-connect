import React, { useState, useEffect } from "react";
import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";
import { AccessListModal, AddDocumentModal } from "./DocumentModals";

interface Document {
  _id: string;
  name: string;
  isPrivate: boolean;
  type: string;
  documentURL: string;
  updatedAt: string;
}

const DocumentList: React.FC = () => {
  const [documentList, setDocumentList] = useState<Document[]>([]);
  const [error, setError] = useState({
    error: false,
    errorMsg: "",
  });
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc2M2ZhZTVlYjMyZGRhMDY3NjM0MWYiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzIwNjQyMTcxLCJleHAiOjE3MjA3Mjg1NzF9.83H6QGXbi25QnpjijKzvLoutAdSFnnnRilGq5RnhOkE";

    fetch("http://localhost:3000/document/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.status !== 200) {
          setError({
            error: true,
            errorMsg: data.message,
          });
        } else {
          setDocumentList(data.documentList);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError({
          error: true,
          errorMsg: err.message,
        });
      });
  }, []);

  const handleSaveDocument = (document: Document) => {
    setDocumentList([...documentList, document]);
    setShowAddModal(false);
  };

  if (loading) {
    return <LoadingComponent />;
  }

  if (error.error) {
    return <ErrorComponent errorMsg={error.errorMsg} />;
  }

  return (
    <div className="container-fluid">
      <h1 className="mt-5 mb-3">Medical Document Repository</h1>
      <button
        type="button"
        className="btn btn-info my-3"
        onClick={() => setShowAddModal(true)}
      >
        Add Document <i className="bi bi-cloud-plus"></i>
      </button>

      <table className="table table-hover ">
        <caption>List of Documents</caption>
        <thead className="">
          <tr className="text-uppercase">
            <th className="text-secondary-emphasis" scope="col">
              Name
            </th>
            <th className="text-secondary-emphasis" scope="col">
              Last Modified
            </th>
            <th className="text-secondary-emphasis" scope="col">
              Shared
            </th>
            <th className="text-secondary-emphasis" scope="col">
              Type
            </th>
            <th className="text-secondary-emphasis" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {documentList.map((document) => (
            <tr key={document._id}>
              <td className="text-secondary">{document.name}</td>
              <td className="text-secondary">
                {`${new Date(document.updatedAt).getHours()}:${new Date(
                  document.updatedAt
                ).getMinutes()} ${new Date(
                  document.updatedAt
                ).getDate()}-${new Date(
                  document.updatedAt
                ).getMonth()}-${new Date(document.updatedAt).getFullYear()}`}
              </td>
              <td className="text-secondary">
                {document.isPrivate ? "Private" : "Shared"}
              </td>
              <td className="text-secondary">{document.type}</td>
              <td className="text-secondary">
                <i
                  className="bi bi-person-plus me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                ></i>
                <i className="bi bi-trash mx-2"></i>
                <i className="bi bi-eye mx-2"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AccessListModal />
      <AddDocumentModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleSave={handleSaveDocument}
      />
    </div>
  );
};

export default DocumentList;
