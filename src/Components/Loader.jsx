import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import Home from "./Home";

function Loader() {
  return (
    <div className="h-screen w-screen flex justify-center items-center absolute overflow-hidden bg-primary">
      <PropagateLoader color="#36d7b7" />
    </div>
  );
}

export default Loader;
