import Challenges from "components/challenges/challenges";
import React, { useState } from "react";
import Pitch from "./pitch";
import Portfolio from "./portfolio";
import Start from "./start";
import Train from "./train";

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
  const animateClass = showAnimation ? "animate" : "";

  const showPortfolio = true;

  const View = () => (
    <div id="content" className={animateClass}>
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
    <div id="container">
      {showAnimation && (
        <>
          <Start className={animateClass} chalLoaded={true} bgLoaded={true} />
          <Train />
        </>
      )}
      <View />
      <pre id="copyright">©️{new Date().getFullYear()} Glorison Lai</pre>
    </div>
  );
};

export default Content;
