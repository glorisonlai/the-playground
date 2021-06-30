import React, { useState, useEffect } from "react";
import "./App.css";
import Background from "components/backgrounds/background";
import Menu from "components/challenges/menu";
import Challenges from "components/challenges/challenges";
import Content from "components/content/content";

/**
 * Landing page, performs background checks before serving
 * @returns Loading animation, then portolio/website
 */
function App({
  chalLoadedCallback,
  bgLoadedCallback,
}: {
  chalLoadedCallback: (loaded: boolean) => void;
  bgLoadedCallback: (loaded: boolean) => void;
}) {
  useEffect(() => {
    console.log(
      "%c" +
        "-------------------------------------------------------\n" +
        "|                                                     |\n" +
        "|              Tired of the background?               |\n" +
        "|               Try unlocking some! ;)                |\n" +
        "|                                                     |\n" +
        "-------------------------------------------------------",
      "background: #000; color: #bada55"
    );
  }, []);

  console.log("hello");

  // Check if user wants to see portfolio, or CTF
  const urlParams = new URLSearchParams(window.location.search);
  const view = urlParams.get("view");

  // Switch website view from portfolio, to CTF
  const [showPortfolio, setShowPortfolio] = useState(!!view ? true : false);

  // Load all challenges
  Challenges.initialUnlock();
  chalLoadedCallback(true);

  // Get initial background from localStorage
  const getBgId = (): number => {
    const id: number = Number(localStorage.getItem("bgId"));
    return Challenges.isUnlockedFromId(id) ? id : 0;
  };

  /**
   * Component that handles background state
   * Separated from Content component that should only render once
   * @returns Background, Menu, and Menu Button components
   */
  const BackgoundMenu = () => {
    // Initial background image
    const [bgId, setBgId] = useState(getBgId());

    // Change background image callback, and save to localStorage
    const changeBgId = (id: number) => {
      setBgId(id);
      window.localStorage.setItem("bgId", id.toString());
    };

    return (
      <>
        <Background bg={bgId} bgCallback={bgLoadedCallback} />
        {/* <Menu bgId={bgId} unlock={(id: number) => changeBgId(id)} /> */}
      </>
    );
  };

  return (
    <div className="app">
      <BackgoundMenu />
      {/* <Content
        initScreen={showPortfolio}
        unlocked={Challenges.getUnlocked()}
        total={Challenges.getAllChallenges().length}
      /> */}
    </div>
  );
}

export default App;
