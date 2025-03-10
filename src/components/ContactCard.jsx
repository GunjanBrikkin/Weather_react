import user from "../images/user.png";
import { Link } from "react-router-dom";

const ContactCard = (props) => {
  const { id, Name, Email } = props.contact;
  console.log("id is ", id);
  console.log(Name);
  console.log(Email);
  console.log("props,",props);
  console.log("props.contact",props.contact)

  return (
    <div className="item" key={id}>
      <img className="ui avtar image" src={user} alt="this pic of user" />
      <div className="content">
        <Link to={`/contact/${id}`} state={{contact:props.contact}}>
          <div className="header">{Name}</div>
          <div>{Email}</div>
        </Link>
      </div>
     
      <Link to="/conact/deleteSurePage" state={{contact :props.contact,id:props.contact.id}}>
     <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px",  marginLeft:"323px" }}
        // onClick={() => props.clickHandler(id)}
      ></i> 
       <Link to="/edit" state={{contact:props.contact}}>
       <i
        className="edit alternate outline icon"
        style={{ color: "blue", marginTop: "7px",  marginLeft:"323px" }}
        // onClick={() => props.clickHandler(id)}
      ></i> 
       </Link>
     </Link>
     
    
    </div>
  );
};

export default ContactCard;
