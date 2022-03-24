import React from "react";
import { Link } from "react-router-dom";

const CreateXrayPhotoButton = () => {
  var url = window.location.href;
  var id = url.substring(url.lastIndexOf("/") + 1);
  return (
    <React.Fragment>
      <Link to={`/addPhoto/${id}`} className="btn btn-lg btn-info">
        <i className="fas fa-plus-circle"> New X-ray</i>
      </Link>
    </React.Fragment>
  );
};
export default CreateXrayPhotoButton;
