import { GET_BACKLOG_CLIENT, GET_TOOTH, DELETE_TOOTH } from "../actions/types";

const initialState = {
  teeth: [],
  tooth: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BACKLOG_CLIENT:
      return {
        ...state,
        teeth: action.payload,
      };
    case GET_TOOTH:
      return {
        ...state,
        tooth: action.payload,
      };
    case DELETE_TOOTH:
      return {
        ...state,
        teeth: state.teeth.filter(
          (tooth) => tooth.clientSequence !== action.payload
        ),
      };

    default:
      return state;
  }
}
