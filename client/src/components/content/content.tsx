import React, { useEffect, useState } from "react";
import Pitch from "./pitch";
import Portfolio from "./portfolio";
import Start from "./start";

/**
 * Wrapper component for display screen
 * Animates the 'sl' train on load
 * @param showPortfolio CTF/Portfolio screen
 * @param unlocked Number of unlocked backgrounds
 * @param total Number of all challenges
 * @returns
 */
const Content = ({
  showPortfolio,
  unlocked,
  total,
}: {
  showPortfolio: boolean;
  unlocked: number;
  total: number;
}) => {
  const [showAnimation, setShowAnimation] = useState(true);
  const animateClass = showAnimation ? "animate" : "";
  const trainId = "train";

  useEffect(() => {
    if (showAnimation) {
      const train = {
        counter: 0,
        start() {
          return setInterval(() => {
            this.drawTrain(this.counter++);
          }, 250);
        },

        trainSmoke: [
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
        ],

        trainBody: `<br >
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
        <br >`,

        trainWheels: [
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
        ],

        drawTrain(train_counter: number) {
          const train = document.getElementById(trainId)!;
          train.innerHTML =
            this.trainSmoke[train_counter % 2] +
            this.trainBody +
            this.trainWheels[train_counter % 4];
        },
      };

      const interval = train.start();
      setTimeout(() => {
        clearInterval(interval);
        setShowAnimation(false);
      }, 3900);
    }
  }, [showAnimation]);

  const View = () => (
    <div id="content" className={animateClass}>
      {showPortfolio ? (
        <Portfolio />
      ) : (
        <Pitch unlocked={unlocked} total={total} />
      )}
    </div>
  );

  return (
    <div id="container">
      {showAnimation && (
        <React.Fragment>
          <Start className={animateClass} chalLoaded={true} bgLoaded={true} />
          <div id={trainId} />
        </React.Fragment>
      )}
      <View />
      {/* <div id="footer">©️{new Date().getFullYear()} Glorison Lai</div> */}
    </div>
  );
};

export default Content;
