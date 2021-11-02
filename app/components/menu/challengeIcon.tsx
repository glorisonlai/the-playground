import React from "react";

/**
 * Grabs appropriate image for challenge
 * @param imgStr Image path
 * @returns Icon for challenge
 */
const ChallengeIcon = ({
  imgStr,
  className,
}: {
  imgStr: string;
  className: string;
}) => {
  return (
    <img
      className={className}
      alt={imgStr}
      src={require(`public/${imgStr}`).default}
    />
  );
};

export default ChallengeIcon;
