import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Tables from "../../components/Tables/Tables";
import Spiner from "../../components/Spiner/Spiner";
import { useContext, useEffect, useState } from "react";
import {
  addData,
  dltData,
  updateData,
} from "../../components/context/ContextProvider";
import Alert from "react-bootstrap/Alert";
import { deletefunc, exporttocsvfunc, usergetfun } from "../../Services/Api";
import { toast } from "react-toastify";

function Home() {
  const [userdata, setUserData] = useState([]);
  const [showspin, setShowSpin] = useState(true);

  const { useradd, setUserAdd } = useContext(addData);
  const { update, setUpdate } = useContext(updateData);
  const { deletedata, setDeleteData } = useContext(dltData);

  // all filter
  const [search, setSearch] = useState();
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");

  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const naviget = useNavigate();
  const adduser = () => {
    naviget("/register");
  };

  //get user
  const  userGet = async () => {
    const response = await usergetfun(search, gender, status, sort,page);
    // console.log(search,gender,status,sort);
    // console.log(response.data.Pagination.pageCount)

    if (response.status === 200) {
      setUserData(response.data.userdata);
      setPageCount(response.data.Pagination.pageCount);
    } else {
      console.log("error form get user data");
    }
  };

  // exportUser
  const exportUser = async () => {
    const response = await exporttocsvfunc();
    console.log(response);
    if (response.status === 200) {
      window.open(response.data.downloadUrl, "blank");
    } else {
      toast.error("error");
    }
  };

  // user delete
  const deleteUser = async (id) => {
    const response = await deletefunc(id);
    if (response.status === 200) {
      userGet();
      setDeleteData(response.data);
    } else {
      toast.error("error");
    }
  };

  // paginations
  // handle pre btn
  // handle next btn
  const handlePrevios = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    });
  };
  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };

  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [search, gender, status, sort,page]);

  return (
    <>
      {useradd ? (
        <Alert variant="success" onClose={() => setUserAdd("")} dismissible>
          {useradd.fname.toUpperCase()} Succesfully Added
        </Alert>
      ) : (
        ""
      )}

      {update ? (
        <Alert variant="success" onClose={() => setUpdate("")} dismissible>
          {update.fname.toUpperCase()} Succesfully Updated
        </Alert>
      ) : (
        ""
      )}
      {deletedata ? (
        <Alert variant="danger" onClose={() => setDeleteData("")} dismissible>
          {deletedata.fname.toUpperCase()} Succesfully Delete
        </Alert>
      ) : (
        ""
      )}

      <Container>
        <div className="main_div">
          {/* search add btn */}
          <div className="search_add mt-3 d-flex justify-content-between">
            <div className="search col-lg-4 ">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="success" className="search_btn">
                  Search
                </Button>
              </Form>
            </div>

            <div className="add_btn">
              <Button variant="primary" onClick={adduser}>
                Add User
              </Button>
            </div>
          </div>
          <hr />

          {/* Export, Gender, sTATUS */}
          <div className="filter_div d-flex justify-content-between flex-wrap">
            <div className="export_csv">
              <Button className="export_btn" onClick={exportUser}>
                Export to Csv
              </Button>
            </div>

            {/* Filter by gender */}
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Gender</h3>
                <div className="gender d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="gender"
                    value={"All"}
                    onChange={(e) => setGender(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* filter by new old */}
            <div className="filter_newold">
              <h3>Short By Value</h3>

              <Dropdown className="text-center">
                <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                  <i className="fa-solid fa-sort"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSort("new")}>
                    New
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("old")}>
                    Old
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* Filter by Status */}
            <div className="filter_status">
              <div className="filter">
                <h3>Filter By Status</h3>
                <div className="gender d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="status"
                    value={"All"}
                    onChange={(e) => setStatus(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={"Active"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="status"
                    value={"InActive"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />

          {showspin ? (
            <Spiner />
          ) : (
            <Tables
            // pagination
              handleNext={handleNext}
              handlePrevios={handlePrevios}
              page={page}
              pageCount={pageCount}
              setPage={setPage}
            // pagination


              userGet={userGet}
              deleteUser={deleteUser}
              userdata={userdata}
            />
          )}

          {/* Table */}
        </div>
      </Container>
    </>
  );
}

export default Home;
