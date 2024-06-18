/* eslint-disable no-unused-vars */

import React from "react";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="bg-white text-gray-800 w-full fixed top-0 z-10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold">PayZap</div>
        <div>
          <Link to="/signup">
            <button className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded mr-4">
              Sign Up
            </button>
          </Link>
          <Link to="/signin">
            <button className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded mr-4">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
