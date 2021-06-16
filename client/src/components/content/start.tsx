import React from "react";
import "./content.css";

const Start = ({
  chalLoaded,
  bgLoaded,
}: {
  chalLoaded: boolean;
  bgLoaded: boolean;
}) => {
  const Loading = ({}) => {
    console.log(chalLoaded);
    return (
      <code id="start">
        <div className="row">
          <p>Checking challenges</p>
          {!chalLoaded ? (
            <>
              <p className="loadingDots">.</p>
              <p className="loadingDots">.</p>
              <p className="loadingDots">.</p>
            </>
          ) : (
            <p>... DONE</p>
          )}
        </div>
        <div className="row">
          <p>Checking backgrounds</p>
          {!bgLoaded ? (
            <>
              <p className="loadingDots">.</p>
              <p className="loadingDots">.</p>
              <p className="loadingDots">.</p>
            </>
          ) : (
            <p>... DONE</p>
          )}
        </div>
        {bgLoaded && chalLoaded && <p>sl</p>}
      </code>
    );
  };

  return <Loading />;
};

export default Start;
