import React, { useState, useContext, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { SearchContext } from "./SearchContext";

function formatViews(num) {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumSignificantDigits: 3,
  });
  return formatter.format(num);
}

function toTitleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}

function Videos({ videos: initialVideos, selectedChannel, ...props }) {
  const { search } = useContext(SearchContext);
  const [videos, setVideos] = useState(initialVideos); 
  const [size1000, setSize1000] = useState(false);
  const [size300, setSize300] = useState(false);
  const [size900, setSize900] = useState(false);
  const [size650, setSize650] = useState(false);
  const [size560, setSize560] = useState(false);
  const [size490, setSize490] = useState(false);
  const [size720, setSize720] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 300) {
        setSize300(true);
      } else {
        setSize300(false);
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
      if (window.innerWidth < 560) {
        setSize560(true);
      } else {
        setSize560(false);
      }
      if (window.innerWidth < 490) {
        setSize490(true);
      } else {
        setSize490(false);
      }
      if (window.innerWidth < 1000) {
        setSize1000(true);
      } else {
        setSize1000(false);
      }
      if (window.innerWidth > 720) {
        setSize720(true);
      } else {
        setSize720(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function fetchData(category) {
    let filteredVideos = [...initialVideos]; // filter the initialVideos
  
    if (category !== "all") {
      filteredVideos = filteredVideos.filter((video) => video.category === category);
    }
  
    if (search && search.trim() !== "") {
      filteredVideos = filteredVideos.filter((video) =>
        video.title.toLowerCase().includes(search.toLowerCase())
      );
    }
  
    if (selectedChannel) {
      filteredVideos = filteredVideos.filter((video) => video.channelName === selectedChannel);
    }
  
    setVideos(filteredVideos);
  }

  useEffect(() => {
    console.log("Fetching data with search:", search);
    fetchData(props.category);
  }, [props.category, search, selectedChannel, initialVideos]);

  return (
    <div
      className={`videos flex h-screen bg-primary flex-wrap  mx-2 ${
        size650 ? "-ml-[15vw]" : ""
        } ${size1000 && size720 ? "ml-[5vw]" : ""}
      ${size490 ? "justify-center" : ""}`}
    >
      {videos.map((video) => (
        <div
          className={`video w-60 mx-2 my-3 hover:scale-105 cursor-pointer transition ease-in-out ${
            size300 ? "w-52" : ""
          } ${size900 ? "ml-[5vw]" : ""} ${size560 ? "w-52" : ""} ${
            size490 ? "" : ""
          } `}
          key={video.title}
        >
          <div
            className={`thumbnail rounded-2xl bg-white h-36 w-60 flex justify-end ${
              size560 ? "w-52" : ""
            } ${size300 ? "w-52" : ""}`}
            style={{
              backgroundImage: `url(${video.thumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p className="w-10 h-5 text-[12px] text-center bg-black rounded-lg text-white">
              {video.duration}
            </p>
          </div>
          <p className="description text-white my-2 font-semibold">
            {toTitleCase(video.title)}
          </p>
          <div className="details flex items-center">
            <div
              className="creator-dp rounded-full h-8 w-8"
              style={{
                backgroundImage: `url(${video.channelPicture})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="name-view pl-2 flex flex-col text-white">
              <p className="name text">{video.channelName}</p>
              <p className="views text-[12px]">{`${formatViews(
                video.views.replace(/,/g, "")
              )} Views | ${formatDate(video.uploadedDateTime)}`}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Videos;
