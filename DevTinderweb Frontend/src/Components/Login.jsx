import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import  {addUser}  from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/const";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [error,setError]=useState("");
  const[isLoginForm,setIsloginForm]=useState(true);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL+"/login", {
        emailId,
        password,
      },{
        withCredentials:true,
      });
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong ");
      
    }
  };
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL+"/signup", {
        firstName,
        lastName,
        emailId,
        password,
      },{
        withCredentials:true,
      });
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong ");
      
    }
  };
  return (
    <div className="flex justify-center items-center my-10">
      <div className="card  bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
          <div>
          {!isLoginForm && <><label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label> </> }
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Emai ID</span>
              </div>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary mt-2 w-2/4" onClick={isLoginForm?handleLogin:handleSignUp}>{isLoginForm?"Login":"Sign Up"}</button>
          </div>
          <p className="cursor-pointer m-2 text-end" onClick={()=>setIsloginForm(!isLoginForm)}>{isLoginForm ?"New User? SignUp here" :"Existing User? Login Here"}</p>
          <Link to="/password/reset" className="cursor-pointer text-end">Forgot Password</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
