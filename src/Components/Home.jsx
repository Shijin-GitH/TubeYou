import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { SearchContext } from "./SearchContext";
import Videos from "./Videos";

function Home({
  selectedChannel,
  setSelectedChannel,
  setLoading,
  videos,
}) {
  const { search } = useContext(SearchContext);
  const categories = ["All", "Gaming", "Music", "Tech"];
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentCategory, setcurrentCategory] = useState(0);
  const [size450, setSize450] = useState(false);
  const [size350, setSize350] = useState(false);
  const [size900, setSize900] = useState(false);
  const [size650, setSize650] = useState(false);
  const [size1000, setSize1000] = useState(false);
  const [size400, setSize400] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 450) {
        setSize450(true);
      } else {
        setSize450(false);
      }
      if (window.innerWidth < 350) {
        setSize350(true);
      } else {
        setSize350(false);
      }
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
      if (window.innerWidth < 1000) {
        setSize1000(true);
      } else {
        setSize1000(false);
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

  return (
    <div className="Home h-screen w-[85vw] pt-[10vh] bg-primary flex flex-col mt-9 space-y-8">
      <div
        className={`categories flex w-screen h-[4vh]  ${
          size900 ? "ml-[5vw]" : ""
        } ${size1000 ? "ml-[5vw]" : ""}
        ${size650 ? "-ml-[10vw]" : ""} ${size450 ? "-ml-5" : ""} ${
          size400 ? "-ml-[5vw]" : ""
        } ${size350 ? "-ml-8" : ""}`}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className={`px-3 mx-2 bg-[#acbdba] rounded-md cursor-pointer hover:bg-gray-800 hover:text-white ${
              size450 ? "text-sm" : ""
            } ${size350 ? "text-[3.5vw]" : ""} ${
              index === currentCategory ? "bg-gray-800 text-white" : ""
            }`}
            onClick={() => {
              setSelectedCategory(category.toLowerCase());
              setcurrentCategory(index);
              if (category.toLowerCase() === "all") {
                setSelectedChannel(null);
              }
            }}
          >
            {category}
          </div>
        ))}
      </div>
      <Videos
        category={selectedCategory}
        search={search}
        selectedChannel={selectedChannel}
        videos={videos}
      />
    </div>
  );
}

export default Home;
