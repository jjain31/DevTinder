import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [error, setError] = useState("");

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {}
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      setError(err.response.data);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;

  if (requests.length == 0)
    return (
      <div className="flex flex-col items-center justify-center my-10">
        <h1 className="text-2xl font-bold mb-8">Requests</h1>
        <h4>No Request Found 😓</h4>
      </div>
    );
  return (
    <div className="text-center my-6 h-auto">
      <h1 className="text-xl font-bold mb-4">Requests</h1>
      {requests.map((request, index) => {
        const { firstName, lastName, age, gender, photoUrl, about, skills } =
          request.fromUserId;
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
                <h2 className="card-title text-lg font-semibold mx-auto">
                  {firstName + " " + lastName}
                </h2>
                <p className="text-sm text-gray-600">About: {about}</p>
                {age && gender && (
                  <p className="text-sm text-gray-500">{age + " " + gender}</p>
                )}
                {skills.length > 1 && (
                  <p className="text-sm text-gray-500">Skills: {skills}</p>
                )}
                <div className="card-actions justify-end mt-2 space-x-2">
                  <button
                    className="btn btn-primary btn-xs"
                    onClick={() => {
                      reviewRequest("accepted", request._id);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-secondary btn-xs"
                    onClick={() => {
                      reviewRequest("rejected", request._id);
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Request;
