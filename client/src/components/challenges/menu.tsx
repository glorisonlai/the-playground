import React, { useState, useEffect, ChangeEvent } from "react";
import "./menu.css";
import classNames from "classnames";
import Challenges from "./challenges";
import MenuButton from "../nav/menu-button";
import Flag from "./challenge-comp/flag";

const Menu = ({ bgId, unlock }: { bgId: number; unlock: Function }) => {
  useEffect(() => {
    const handleWidthResize = () => {
      setWidth(getWidth());
    };

    window.addEventListener("resize", handleWidthResize);
    return () => {
      window.removeEventListener("resize", handleWidthResize);
    };
  }, []);

  const getWidth = () =>
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const [width, setWidth] = useState(getWidth());
  const [visible, setVisible] = useState(true);
  const [focussedId, setFocussedId] = useState(bgId);

  const showState = visible ? "visible" : "hidden";
  const menuClass = classNames("cover", "flyout", showState);

  const switchBgHandler = (id: number) => {
    Challenges.isUnlockedFromId(id)
      ? switchBackground(id)
      : focusOnChallenge(id);
  };

  const switchBackground = (id: number) => {
    unlock(id);
    setFocussedId(id);
  };

  const focusOnChallenge = (id: number) => {
    setFocussedId(id);
  };

  const getChalDesc = (id: number, desc: string) => {
    if (id > 1 && !Challenges.isFaqUnlocked()) {
      return "Please finish Ground rules first";
    }
    return desc;
  };

  const isChalUnlocked = (id: number) => {
    return (
      id === 0 ||
      (id === 1 && Challenges.isUnlockedFromId(id)) ||
      (id > 1 &&
        (!Challenges.isFaqUnlocked() || Challenges.isUnlockedFromId(id)))
    );
  };

  const ChallengeMenu = () => {
    const challenges = Challenges.getAllChallenges();
    const focussedBg = Challenges.getChallengeFromId(focussedId);

    const challengeArr = challenges.map(
      ({ id, title, logo }: { id: number; title: string; logo: string }) => {
        const unlocked = Challenges.isUnlockedFromId(id)
          ? "unlocked"
          : "locked";
        const focussed = id === focussedId ? "focussed" : "unfocussed";
        const imgClass = classNames(unlocked, focussed);

        return (
          <div
            className={"challenge"}
            key={id}
            onClick={() => switchBgHandler(id)}
            style={{ height: "50px", width: "auto" }}
          >
            <img
              className={imgClass}
              src={require(`assets/sprites/${logo}`)}
              alt=""
              style={{ width: "50px" }}
            />
            <div className="challenge-text">{title}</div>
          </div>
        );
      }
    );
    console.log(focussedBg);

    return (
      <div className="challengeMenu">
        <div className="table">{challengeArr}</div>
        <div className="table">
          {focussedBg && (
            <Flag
              id={focussedBg.id}
              title={focussedBg.title}
              desc={getChalDesc(focussedBg.id, focussedBg.desc)}
              unlocked={isChalUnlocked(focussedBg.id)}
              callBack={(id: number) => switchBackground(id)}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={menuClass}>
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
