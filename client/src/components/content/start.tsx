import React from "react";
import "./content.css";

const Start = ({
  chalLoaded,
  bgLoaded,
  className,
}: {
  chalLoaded: boolean;
  bgLoaded: boolean;
  className: string;
}) => {
  const Loading = () => {
    console.log(chalLoaded);
    return (
      <code id="start" className={className}>
        <div className="row">
          <code>Checking challenges</code>
          {!chalLoaded ? (
            <>
              <code className="loadingDots">.</code>
              <code className="loadingDots">.</code>
              <code className="loadingDots">.</code>
            </>
          ) : (
            <>
              <code>...DONE</code>
            </>
          )}
        </div>
        <div className="row">
          <code>Checking backgrounds</code>
          {!bgLoaded ? (
            <>
              <code className="loadingDots">.</code>
              <code className="loadingDots">.</code>
              <code className="loadingDots">.</code>
            </>
          ) : (
            <>
              <code>...DONE</code>
            </>
          )}
        </div>
        {bgLoaded && chalLoaded && <code className="row">sl</code>}
      </code>
    );
  };

  return <Loading />;
};

export default Start;
