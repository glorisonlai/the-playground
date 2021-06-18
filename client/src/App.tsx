import React, { useState, useEffect } from "react";
import "./App.css";
import Background from "components/backgrounds/background";
import Menu from "components/challenges/menu";
import Challenges from "components/challenges/challenges";
import Pitch from "components/content/pitch";
import Portfolio from "components/content/portfolio";
import Start from "components/content/start";
import Content from "components/content/content";

/**
 * Landing page, performs background checks before serving
 * @returns Loading animation, then portolio/website
 */
function App({
  chalLoadedCallback,
  bgLoadedCallback,
}: {
  chalLoadedCallback: React.Dispatch<React.SetStateAction<boolean>>;
  bgLoadedCallback: React.Dispatch<React.SetStateAction<boolean>>;
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

  // Check if user wants to see portfolio, or CTF
  const urlParams = new URLSearchParams(window.location.search);
  const view = urlParams.get("view");

  // Switch website view from portfolio, to CTF
  const [showPortfolio, setShowPortfolio] = useState(!!view ? true : false);

  // Get initial background from localStorage
  const getBgId = (): number => {
    const id: number = Number(localStorage.getItem("bgId"));
    return Challenges.isUnlockedFromId(id) ? id : 0;
  };

  // Change background image, and save to localStorage
  const changeBgId = (id: number) => {
    setBgId(id);
    window.localStorage.setItem("bgId", id.toString());
    chalLoadedCallback(true);
  };

  // Current background to show
  const [bgId, setBgId] = useState(getBgId());
  return (
    <div className="app">
      <Background bg={bgId} bgCallback={bgLoadedCallback} />
      <Menu bgId={bgId} unlock={(id: number) => changeBgId(id)} />
      <Content
        initScreen={showPortfolio}
        unlocked={Challenges.getUnlocked()}
        total={Challenges.getAllChallenges().length}
      />
    </div>
  );
}

export default App;
