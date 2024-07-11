import React from "react";

const LoadingComponent: React.FC = () => {
  return (
    <div className="min-vh-100 h-100 d-flex justify-content-center align-items-center flex-column">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p>Fetching Content</p>
    </div>
  );
};

export default LoadingComponent;
