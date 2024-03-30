import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { RiMenuUnfoldLine, RiMenuFoldLine } from "react-icons/ri";
import dp from "../assets/logo.png";
import logo from "../assets/vite.svg";

function Topbar({ setSearch, onComponentClick }) {
  const [size650, setSize650] = useState(false);
  const [size400, setSize400] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchSubmit(e) {
    e.preventDefault();
    setSearch(searchQuery);
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 650) {
        setSize650(true);
      } else {
        setSize650(false);
      }
      if (window.innerWidth < 400) {
        setSize400(true);
      } else {
        setSize400(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleClicked = () => {
    setClicked(!clicked);
    onComponentClick();
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <div className="h-[10vh] z-[999] w-screen bg-primary flex justify-between items-center px-5">
        <style jsx>{`
          input::placeholder {
            color: gray;
            font-size: 0.9rem;
          }
          input:focus {
            outline: none;
          }
        `}</style>
        {size650 && !clicked && (
          <RiMenuUnfoldLine
            className="z-1 text-white text-3xl cursor-pointer"
            onClick={toggleClicked}
          />
        )}
        {size650 && clicked && (
          <RiMenuFoldLine
            className="z-1 text-white text-3xl cursor-pointer"
            onClick={toggleClicked}
          />
        )}
        <img src={logo} className="h-10 w-10" alt="Logo" />
        <div className={`h-[50%] w-[40%] pl-3 rounded-full bg-white flex items-center justify-between ${size400 ? "px-2" : "px-3"} ${
              size650 ? "w-[50%]" : ""
            }`}>
          <input
            type="text"
            placeholder="Search..."
            className={`h-[50%] w-[90%] rounded-full bg-white ${size400 ? "pl-0" : "pl-3"} ${
              size650 ? "w-[50%]" : ""
            }`}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              console.log("Setting search to:", e.target.value);
            }}
          />
          <button type="submit bg-transparent">
            <FiSearch className="text-black text-2xl cursor-pointer" />
          </button>
        </div>

        <img src={dp} className="h-16 w-22 cursor-pointer" alt="DP" />
      </div>
    </form>
  );
}

export default Topbar;
