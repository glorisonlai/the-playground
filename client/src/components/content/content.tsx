import React, { useEffect, useState } from "react";
import Pitch from "./pitch";
import Portfolio from "./portfolio";
import Start from "./start";

const Content = ({
  initScreen,
  unlocked,
  total,
}: {
  initScreen: boolean;
  unlocked: number;
  total: number;
}) => {
  const [showAnimation, setShowAnimation] = useState(true);
  const animateClass = showAnimation ? "animate" : "";
  let counter = 0;

  const View = () => {
    return (
      <div id="content" className={animateClass}>
        {initScreen ? (
          <Portfolio />
        ) : (
          <Pitch unlocked={unlocked} total={total} />
        )}
      </div>
    );
  };

  const Train = () => <code id="train"></code>;

  const trainSmoke = [
    `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(&nbsp;&nbsp;)&nbsp;(@@)&nbsp;(&nbsp;)&nbsp;&nbsp;(@)&nbsp;&nbsp;()&nbsp;&nbsp;&nbsp;&nbsp;@@&nbsp;&nbsp;&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O
    <br >
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(@@@)
    <br >
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(&nbsp;&nbsp;&nbsp;&nbsp;)
    <br >
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(@@@@)
    <br >
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(&nbsp;&nbsp;&nbsp;)`,
    `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(@@@)&nbsp;(&nbsp;&nbsp;)&nbsp;(@@)&nbsp;&nbsp;(&nbsp;)&nbsp;&nbsp;(@)&nbsp;&nbsp;&nbsp;&nbsp;()&nbsp;&nbsp;&nbsp;&nbsp;@@&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@
    <br >
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(&nbsp;&nbsp;&nbsp;)
    <br >
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(@@@@)
    <br >
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(&nbsp;&nbsp;&nbsp;)
    <br >
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(@@@)`,
  ];

  const trainBody = `<br >
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;====&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___________
    <br >
    &nbsp;&nbsp;_D&nbsp;_|&nbsp;&nbsp;|_______/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\__I_I_____===__|_________|
    <br >
    &nbsp;&nbsp;&nbsp;|(_)---&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;H\\________/&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=|___&nbsp;___|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_________________
    <br >
    &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;H&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||_|&nbsp;|_||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\_____A
    <br >
    &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;H&nbsp;&nbsp;|__--------------------|&nbsp;[___]&nbsp;|&nbsp;&nbsp;&nbsp;=|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
    <br >
    &nbsp;&nbsp;|&nbsp;________|___H__/__|_____/[][]~\\_______|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;-|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
    <br >
    &nbsp;&nbsp;|/&nbsp;|&nbsp;&nbsp;&nbsp;|-----------I_____I&nbsp;[][]&nbsp;[]&nbsp;&nbsp;D&nbsp;&nbsp;&nbsp;|=======|____|________________________|_
    <br >`;

  const trainWheels = [
    // Right wheels
    `__/&nbsp;=|&nbsp;o&nbsp;|=-~~\\&nbsp;&nbsp;/~~\\&nbsp;&nbsp;/~~\\&nbsp;&nbsp;/~~\\&nbsp;____Y___________|__|__________________________|_
    <br >
    &nbsp;|/-=|___|=&nbsp;&nbsp;&nbsp;O=====O=====O=====O|_____/~\\___/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_D__D__D_|&nbsp;&nbsp;|_D__D__D_|
      <br >
      &nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\__/&nbsp;&nbsp;\\__/&nbsp;&nbsp;\\__/&nbsp;&nbsp;\\__/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;
      <br >`,
    // Top wheels
    `__/&nbsp;=|&nbsp;o&nbsp;|=-~O=====O=====O=====O\\&nbsp;____Y___________|__|__________________________|_
      <br >
      &nbsp;|/-=|___|=&nbsp;&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;&nbsp;|_____/~\\___/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_D__D__D_|&nbsp;&nbsp;|_D__D__D_|
      <br >
      &nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\__/&nbsp;&nbsp;\\__/&nbsp;&nbsp;\\__/&nbsp;&nbsp;\\__/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;
      <br >`,
    // Left wheels
    `__/&nbsp;=|&nbsp;o&nbsp;|=-~~\\&nbsp;&nbsp;/~~\\&nbsp;&nbsp;/~~\\&nbsp;&nbsp;/~~\\&nbsp;____Y___________|__|__________________________|_
      <br >
      &nbsp;|/-=|___|=O=====O=====O=====O&nbsp;&nbsp;&nbsp;|_____/~\\___/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_D__D__D_|&nbsp;&nbsp;|_D__D__D_|
      <br >
      &nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\__/&nbsp;&nbsp;\\__/&nbsp;&nbsp;\\__/&nbsp;&nbsp;\\__/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;
      <br >`,
    // Bottom wheels
    `__/&nbsp;=|&nbsp;o&nbsp;|=-~~\\&nbsp;&nbsp;/~~\\&nbsp;&nbsp;/~~\\&nbsp;&nbsp;/~~\\&nbsp;____Y___________|__|__________________________|_
      <br >
      &nbsp;|/-=|___|=&nbsp;&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;&nbsp;|_____/~\\___/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|_D__D__D_|&nbsp;&nbsp;|_D__D__D_|
      <br >
      &nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\O=====O=====O=====O_/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;\\_/&nbsp;&nbsp;&nbsp;
      <br >`,
  ];

  const drawTrain = () => {
    const train = document.getElementById("train");
    train!.innerHTML =
      trainSmoke[counter % 2] + trainBody + trainWheels[counter % 4];
    counter += 1;
  };

  useEffect(() => {
    if (showAnimation) {
      const interval = setInterval(drawTrain, 250);
      setTimeout(() => {
        clearInterval(interval);
        setShowAnimation(false);
      }, 3900);
    }
  }, []);

  return (
    <>
      {showAnimation && (
        <>
          <Start className="animate" chalLoaded={true} bgLoaded={true} />
          <Train />
        </>
      )}
      <View />
    </>
  );
};

export default Content;
