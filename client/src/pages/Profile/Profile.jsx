import "./Profile.css";
import myimage from "../../assets/img.png";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spiner from "../../components/Spiner/Spiner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { singleUserGetFunc } from "../../Services/Api";
import { BASE_URL } from "../../Services/Helper";

function Profile() {
  
  const [showspin, setShowSpin] = useState(true);

  const [userprofile , setUserProfile] = useState()

  const {id} = useParams()
  // console.log(id);
  

  const userProfileGet = async()=>{
    const response = await singleUserGetFunc(id)
    // console.log(response);
    if(response.status === 200){
      setUserProfile(response.data)
    }else{
      console.log('error');
      
    }
    
  }


  useEffect(() => {
    userProfileGet()
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, []);

  return (
    <>
    {
      showspin ? <Spiner/>:  <Container>
      <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
        <Card.Body>

          <Row>
            <Col>
              <div className="card-profile-stats d-flex justify-content-center">
                <img src={`${BASE_URL}/uploads/${userprofile.profile}`} alt="" />
              </div>
            </Col>
          </Row>
          <div className="text-center ">
            <h3>{userprofile.fname+userprofile.lname}</h3>
            <h4>
              <i className="fa-solid fa-envelope email"></i>&nbsp; :-
              <span>{userprofile.email}</span>
            </h4>
            <h5>
              <i className="fa-solid fa-mobile-screen-button"></i>&nbsp; :-
              <span>{userprofile.mobile}</span>
            </h5>
            <h5>
              <i className="fa-solid fa-person"></i>&nbsp; :-
              <span>{userprofile.gender}</span>
            </h5>
            <h5>
              <i className="fa-solid fa-location-pin location"></i>&nbsp; :-
              <span>{userprofile.location}</span>
            </h5>
            <h4>
              Status&nbsp;:-
              <span>{userprofile.status}</span>
            </h4>

            <h5>
            <i className="fa-solid fa-calendar-days calendar"></i>
            &nbsp;
             Created Date
              &nbsp; :-
              {/* <span>{moments(userprofile.datecreated).format('DD-MM-YYYY')}</span> */}
              <span>{userprofile.datecreateted}</span>
            </h5>
        
          </div>
        </Card.Body>
      </Card>
    </Container>
    }
     
    </>
  );
}

export default Profile;
