import React, { useState, useEffect, ChangeEvent } from "react";
import "./menu.css";
import Challenges from "./challenges";
import MenuButton from "../nav/menu-button";
import Flag from "./challenge-comp/flag";

/**
 * Hidden-ish menu to access challenges. All challenges found in *challenges.ts*.
 * @param bgId Current Background ID, mapping to challenge
 * @param unlock Callback function to switch background
 * @returns Challenge menu Component
 */
const Menu = ({ bgId, unlock }: { bgId: number; unlock: Function }) => {
  useEffect(() => {
    /*
    Continuously check window size for rerendering
    TODO: Use CSS media queries instead
    */
    const handleWidthResize = () => {
      setWidth(getWidth());
    };

    window.addEventListener("resize", handleWidthResize);
    return () => {
      window.removeEventListener("resize", handleWidthResize);
    };
  }, []);

  // Feed current screen width to current state
  const getWidth = () =>
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const [width, setWidth] = useState(getWidth());

  // Sets challenge screen visibility
  const [visible, setVisible] = useState(false);

  // Current flag component to render
  const [focussedId, setFocussedId] = useState(bgId);

  // Classname for challenge screen
  const showState = visible ? "visible" : "hidden";

  // If unlocked, switch background, or just set new focus
  const switchBgHandler = (id: number) => {
    if (Challenges.isUnlockedFromId(id)) {
      unlock(id);
    }
    setFocussedId(id);
  };

  // Switches background and updates flag screen
  const switchBackground = (id: number) => {
    unlock(id);
    setFocussedId(id);
  };

  // Set custom description if Rules.html has not been read yet
  const getChalDesc = (id: number, desc: string) => {
    if (id > 1 && !Challenges.isFaqUnlocked()) {
      return "Please finish Ground Rules first";
    }
    return desc;
  };

  // Lock off challenges until Rules.html has been read
  const isChalUnlocked = (id: number) => {
    return (
      id === 0 ||
      (id === 1 && Challenges.isUnlockedFromId(id)) ||
      (id > 1 &&
        (!Challenges.isFaqUnlocked() || Challenges.isUnlockedFromId(id)))
    );
  };

  /* 
  Renders the challenge menu.
  All styling done in menu.css
  */
  const ChallengeMenu = () => {
    const challenges = Challenges.getAllChallenges();
    const focussedBg = Challenges.getChallengeFromId(focussedId);
    console.log(focussedBg);

    // Renders all available challenges into tiles
    const challengeArr = challenges.map(
      ({ id, title, logo }: { id: number; title: string; logo: string }) => {
        const unlocked = Challenges.isUnlockedFromId(id)
          ? "unlocked"
          : "locked";
        const focussed = id === focussedId ? "focussed" : "unfocussed";

        return (
          <div
            className={"challenge"}
            key={id}
            onClick={() => switchBgHandler(id)}
            style={{ height: "50px", width: "auto" }}
          >
            <img
              className={`${unlocked} ${focussed}`}
              src={require(`assets/sprites/${logo}`)}
              alt=""
              style={{ width: "50px" }}
            />
            <div className="challenge-text">{title}</div>
          </div>
        );
      }
    );

    return (
      <div className="challengeMenu">
        <div className="table">{challengeArr}</div>
        {!!focussedBg && (
          <Flag
            id={focussedBg.id}
            title={focussedBg.title}
            desc={getChalDesc(focussedBg.id, focussedBg.desc)}
            unlocked={isChalUnlocked(focussedBg.id)}
            callBack={(id: number) => switchBackground(id)}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <div className={`cover flyout ${showState}`}>
        <h1>Backgrounds</h1>
        {visible && <ChallengeMenu />}
      </div>
      <MenuButton
        shape={visible}
        bgId={bgId}
        setVis={() => setVisible((prevVisible) => !prevVisible)}
      />
    </>
  );
};

export default Menu;
