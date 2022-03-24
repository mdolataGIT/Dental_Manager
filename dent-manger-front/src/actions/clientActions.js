import axios from "axios";
import { GET_ERRORS, GET_CLIENT, GET_CLIENTS, DELETE_CLIENT } from "./types";

export const createClient = (client, history) => async (dispatch) => {
  try {
    await axios.post("/api/client", client);
    history.push("/dashboard");
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

export const getClients = () => async (dispatch) => {
  const res = await axios.get("/api/client/all");
  dispatch({
    type: GET_CLIENTS,
    payload: res.data,
  });
};

export const getClient = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/client/${id}`);
    dispatch({
      type: GET_CLIENT,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteClient = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    await axios.delete(`/api/client/${id}`);
    dispatch({
      type: DELETE_CLIENT,
      payload: id,
    });
  }
};
