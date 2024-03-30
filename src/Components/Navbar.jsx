import React, { useState, useEffect } from "react";
import { GoHome, GoHistory } from "react-icons/go";
import { BsClockHistory } from "react-icons/bs";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { RiSettings3Line } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import Topbar from "./Topbar";
import { useContext } from "react";
import { SearchContext } from "./SearchContext";

function Navbar({ setSelectedChannel }) {
  const { setSearch } = useContext(SearchContext);
  const [currentItem, setCurrentItem] = useState(0);
  const [size900, setSize900] = useState(false);
  const [size650, setSize650] = useState(false);
  const [size450, setSize450] = useState(false);
  const [size1000, setSize1000] = useState(false);
  const [translate, setTranslate] = useState(false);

  const toggleTranslate = () => {
    setTranslate(!translate);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setSize900(true);
      } else {
        setSize900(false);
      }
      if (window.innerWidth < 650) {
        setSize650(true);
      } else {
        setSize650(false);
      }
      if (window.innerWidth < 450) {
        setSize450(true);
      } else {
        setSize450(false);
      }
      if (window.innerWidth < 1000) {
        setSize1000(true);
      } else {
        setSize1000(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    "Home",
    "Watch Later",
    "Library",
    "History",
    "Settings",
    "Send Feedback",
  ];
  const navIcons = [
    <GoHome
      className={`${size900 ? "text-[20px]" : ""} ${
        size650 ? "text-[15px]" : ""
      }`}
    />,
    <BsClockHistory
      className={`${size900 ? "text-[20px]" : ""} ${
        size650 ? "text-[15px]" : ""
      }`}
    />,
    <MdOutlineVideoLibrary
      className={`${size900 ? "text-[20px]" : ""} ${
        size650 ? "text-[15px]" : ""
      }`}
    />,
    <GoHistory
      className={`${size900 ? "text-[20px]" : ""} ${
        size650 ? "text-[15px]" : ""
      }`}
    />,
    <RiSettings3Line
      className={`${size900 ? "text-[20px]" : ""} ${
        size650 ? "text-[15px]" : ""
      }`}
    />,
    <FiSend
      className={`${size900 ? "text-[20px]" : ""} ${
        size650 ? "text-[15px]" : ""
      }`}
    />,
  ];

  const channelName = [
    "Mrwhosetheboss",
    "Veritasium",
    "Viva La Dirt League",
    "Shroud",
    "NoCopyright Sounds",
  ];
  const channelDp = [
    "https://yt3.ggpht.com/enyLBm1Sy8mVRXJJLWHT2z64nqxJGt2g61A9xnxpUjO2YAUovHaY_JT3rnAg0j6Qij9iaHQlAg=s68-c-k-c0x00ffffff-no-rj",
    "https://yt3.ggpht.com/ytc/AIdro_looi5tB_pSLZrhB7PQs1ovQOaJ0lYap3uA51jhSA=s68-c-k-c0x00ffffff-no-rj",
    "https://yt3.ggpht.com/ytc/AIdro_noBXoCmJA3QZ1CS71nl2PCYlYU8ihd7DgIrbXtbg=s68-c-k-c0x00ffffff-no-rj",
    "https://yt3.ggpht.com/ytc/AIdro_niY5P7XbsaAxlxeBMARgIEsVq6sHNOkZMKFyolrQ=s68-c-k-c0x00ffffff-no-rj",
    "https://yt3.ggpht.com/YIBi8NVC87fMfJHfQ2O0dyzjis7tUlO7VqWLhk1lq1fkIOQTrpX_Ip7G6S_u0IJosXYSe_Z9=s68-c-k-c0x00ffffff-no-rj",
  ];

  return (
    <div className={`Navbar h-screen w-[15vw] z-0`}>
      <Topbar setSearch={setSearch} onComponentClick={toggleTranslate} />
      <div
        className={`h-screen pt-[2vh] bg-primary flex flex-col transition  ease-in-out  ${
          size650 ? "-translate-x-96 w-[50vw]" : ""
        } ${translate ? "translate-x-0" : ""} ${
          size900 ? "w-[20vw] text-sm" : ""
          } ${size650 ? "w-[25vw] text-[10px]" : ""}
          ${size1000 ? "w-[20vw]" : ""}`}
      >
        <ul>
          {navItems.map((item, index) => (
            <div
              className={`py-1.5 my-1 pl-5 mr-2 hover:bg-yellow-50  hover:text-black rounded-r-xl flex items-center space-x-2 cursor-pointer ${
                index === currentItem ? "bg-yellow-50 text-black" : "text-white"
              } ${translate ? " -ml-1" : ""}`}
              onClick={() => {
                setCurrentItem(index);
                if (index === 0) setSelectedChannel(null);
              }}
            >
              {navIcons[index]}
              <li key={index}>{item}</li>
            </div>
          ))}
        </ul>
        <h2 className="text-white pl-5 py-3 text-md font-semibold">
          Subscriptions
        </h2>
        <div className={`flex flex-col py-3 `} >
          {channelName.map((name, index) => (
            <div
              className="flex items-center space-x-2 py-1.5 pl-5 hover:bg-gray-800 rounded-r-xl cursor-pointer"
              onClick={() => setSelectedChannel(name)}
            >
              <div
                className="channel-dp rounded-full h-[32px] w-[32px]"
                style={{
                  backgroundImage: `url(${channelDp[index]})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></div>
              <p className={`text-white text-sm ${size900 ? "text-xs" : ""} ${size650 ? "text-sm" : ""}`}>{name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
