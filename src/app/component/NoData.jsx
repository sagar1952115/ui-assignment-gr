import React from "react";

const NoData = ({ message }) => {
  return (
    <div className="shadow-md bg-slate-400 rounded-lg text-white text-center p-2 font-bold">
      {message}
    </div>
  );
};

export default NoData;
