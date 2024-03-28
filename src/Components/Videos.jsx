import React, { useState, useContext, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { SearchContext } from "./SearchContext";

function formatViews(num) {
    const formatter = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
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

  function Videos(props) {
      const [videos, setVideos] = useState([]);
      const { search } = useContext(SearchContext);
  
      const fetchData = async (category) => {
        const response = await fetch("http://localhost:3000/api/videos");
        let data = await response.json();
      
        if (category !== "all") {
          data = data.filter(video => video.category === category);
        }
            
        if (search && search.trim() !== "") {
          data = data.filter(video => video.title.toLowerCase().includes(search.toLowerCase()));
        }
      
        setVideos(data);
      };
  
      useEffect(() => {
        console.log("Fetching data with search:", search);
      fetchData(props.category);
    }, [props.category, search]);


  return (
    <div className="videos flex flex-wrap mx-2">
      {videos.map((video) => (
  <div className="video w-60 mx-2 my-3" key={video.title}>
    <div
      className="thumbnail rounded-2xl bg-white h-36 w-60 flex justify-end"
      style={{
        backgroundImage: `url(${video.thumbnail})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
        <p className="w-10 h-5 text-[12px] text-center bg-black rounded-lg text-white">{ video.duration }</p>  
    </div>
    <p className="description text-white my-2 font-semibold">{toTitleCase(video.title)}</p>
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
        <p className="views text-[12px]">{`${formatViews(video.views.replace(/,/g, ''))} Views | ${formatDate(video.uploadedDateTime)}`}</p>
      </div>
    </div>
  </div>
))}
    </div>
  );
}

export default Videos;
