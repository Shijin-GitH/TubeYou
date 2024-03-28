import React, { useState } from "react";
import { GoHome, GoHistory } from "react-icons/go";
import { BsClockHistory } from "react-icons/bs";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { RiSettings3Line } from "react-icons/ri";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import Topbar from "./Topbar";
import { useContext } from "react";
import { SearchContext } from "./SearchContext";

function Navbar() {
  const { setSearch } = useContext(SearchContext);
  const [currentItem, setCurrentItem] = useState(0);
  const navItems = [
    "Home",
    "Watch Later",
    "Library",
    "History",
    "Settings",
    "Help",
    "Send Feedback",
  ];
  const navIcons = [
    <GoHome />,
    <BsClockHistory />,
    <MdOutlineVideoLibrary />,
    <GoHistory />,
    <RiSettings3Line />,
    <AiOutlineQuestionCircle />,
    <FiSend />,
  ];

  return (
    <div className="Navbar w-[15vw] absolute">
      <Topbar setSearch={setSearch} />
      <div className="h-[90vh] pt-[2vh] w-[15vw] bg-primary flex flex-col">
        <ul>
          {navItems.map((item, index) => (
            <div
              className={`py-1.5 my-1 pl-5 mr-2 hover:bg-yellow-50 text-white hover:text-black rounded-r-xl flex items-center space-x-2 cursor-pointer ${index === currentItem ? 'bg-yellow-50 text-black' : ''}`}
              onClick={() => setCurrentItem(index)}
            >
              {navIcons[index]}
              <li key={index}>{item}</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
