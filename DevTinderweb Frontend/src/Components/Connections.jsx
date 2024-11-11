import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector(store=>store.connection);
  const [error, setError] = useState("");
  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      setError(err?.response?.data || "Something went wrong ");
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);
  if(!connections)return;

  if(connections.length == 0)return ( <div className="flex flex-col items-center justify-center my-10">
          <h1 className="text-2xl font-bold mb-8">Connections</h1>
          <h4 >No Connection Found 😓</h4>
        </div>)
  return (
          <div className="text-center my-6 h-auto">
            <h1 className="text-xl font-bold mb-4">Connections</h1>
            {connections.map((request, index) => {
              const { firstName, lastName, age, gender, photoUrl, about, skills } =
                request;
              return (
                <div key={index} className="flex justify-center">
                  <div className="card card-side bg-base-300 shadow-lg max-w-lg sm:max-w-md w-full p-2 m-3">
                    <figure className="w-1/4 p-2">
                      <img
                        src={photoUrl}
                        alt="photo"
                        className="rounded-lg object-cover w-20 h-20"
                      />
                    </figure>
                    <div className="card-body w-3/4 p-2">
                      <h2 className="card-title text-lg font-semibold text-center mx-auto">
                        {firstName + " " + lastName}
                      </h2>
                      <p className="text-sm text-gray-600">About: {about}</p>
                      {age && gender && (
                        <p className="text-sm text-gray-500">{age + " " + gender}</p>
                      )}
                      {skills.length > 1 && (
                        <p className="text-sm text-gray-500">Skills: {skills}</p>
                      )}
                      
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
};

export default Connections;
