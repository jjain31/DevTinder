import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import Feed from "./Feed";
import Connections from "./Connections";
import Request from "./Request";
import PasswordReset from "./PasswordReset";
import NewPassword from "./NewPassword";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/request" element={<Request />} />
            <Route path="/password/reset" element={<PasswordReset />} />
            <Route path="/newpassword" element={<NewPassword/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
