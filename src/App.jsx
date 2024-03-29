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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    // Add the 'no-scroll' class to the body when loading is true
    if (loading) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      clearTimeout(timeout);
      document.body.classList.remove("no-scroll"); // Remove the class when the component unmounts
    };
  }, [loading]);

  return (
    <div className="flex items-center w-screen overflow-x-hidden bg-primary">
      {loading && <Loader />}
      <SearchContext.Provider value={{ search, setSearch }}>
        <Navbar setSelectedChannel={setSelectedChannel} />
        <Home
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
        />
      </SearchContext.Provider>
    </div>
  );
}

export default App;
