import { combineReducers } from "redux";
import backlogClientReducer from "./backlogClientReducer";
import errorReducer from "./errorReducer";
import clientReducer from "./clientReducer";
import securityReducer from "./securityReducer";
import xrayPhotoReducer from "./xrayPhotoReducer";

export default combineReducers({
  errors: errorReducer,
  client: clientReducer,
  backlogClient: backlogClientReducer,
  security: securityReducer,
  xrayPhoto: xrayPhotoReducer,
});
