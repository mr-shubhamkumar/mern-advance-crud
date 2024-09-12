import Spinner from "react-bootstrap/Spinner";
function Spiner() {
  return (
    <div
      className="d-flex justify-content-center align-item-center "
      style={{ width: "100%", height: "50%" }}
    >
      <Spinner animation="border" role="status"/>&nbsp;Loading...
    </div>
  );
}

export default Spiner;
