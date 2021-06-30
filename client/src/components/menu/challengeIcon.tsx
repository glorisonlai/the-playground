import React from "react";

/**
 * Grabs appropriate image for challenge
 * @param imgStr Image path
 * @returns Icon for challenge
 */
const ChallengeIcon = ({ imgStr }: { imgStr: string }) => {
  return (
    <img
      className="challenge"
      alt={imgStr}
      src={require(`assets/sprites/${imgStr}`)}
    />
  );
};

export default ChallengeIcon;
