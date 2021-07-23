import React, { useState } from "react";
import "./menu.css";
import Challenges from "../challenges/challenges";
import ChallengeIcon from "./challengeIcon";
import MenuButton from "./menu-button/menu-button";
import Flag from "../challenges/components/flag";

/**
 * "Hidden" menu to access challenges.
 * @param bgId Current Background ID, mapping to challenge
 * @param unlock Callback function to switch background
 * @returns Challenge menu Component
 */
const Menu = ({ bgId, unlock }: { bgId: number; unlock: Function }) => {
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
  const getChalDesc = (
    id: number,
    unsolvedDesc: string,
    solvedDesc: string
  ) => {
    if (id > 1 && !Challenges.isFaqUnlocked()) {
      return "Please finish Ground Rules first";
    }
    return Challenges.isUnlockedFromId(id) ? solvedDesc : unsolvedDesc;
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

  const toggleMenu = () => {
    // I am so sorry ;;
    var view = document.getElementById("view");
    if (view) {
      view!.style.transform = visible ? "translateX(0)" : "translateX(100vw)";
    }
    setVisible((visible) => !visible);
  };

  /**
   * Renders the challenge menu.
   * All styling done in menu.css
   */
  const ChallengeMenu = () => {
    const challenges = Challenges.getAllChallenges();
    const focussedBg = Challenges.getChallengeFromId(focussedId);

    // Renders all available challenges into tiles
    const challengeArr = challenges.map(
      ({ id, title, logo }: { id: number; title: string; logo: string }) => {
        const unlocked = Challenges.isUnlockedFromId(id)
          ? "unlocked"
          : "locked";
        const focussed = id === focussedId ? "focussed" : "unfocussed";

        return (
          <div
            className={`challenge ${unlocked}`}
            key={id}
            onClick={() => switchBgHandler(id)}
            style={{ height: "50px", width: "auto" }}
          >
            <ChallengeIcon className={`challenge ${focussed}`} imgStr={logo} />
            <div className="challenge-text">{title}</div>
          </div>
        );
      }
    );

    return (
      <div id="challengeMenu">
        <div className="table">{challengeArr}</div>
        {!!focussedBg && (
          <Flag
            id={focussedBg.id}
            title={focussedBg.title}
            desc={getChalDesc(
              focussedBg.id,
              focussedBg.unsolvedDesc,
              focussedBg.solvedDesc
            )}
            unlocked={isChalUnlocked(focussedBg.id)}
            callBack={(id: number) => switchBackground(id)}
          />
        )}
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className={`cover flyout ${showState}`}>
        <h2 id="menu-title">Backgrounds</h2>
        <ChallengeMenu />
      </div>
      <MenuButton shape={visible} bgId={bgId} setVis={toggleMenu} />
    </React.Fragment>
  );
};

export default Menu;
