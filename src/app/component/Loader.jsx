import React from "react";

const Loader = () => {
  return (
    <div className="w-full flex items-center justify-center">
      {" "}
      <div className="w-14 h-14 rounded-full animate-spin border-8 border-solid border-purple-500 border-t-transparent"></div>
    </div>
  );
};

export default Loader;
