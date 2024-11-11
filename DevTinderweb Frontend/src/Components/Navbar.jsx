import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/const";
import { removeUser } from "../utils/userSlice";
import { Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { removeFeed } from "../utils/feedSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const LoggedOut = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
    } catch (err) {
      <ErrorPage />;
    }
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          DevTinder🧑‍💻
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end mx-5 flex gap-2">
            <p className="text-center m-auto">Welcome, {user.firstName}</p>
            <div tabIndex={0}   role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Photo"
                  src={user.photoUrl}
                  className="w-full rounded-full object-fill"
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/request">Requests</Link>
              </li>
              <li>
                <Link to="/login" onClick={LoggedOut}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
