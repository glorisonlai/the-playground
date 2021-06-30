import React from "react";

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
