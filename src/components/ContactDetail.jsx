import user from "../images/project_boy.jpg";
import { useLocation } from "react-router-dom";
import ContactList from "./ContactList";
import {Link} from "react-router-dom";

const ContactDetail = (props) => {
  const location = useLocation();
  console.log("location is  ==>",location)
  const { contact } = location.state || {};
  console.log("Contact details:", contact); // Debugging
 const {Name ,  Email} = contact;
  return (
    <div className="main" style={{ marginTop: "70px" }}>
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{Name}</div>
          <div className="description">{Email}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
        <button className="ui button blue center">Back To Conatct List</button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
