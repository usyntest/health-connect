import DocumentList from "./components/DocumentList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="container-lg mt-5 pt-2">
        <DocumentList />
      </div>
    </div>
  );
}

export default App;
