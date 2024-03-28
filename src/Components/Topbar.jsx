import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

function Topbar({ setSearch }) {

  return (
    <div className="h-[10vh] w-screen bg-primary flex justify-between items-center px-5">
      <style jsx>{`
        input::placeholder {
          color: gray;
          padding-left: 10px;
          opacity: 1; /* Firefox */
        }
      `}</style>
      <img src="" alt="Logo" />
      <input
        type="text"
        placeholder="Search"
        className="h-[50%] w-[30%] rounded-full bg-white"
        onChange={(e) => {
            setSearch(e.target.value);
            console.log("Setting search to:", e.target.value);
        }}
          />
      
      <img src="" alt="DP" />
    </div>
  );
}

export default Topbar;
