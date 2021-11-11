import React from "react";
import Challenges from "../../challenges/challenges";
import styles from "styles/MenuButton.module.scss";

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
      <img className={styles.bgSprite} src={`/${challenge.logo}`} alt="" />
    );
  };

  const buttonClass = shape ? styles.right : styles.left;

  const menuClass = shape ? styles.cross : "";

  return (
    <button
      className={`${styles.btn} ${styles.flyout} ${buttonClass}`}
      aria-label="menu"
      onClick={() => {
        setVis();
      }}
    >
      <div className={`${styles.glowy} ${styles.menuBtn} ${menuClass}`}>
        {!shape && Svg(bgId)}
      </div>
    </button>
  );
};

export default MenuButton;
