import axios from "axios";
import {
  GET_ERRORS,
  GET_BACKLOG_CLIENT,
  GET_TOOTH,
  DELETE_TOOTH,
} from "./types";

export const addTooth =
  (backlogClient_id, tooth, history) => async (dispatch) => {
    try {
      await axios.post(`/api/backlogClient/${backlogClient_id}`, tooth);
      history.push(`/clientBoard/${backlogClient_id}`);
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

export const getBacklogClient = (backlogClient_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/backlogClient/${backlogClient_id}`);
    dispatch({
      type: GET_BACKLOG_CLIENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getTooth =
  (backlogClient_id, t_id, history) => async (dispatch) => {
    try {
      const res = await axios.get(
        `/api/backlogClient/${backlogClient_id}/${t_id}`
      );
      dispatch({
        type: GET_TOOTH,
        payload: res.data,
      });
    } catch (err) {
      history.push("/dashboard");
    }
  };

export const updateTooth =
  (backlogClient_id, t_id, tooth, history) => async (dispatch) => {
    try {
      await axios.patch(
        `/api/backlogClient/${backlogClient_id}/${t_id}`,
        tooth
      );
      history.push(`/clientBoard/${backlogClient_id}`);
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

export const deleteTooth = (backlogClient_id, t_id) => async (dispatch) => {
  if (
    window.confirm(
      `You are deleting tooth ${t_id}, this action cannot be undone`
    )
  ) {
    await axios.delete(`/api/backlogClient/${backlogClient_id}/${t_id}`);
    dispatch({
      type: DELETE_TOOTH,
      payload: t_id,
    });
  }
};
