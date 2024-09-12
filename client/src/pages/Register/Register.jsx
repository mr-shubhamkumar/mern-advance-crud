import  { useState, useEffect, useContext } from "react";
import {useNavigate}  from "react-router-dom"
import "./Register.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import myimg from "../../assets/img.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spiner from "../../components/Spiner/Spiner";


import {registerFunc} from "../../Services/Api"
import { addData } from "../../components/context/ContextProvider";

function Register() {
  const [showspin, setShowSpin] = useState(true);

  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  const naviget = useNavigate();

  const {useradd,setUserAdd} = useContext(addData)

  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });
console.log(inputdata);

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

  // Preview image
  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    }

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
    } else if (mobile.length < 10) {
      toast.error("Mobile Number is Required !");
    } else if (gender === "") {
      toast.error("Gender  is Required !");
    } else if (location === "") {
      toast.error("Location is Required !");
    } else if (image === "") {
      toast.error("Image is Required !");
    } else {
      
      const data = new FormData()
      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("location",location)
      data.append("status",status)
      data.append("user_profile",image)

      // Call Api

      //Header
      const config ={
        "Content-Type":"multipart/form-data"
      }
      console.log(data);
      

     // const respons = await registerFunc(data,config)
      const respons = await registerFunc(data,config)
     

     if (respons.status == 200) {
      setInputData({
        ...inputdata,
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        gender: "",
        location: "",
      })
      setStatus("")
      setImage("")
      setUserAdd(respons.data)
      naviget('/')
     }else{
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
          <h2 className="text-center mt-1">Register Your Details</h2>
          <Card className="shadow mt-3 p-3">
            <div className="profile_div text-center">
              <img src={preview ? preview : myimg} />
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
                    type="number"
                    
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
                    onChange={setInputValue}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
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
                    name="user_profile"
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

export default Register;
