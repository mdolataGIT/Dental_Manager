import { GET_CLIENT, GET_CLIENTS, DELETE_CLIENT } from "../actions/types";

const initialState = {
  clients: [],
  client: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CLIENTS:
      return {
        ...state,
        clients: action.payload,
      };
    case GET_CLIENT:
      return {
        ...state,
        client: action.payload,
      };
    case DELETE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter(
          (client) => client.pesel !== action.payload
        ),
      };
    default:
      return state;
  }
}
