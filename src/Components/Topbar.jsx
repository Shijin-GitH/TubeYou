import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { RiMenuUnfoldLine, RiMenuFoldLine } from "react-icons/ri";
import dp from "../assets/logo.png";
import logo from "../assets/vite.svg";

function Topbar({ setSearch, onComponentClick }) {
  const [size650, setSize650] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 650) {
        setSize650(true);
      } else {
        setSize650(false);
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
    <div className="h-[10vh] z-[999] w-screen bg-primary flex justify-between items-center px-5">
      <style jsx>{`
        input::placeholder {
          color: gray;
          opacity: 1; /* Firefox */
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
      <input
        type="text"
        placeholder="Search"
        className={`h-[50%] w-[30%] pl-3 rounded-full bg-white ${
          size650 ? "w-[50%]" : ""
        }`}
        onChange={(e) => {
          setSearch(e.target.value);
          console.log("Setting search to:", e.target.value);
        }}
      />

      <img src={dp} className="h-16 w-22 cursor-pointer" alt="DP" />
    </div>
  );
}

export default Topbar;
