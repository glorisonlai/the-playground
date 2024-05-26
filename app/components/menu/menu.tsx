import { useState } from "react";
import styles from "styles/menu.module.scss";
import Challenges from "../challenges/challenges";
import ChallengeIcon from "./challengeIcon";
import MenuButton from "./menuButton/menuButton";
import Flag from "../challenges/components/flag";

/**
 * "Hidden" menu to access challenges.
 * @param bgId Current Background ID, mapping to challenge
 * @param unlock Callback function to switch background
 * @returns Challenge menu Component
 */
const Menu = ({ bgId, unlock }: { bgId: number; unlock: Function }) => {
  // Sets challenge screen visibility
  const [visible, setVisible] = useState(true);

  // Current flag component to render
  const [focussedId, setFocussedId] = useState(bgId);

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
    solvedDesc: string,
  ) => {
    if (id > 1 && !Challenges.isFaqSolved()) {
      return "Please finish Ground Rules first";
    }
    return Challenges.isUnlockedFromId(id) ? solvedDesc : unsolvedDesc;
  };

  // Lock off challenges until FAQ has been read
  const isChalUnlocked = (id: number) => {
    return (
      Challenges.isUnlockedFromId(id) || (id > 1 && !Challenges.isFaqSolved())
    );
  };

  /**
   * Renders the challenge menu.
   * All styling done in menu.scss
   */
  const ChallengeMenu = () => {
    const challenges = Challenges.getAllChallenges();
    const focussedBg = Challenges.getChallengeFromId(focussedId);

    // Renders all available challenges into tiles
    const challengeArr = challenges.map(
      ({ id, title, logo }: { id: number; title: string; logo: string }) => {
        return (
          <div
            className={styles.challengeContainer}
            key={id}
            onClick={() => switchBgHandler(id)}
          >
            <ChallengeIcon
              imgStr={logo}
              unlocked={Challenges.isUnlockedFromId(id)}
              focussed={id === focussedId}
            />
            <div className={`${styles.challengeText}`}>{title}</div>
          </div>
        );
      },
    );

    return (
      <div
        className={`${styles.challengeMenu} ${visible ? styles.visible : styles.hidden
          }`}
      >
        <div className={`${styles.table}`}>{challengeArr}</div>
        {!!focussedBg && (
          <Flag
            id={focussedBg.id}
            title={focussedBg.title}
            desc={getChalDesc(
              focussedBg.id,
              focussedBg.unsolvedDesc,
              focussedBg.solvedDesc,
            )}
            unlocked={isChalUnlocked(focussedBg.id)}
            callBack={(id: number) => switchBackground(id)}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <div
        className={`${styles.cover} ${styles.flyout} ${visible ? styles.visible : styles.hidden
          }`}
      >
        <h2
          className={`${styles.menuTitle} ${visible ? styles.visible : styles.hidden
            }`}
        ></h2>
        <ChallengeMenu />
      </div>
      <MenuButton
        shape={visible}
        bgId={bgId}
        setVis={() => {
          setVisible((visible) => !visible);
        }}
      />
    </>
  );
};

export default Menu;
