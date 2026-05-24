import React from "react";

const Container = ({ children }) => {
  return (
    <div className="container mx-auto md:px-14 sm:px-6 px-4 py-2">
      {children}
    </div>
  );
};

export default Container;
