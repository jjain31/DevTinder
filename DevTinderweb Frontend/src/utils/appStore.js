import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice"
import requestReducer from "./requestSlice"
import passwordReducer from "./passwordSlice"
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed : feedReducer,
    connection : connectionReducer,
    requests:requestReducer,
    passwordslice:passwordReducer,

  },
});

export default appStore;
