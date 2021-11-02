import React from "react";
import "styles/content.module.scss";

/**
 * Barebones loading screen
 * @param chalLoaded Check if all challenge routes have been verified
 * @param bgLoaded Check if background has been loaded
 * @param className CSS to trigger animation
 * @returns
 */
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
    return (
      <code id="start" className={className}>
        <div className="row">
          <code>Checking challenges</code>
          {!chalLoaded ? (
            <code id="loadingChal">
              <code className="loadingDots">.</code>
              <code className="loadingDots">.</code>
              <code className="loadingDots">.</code>
            </code>
          ) : (
            <React.Fragment>
              <code>...DONE</code>
            </React.Fragment>
          )}
        </div>
        <div className="row">
          <code>Checking backgrounds</code>
          {!bgLoaded ? (
            <code id="loadingBg">
              <code className="loadingDots">.</code>
              <code className="loadingDots">.</code>
              <code className="loadingDots">.</code>
            </code>
          ) : (
            <React.Fragment>
              <code>...DONE</code>
            </React.Fragment>
          )}
        </div>
        {bgLoaded && chalLoaded && <code className="row">sl</code>}
      </code>
    );
  };

  return <Loading />;
};

export default Start;
