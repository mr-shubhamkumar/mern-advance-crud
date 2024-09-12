import "./Tables.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import { BASE_URL } from "../../Services/Helper";
import { NavLink, useNavigate } from "react-router-dom";
import { statuschangefunc } from "../../Services/Api";
import { toast } from "react-toastify";
import Paginations from "../Paginations/Paginations";


function Tables({
  handleNext,
  handlePrevios,
  page,
  pageCount,
  setPage,
  userGet,
  deleteUser,
  userdata,
}) {
  const handleChange = async (id, status) => {
    const response = await statuschangefunc(id, status);
    if (response.status === 200) {
      userGet();
      toast.success("Status Update");
    } else {
      toast.error("error");
    }
  };
  return (
    <>
      <Container>
        <Row>
          <Col className="">
            <Card className="shadow">
              <Table className="aling-item-center">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>Id</th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {userdata.length > 0 ? (
                    userdata.map((item, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index + 1 + (page - 1)* 4}</td>
                            <td>{item.fname + item.lname}</td>
                            <td>{item.email}</td>
                            <td>{item.gender == "Male" ? "M" : "F"}</td>
                            <td className="d-flex align-item-center">
                              <Dropdown className="text-center">
                                <Dropdown.Toggle
                                  className="dropdown_btn"
                                  id="dropdown-basic"
                                >
                                  <Badge
                                    bg={
                                      item.status == "Active"
                                        ? "primary"
                                        : "danger"
                                    }
                                  >
                                    {item.status}
                                    <i className="fa-solid fa-angle-down"></i>
                                  </Badge>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleChange(item._id, "Active")
                                    }
                                  >
                                    Active
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleChange(item._id, "InActive")
                                    }
                                  >
                                    InActive
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                            <td className="img_parent">
                              <img
                                src={`${BASE_URL}/uploads/${item.profile}`}
                                alt=""
                              />
                            </td>

                            <td className="d-flex align-item-center">
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="light"
                                  className="dropdown_btn"
                                  id="dropdown-basic"
                                >
                                  <i className="fa-solid fa-ellipsis-vertical dots"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <NavLink
                                      to={`/userprofile/${item._id}`}
                                      className="text-decoration-none"
                                    >
                                      <i
                                        className="fa-solid fa-eye"
                                        style={{
                                          color: "green",
                                          fontSize: "12px",
                                        }}
                                      ></i>
                                      <span>&nbsp; View</span>
                                    </NavLink>
                                  </Dropdown.Item>

                                  <Dropdown.Item>
                                    <NavLink
                                      to={`/edit/${item._id}`}
                                      className="text-decoration-none"
                                    >
                                      <i
                                        className="fa-solid fa-pen-to-square"
                                        style={{
                                          color: "blue",
                                          fontSize: "12px",
                                        }}
                                      ></i>
                                      <span style={{ textDecoration: "none" }}>
                                        {" "}
                                        &nbsp; Edite
                                      </span>
                                    </NavLink>
                                  </Dropdown.Item>

                                  <Dropdown.Item>
                                    <div onClick={() => deleteUser(item._id)}>
                                      <i
                                        className="fa-solid fa-trash"
                                        style={{
                                          color: "red",
                                          fontSize: "12px",
                                        }}
                                      ></i>
                                      <span> &nbsp; Delete</span>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <div className="no_data text-center"> NO DATA FOUND</div>
                  )}
                </tbody>
              </Table>
              <Paginations
               handleNext={handleNext}
               handlePrevios={handlePrevios}
               page={page}
               pageCount={pageCount}
               setPage={setPage}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Tables;
