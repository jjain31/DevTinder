import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/const";
import axios from "axios";
import { removeUserr } from "../utils/passwordSlice";

const NewPassword = () => {
  const user = useSelector((store) => store.passwordslice);
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const [showToast, setshowToast] = useState(false);
  const [otp, setotp] = useState(null);
  const [error, setError] = useState("");
  const dispatch=useDispatch();
  const emailId=user;
  const sendReset = async () => { 
          try { 
            const res = await axios.patch(
              BASE_URL + "/profile/password/reset",
              {
                emailId,
                otp,
                password,
              },
              {
                withCredentials: true,
              }
            );
            setshowToast(true);
            const i = setInterval(() => {
                    setshowToast(false);
                    navigate("/login");
                    dispatch(removeUserr());
                  }, 3000);
            
        
          } catch (err) {
                setError(err.response.data);
      
          }
        };
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-xl flex justify-center my-10 mx-auto">
        <div className="card-body">
          <h2 className="card-title">Card title!</h2>
          <p>Email Id</p>
          <input
            type="text"
            placeholder="You can't touch this"
            value={user}
            className="input input-bordered w-full max-w-xs"
            disabled
          />
          <p>OTP</p>
          <input
            type="text"
            placeholder="Type here"
            value={otp}
            onChange={(e) => setotp(e.target.value)}
            className="input input-bordered input-md w-full max-w-xs"
          />
          <p>New Password</p>
          <input
            type="password"
            placeholder="Type here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered input-md w-full max-w-xs"
          />
           <p className="text-red-500">{error}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={sendReset}>Submit</button>
          </div>
        </div>
      </div>
      <div className="toast toast-top toast-center">
        {showToast && (
          <div className="alert alert-success">
            <span>Profile Updated Successfuly</span>
          </div>
        )}
      </div>
     
    </div>
  );
};

export default NewPassword;
