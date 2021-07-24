import React, { useState, useEffect } from "react";
import Background from "components/backgrounds/background";
import Menu from "components/menu/menu";
import Challenges from "components/challenges/challenges";
import Content from "components/content/content";
import { LoadingComps } from "./index";

/**
 * Landing page, performs background checks before serving
 * @returns Loading animation, then portolio/website
 */
const App = ({
  loadedCallback,
}: {
  loadedCallback: (loaded: boolean, component: LoadingComps) => void;
}) => {
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

  // Check if user wants to see portfolio, or CTF
  const urlParams = new URLSearchParams(window.location.search);
  const view = urlParams.get("view");

  // TODO: Make(?) button to switch from portfolio, to CTF
  // Switch website view from portfolio, to CTF
  // const [showPortfolio, setShowPortfolio] = useState(
  //   view === "portfolio" ? true : false
  // );
  const showPortfolio = view === "portfolio" ? true : false;

  // Load all challenges
  Challenges.initialUnlock();
  loadedCallback(true, "Chal");

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
      <React.Fragment>
        <Background bg={bgId} bgCallback={loadedCallback} />
        <Menu bgId={bgId} unlock={(id: number) => changeBgId(id)} />
      </React.Fragment>
    );
  };

  return (
    <div className="app">
      <BackgoundMenu />
      <Content
        showPortfolio={showPortfolio}
        unlocked={Challenges.getUnlocked()}
        total={Challenges.getAllChallenges().length}
      />
    </div>
  );
};

export default App;
