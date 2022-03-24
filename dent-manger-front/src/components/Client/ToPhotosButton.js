import React from "react";
import { Link } from "react-router-dom";

const ToPhotosButton = () => {
  return (
    <React.Fragment>
      <Link to="/toPhotos" className="btn btn-lg btn-info">
        X-RAY
      </Link>
    </React.Fragment>
  );
};
export default ToPhotosButton;
