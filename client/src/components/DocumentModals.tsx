import React, { useState } from "react";

export const AccessListModal = () => {
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Access List
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <ul className="list-group">
              <li className="list-group-item">An item</li>
              <li className="list-group-item">A second item</li>
              <li className="list-group-item">A third item</li>
              <li className="list-group-item">A fourth item</li>
              <li className="list-group-item">And a fifth one</li>
            </ul>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AddDocumentModalProps {
  show: boolean;
  handleClose: () => void;
  handleSave: (document: any) => void; // Adjust the type according to your requirements
}

export const AddDocumentModal: React.FC<AddDocumentModalProps> = ({
  show,
  handleClose,
  handleSave,
}) => {
  const [selectedType, setSelectedType] = useState("x-ray");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njc2M2ZhZTVlYjMyZGRhMDY3NjM0MWYiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzIwNjQyMTcxLCJleHAiOjE3MjA3Mjg1NzF9.83H6QGXbi25QnpjijKzvLoutAdSFnnnRilGq5RnhOkE";

      const formData = new FormData();
      formData.append("type", selectedType);
      formData.append("document", file);

      const response = await fetch("http://localhost:3000/document/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.status === 200 || response.status === 201) {
        handleSave(data.document); // Update the document list in parent component
        setSelectedType("x-ray");
        setFile(null);
        handleClose();
      } else {
        console.error("Failed to save document", data);
      }
    } catch (error) {
      console.error("Error saving document", error);
    }
  };

  return (
    <div
      className={`modal fade ${show ? "show d-block" : "d-none"}`}
      id="addDocument"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden={!show}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Add Document
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="type" className="form-label">
                  Document Type
                </label>
                <select
                  className="form-select"
                  id="type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  required
                >
                  <option value="X-ray">X-ray</option>
                  <option value="Prescription">Prescription</option>
                  <option value="Report">Report</option>
                </select>
              </div>
              <div className="mb-3">
                <label>Choose a document to upload</label>
                <br />
                <input type="file" onChange={handleFileChange} required />
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
