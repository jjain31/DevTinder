import React, { useState } from "react";
import { BASE_URL } from "../utils/const";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserCard from "./UserCard";
import ErrorPage from "./ErrorPage";

const EditProfile = ({ user }) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [age, setage] = useState(user.age);
  const [gender, setgender] = useState(user.gender);
  const [about, setabout] = useState(user.about);
  const [skills, setskills] = useState(user.skills);
  const [photoUrl, setphotoUrl] = useState(user.photoUrl);
  const [showToast, setshowToast] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate;
  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, skills, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setshowToast(true);
      const i = setInterval(() => {
        setshowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
     
    }
  };

  return (
    <div className="flex justify-center  gap-4">
      <div className="flex justify-center items-center my-10">
        <div className="card  bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div>
              <label className="form-control w-full max-w-xs">
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
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setage(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <select
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                  className="select input-bordered w-full max-w-xs"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <textarea
    value={about}
    onChange={(e) => setabout(e.target.value)}
    className="textarea input-bordered w-full max-w-xs"
    placeholder="Bio"
  />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Skills</span>
                </div>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setskills(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Photo Link</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setphotoUrl(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary mt-2 w-2/4"
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-base-300 w-96 shadow-xl my-10">
        <UserCard
          user={{ firstName, lastName, age, gender, about, skills, photoUrl }}
        />
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
export default EditProfile;
