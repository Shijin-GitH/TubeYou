import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { SearchContext } from "./Components/SearchContext";
import Loader from "./Components/Loader";

function App() {
  const [search, setSearch] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/videos");
      const data = await response.json();
      setVideos(data);
      setLoading(false);
    };

    fetchData();
  }, [search, selectedChannel]);

  return (
    <div className="flex items-center h-screen w-screen overflow-x-hidden bg-primary">
      {loading ? (
        <Loader />
      ) : (
        <SearchContext.Provider value={{ search, setSearch }}>
          <Navbar setSelectedChannel={setSelectedChannel} />
          <Home
            selectedChannel={selectedChannel}
            setSelectedChannel={setSelectedChannel}
            videos={videos}
            setVideos={setVideos}
          />
        </SearchContext.Provider>
      )}
    </div>
  );
}

export default App;
