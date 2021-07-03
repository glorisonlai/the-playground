import React from "react";
import "./menu-button.css";
import Challenges from "../../challenges/challenges";

const MenuButton = ({
  shape,
  bgId,
  setVis,
}: {
  shape: boolean;
  bgId: number;
  setVis: () => void;
}) => {
  const Svg = (bgId: number) => {
    const challenge = Challenges.getChallengeFromId(bgId);
    if (!challenge) return;

    return (
      <img
        className="bg-sprite"
        src={require(`assets/sprites/${challenge.logo}`).default} // .default fixes webpack bug not referencing img
        alt=""
      />
    );
  };

  const buttonClass = shape ? "right" : "left";

  const menuClass = shape ? "cross" : "";

  return (
    <button
      className={`btn flyout ${buttonClass}`}
      aria-label="menu"
      onClick={() => {
        setVis();
      }}
    >
      <div className={`glowy menu-btn ${menuClass}`}>{!shape && Svg(bgId)}</div>
    </button>
  );
};

export default MenuButton;
