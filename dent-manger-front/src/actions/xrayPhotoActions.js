import axios from "axios";
import {
  GET_ERRORS,
  GET_XRAYPHOTO,
  GET_XRAYPHOTOS,
  DELETE_XRAYPHOTO,
} from "./types";

export const createXrayPhoto = (xrayPhoto, history) => async (dispatch) => {
  try {
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf("/") + 1);
    await axios.post(`/api/xray-photo/${id}`, xrayPhoto);
    history.push(`/toPhotos/${id}`);
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const deleteXrayPhoto = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    await axios.delete(`/api/xray-photo/${id}`);
    dispatch({
      type: DELETE_XRAYPHOTO,
      payload: id,
    });
  }
};
