import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/const";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {

  const { _id,firstName, lastName, photoUrl, age, skills, about, gender } = user;
  const dispatch=useDispatch();
  const handleSendRequest = async(status,_id)=>{
    try{
      const res = await axios.post(BASE_URL +"/request/send/"+status+"/"+ _id,{},{withCredentials:true});
      dispatch(removeFeed(_id));
  
    }catch(err){

    }
  }

  return (
    <div className="card bg-base-300 w-full max-w-md shadow-xl rounded-lg overflow-hidden">
      <figure className="w-full p-4">
        <img
          src={user.photoUrl}
          alt="Profile Picture"
          className="w-full h-auto object-cover rounded-lg"
        />
      </figure>
      <div className="card-body p-6">
        <h2 className="card-title text-center text-2xl font-bold mb-2">
          {firstName + " " + lastName}
        </h2>

        {age && (
          <p className=" text-center mb-1 text-sm">
            <span className="font-medium">Age:</span> {age}
          </p>
        )}

        {gender>1 && (
          <p className=" text-center mb-1 text-sm">
            <span className="font-medium">Gender:</span> {gender}
          </p>
        )}

        {skills.length>1 && (
          <p className=" text-center mb-1 text-sm break-words whitespace-normal">
            <span className="font-medium">Skills:</span> {skills}
          </p>
        )}

        {about.length>1 && (
          <p className="text-center mb-1 text-sm break-words whitespace-normal">
            <span className="font-medium">About:</span> {about}
          </p>
        )}

        <div className="card-actions flex justify-center gap-4 mt-4">
          <button className="btn btn-primary px-4 py-2" onClick={
            ()=>{
              handleSendRequest("ignored",_id);
            }
          }>Ignore</button>
          <button className="btn btn-secondary px-4 py-2" onClick={
            ()=>{
              handleSendRequest("interested",_id);
            }
          }>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
