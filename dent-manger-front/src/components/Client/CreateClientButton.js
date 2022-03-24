import React from "react";
import { Link } from "react-router-dom";

const CreateClientButton = () => {
  return (
    <React.Fragment>
      <Link to="/addClient" className="btn btn-primary">
        <i className="fas fa-plus-circle"> New Patient</i>
      </Link>
    </React.Fragment>
  );
};
export default CreateClientButton;
