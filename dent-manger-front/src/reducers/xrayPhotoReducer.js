import {
  GET_XRAYPHOTO,
  GET_XRAYPHOTOS,
  DELETE_XRAYPHOTO,
} from "../actions/types";

const initialState = {
  xrayphotos: [],
  xrayphoto: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_XRAYPHOTOS:
      return {
        ...state,
        xrayphotos: action.payload,
      };
    case GET_XRAYPHOTO:
      return {
        ...state,
        xrayphoto: action.payload,
      };
    case DELETE_XRAYPHOTO:
      return {
        ...state,
        xrayphotos: state.xrayphotos.filter(
          (xrayphoto) => xrayphoto.pesel !== action.payload
        ),
      };
    default:
      return state;
  }
}
