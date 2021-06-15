import React from "react";
import "./eyes.css";

const Eyes = () => {
  const Eye = ({ className }: { className: string }) => {
    return (
      <div className={`eye ${className}`}>
        <div className="pupil"> </div>
      </div>
    );
  };

  return (
    <div className="bg">
      <Eye className="med" />
      <Eye className="small" />
    </div>
  );
};

export default Eyes;
