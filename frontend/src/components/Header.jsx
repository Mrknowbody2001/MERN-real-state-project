// import { current } from "@reduxjs/toolkit";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
            <span className="text-slate-500">Ceylon</span>
            <span className="text-slate-800">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex item-center">
          <input
            type="text"
            placeholder="Search..."
            className="  bg-transparent focus:outline-none w-24 SM:W-64  "
          />
          <FaSearch className="text-slate-600 ml-2" />
        </form>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className=" rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="avatar"
              />
            ) : (
              <li className="sm:inline text-slate-700 hover:underline">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
