interface ErrorComponentProps {
  errorMsg: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ errorMsg }) => (
  <div className="min-vh-100 h-100 d-flex justify-content-center align-items-center flex-column">
    <h2>Error</h2>
    <p>{errorMsg}</p>
  </div>
);

export default ErrorComponent;
