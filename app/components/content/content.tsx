import Challenges from "components/challenges/challenges";
import React, { useState } from "react";
import Pitch from "./pitch";
import Portfolio from "./portfolio";
import Start from "./start";
import Train from "./train";
import styles from "styles/content.module.scss";

/**
 * Wrapper component for display screen
 * Animates the 'sl' train on load
 * @param showPortfolio CTF/Portfolio screen
 * @param unlocked Number of unlocked backgrounds
 * @param total Number of all challenges
 * @returns
 */
const Content = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const animateClass = showAnimation ? styles.animate : "";

  const showPortfolio = true;

  const View = () => (
    <div className={`${styles.content} ${animateClass}`}>
      {showPortfolio ? (
        <Portfolio />
      ) : (
        <Pitch
          unlocked={Challenges.getUnlocked()}
          total={Challenges.getAllChallenges().length}
        />
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      {/* {showAnimation && (
        <>
          <Start className={animateClass} chalLoaded={true} bgLoaded={true} />
          <Train callBack={setShowAnimation} />
        </>
      )} */}
      <View />
      <pre className={styles.copyright}>
        ©️{new Date().getFullYear()} Glorison Lai
      </pre>
    </div>
  );
};

export default Content;
