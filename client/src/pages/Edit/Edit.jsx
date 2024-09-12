import "./Edit.css";
import React, { useState, useEffect, URT, useContext } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import myimg from "../../assets/img.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import Spiner from "../../components/Spiner/Spiner";
import { editfunc, singleUserGetFunc } from "../../Services/Api";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../Services/Helper";
import {  updateData } from "../../components/context/ContextProvider";

function Edit() {
  const naviget = useNavigate();
  const { update, setUpdate } = useContext(updateData)

  const [showspin, setShowSpin] = useState(true);

  const { id } = useParams();

  const [status, setStatus] = useState("Active");

  const [imagedata, setImageData] = useState();
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });
  // console.log(inputdata);

  // status options
  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  // setInput Value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  };

  // status set
  const setStatusValue = (e) => {
    setStatus(e.value);
  };

  // profile image set
  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };

  // console.log(id);

  // geting singler data
  const userProfileGet = async () => {
    const response = await singleUserGetFunc(id);
    // console.log(response);

    if (response.status === 200) {
      setInputData(response.data);
      setStatus(response.data.status);
      setImageData(response.data.profile);
    } else {
      console.log("error");
    }
  };

  // Preview image
  useEffect(() => {
    if (image) {
      setImageData("");
      setPreview(URL.createObjectURL(image));
    }
    userProfileGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [image]);

  // submit user data
  const submitUserData = async (e) => {
    e.preventDefault();

    const { fname, lname, email, mobile, gender, location } = inputdata;

    if (fname === "") {
      toast.error("First name is Required !");
    } else if (lname === "") {
      toast.error("Last name is Required !");
    } else if (email === "") {
      toast.error("Email name is Required !");
    } else if (!email.includes("@")) {
      toast.error("Enter Right Email !");
    } else if (mobile === "") {
      toast.error("Mobile Number is Required !");
    } else if (mobile.length > 10) {
      toast.error("Mobile Number is Required !");
    } else if (gender === "") {
      toast.error("Gender  is Required !");
    } else if (location === "") {
      toast.error("Location is Required !");
    } else if (image === "") {
      toast.error("Image is Required !");
    } else {
      // api call
      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("location", location);
      data.append("status", status);
      data.append("user_profile", image || imagedata);

      const config = {
        "Content-Type": "multipart/form-data",
      };

      // const respons = await registerFunc(data,config)
      const respons = await editfunc(id, data, config);
      console.log(respons);

      if (respons.status == 200) {
     
        setUpdate(respons.data)
        naviget("/");
      } else {
        toast.error("Error !");
      }

    }
  };
  return (
    <>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="container">
          <h2 className="text-center mt-1">Update Register Details</h2>
          <Card className="shadow mt-3 p-3">
            <div className="profile_div text-center">
              <img src={image ? preview : `${BASE_URL}/uploads/${imagedata}`} />
            </div>

            {/* Form */}
            <Form>
              <Row>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Frist Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    value={inputdata.fname}
                    onChange={setInputValue}
                    placeholder="Frist Name"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lname"
                    value={inputdata.lname}
                    onChange={setInputValue}
                    placeholder="Last Name"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={inputdata.email}
                    placeholder="Enter email"
                    onChange={setInputValue}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={inputdata.mobile}
                    placeholder="Mobile Number"
                    onChange={setInputValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Your Gender</Form.Label>
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    checked={inputdata.gender == "Male" ? true : false}
                    onChange={setInputValue}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    checked={inputdata.gender == "Female" ? true : false}
                    onChange={setInputValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Select Status</Form.Label>
                  <Select
                    options={options}
                    default={status}
                    onChange={setStatusValue}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label> Select File</Form.Label>
                  <Form.Control
                    type="file"
                    name="file"
                    onChange={setProfile}
                    placeholder="Select File"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="formBasicEmail"
                >
                  <Form.Label> Enter location</Form.Label>
                  <Form.Control
                    value={inputdata.location}
                    type="text"
                    name="location"
                    placeholder="Enter Address"
                    onChange={setInputValue}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  className=""
                  type="submit"
                  onClick={submitUserData}
                >
                  Submit
                </Button>
              </Row>
            </Form>
          </Card>
          <ToastContainer position="top-right" />
        </div>
      )}
    </>
  );
}

export default Edit;
