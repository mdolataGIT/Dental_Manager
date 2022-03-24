import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import CreateXrayPhotoButton from "../ClientBoard/Xray/CreateXrayPhotoButton";

const XrayPhotos = () => {
  const [xrayPhotos, setXrayPhotos] = useState([]);
  var url = window.location.href;
  var id = url.substring(url.lastIndexOf("/") + 1);

  const fetchXrayPhotos = () => {
    axios
      .get(`http://localhost:8080/api/xray-photo/${id}`, {
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //   },
      })
      .then((res) => {
        console.log(res);
        setXrayPhotos(res.data);
      });
  };

  useEffect(() => {
    fetchXrayPhotos();
  }, []);

  return xrayPhotos.map((xrayPhoto, index) => {
    return (
      <div className="center" key={index}>
        <h1>{xrayPhoto.description}</h1>
        {xrayPhoto.xrayPhotoId ? (
          <img
            src={`http://localhost:8080/api/xray-photo/${xrayPhoto.xrayPhotoId}/image/download`}
          />
        ) : null}
        <br />
        <Dropzone {...xrayPhoto} />
        <br />
      </div>
    );
  });
};

function Dropzone({ xrayPhotoId }) {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(
        `http://localhost:8080/api/xray-photo/${xrayPhotoId}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/from-data",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
          },
        }
      )
      .then(() => {
        console.log("file uploaded succesfully");
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here ...</p>
      ) : (
        <p>Drag and drop X-ray image, or click to select X-ray image</p>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="photos">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">X-ray images</h1>
            <br />
            <CreateXrayPhotoButton />
            <br />
            <hr />
            <XrayPhotos />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
