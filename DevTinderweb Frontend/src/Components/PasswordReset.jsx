import React, { useState } from "react";
import { BASE_URL } from "../utils/const";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserr } from "../utils/passwordSlice";

const PasswordReset = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailId, setEmailId] = useState("");
  const [error, setError] = useState("");
  const sendReset = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/profile/password/reset",
        {
          emailId,
        },
        {
          withCredentials: true,
        }
      );
      navigate("/newpassword");
      dispatch(addUserr(emailId));
    } catch (err) {
          setError(err?.response?.data=="User not found"?"Invalid email": "Something went wrong");
    }
  };
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-xl my-10 flex justify-center mx-auto">
        <div className="card-body">
          <h2 className="card-title">Reset Password</h2>
          <p>Enter your email id</p>
          <input
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder="Type here"
            className="input input-bordered input-sm w-full max-w-xs"
          />
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={sendReset}>
              Submit
            </button>
          </div>
          
        </div>
      </div>
      
    </div>
  );
};

export default PasswordReset;
