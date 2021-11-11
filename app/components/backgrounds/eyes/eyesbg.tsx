import React, { useEffect } from "react";
import eyeStyle from "styles/eyes.module.scss";
import * as CSS from "csstype";
import styles from "styles/background.module.scss";

type EyeColour = "red" | "blue" | "purple" | "white";
type irisColourInterface = {
  [key in EyeColour]: string;
};

/**
 * Background for blinking eyes
 * Inspired by unnecessarily creepy MC entrance
 * @returns Eye background
 */
const Eyes = () => {
  const Eye = ({
    size,
    colour,
  }: {
    size: "med" | "small";
    colour: EyeColour;
  }) => {
    // Eye constants
    const eyeSize = size === "med" ? 12 : 9;
    const pupilSize = size === "med" ? 7.5 : 5.5;
    const irisSize = size === "med" ? "30px" : "40px";
    const irisColor: irisColourInterface = {
      red: "#BE360F",
      blue: "#1E7AE8",
      purple: "#BD9CFA",
      white: "#CDD1CF",
    };

    const EyeSize: CSS.Properties = {
      width: `${eyeSize}em`,
      height: `${eyeSize}em`,
    };

    // Setting bounds for pupil movement
    const width_range = 10;
    const pupilTopOffset = Math.random() * pupilSize;
    const pupilLeftOffset =
      Math.random() * width_range + (pupilSize - pupilTopOffset);

    const pupilColorAndSize: CSS.Properties = {
      boxShadow: `0px 0px ${pupilSize}em ${irisSize} ${irisColor[colour]}`,
      height: `${pupilSize}0em`,
      width: `${pupilSize}em`,
      top: `${pupilTopOffset - pupilSize / 2}em `,
      left: `${pupilLeftOffset - pupilSize / 2}em`,
    };

    return (
      <div className={`eye`} style={EyeSize}>
        <div className="eyelid" />
        <div className="pupil" style={pupilColorAndSize}></div>
      </div>
    );
  };

  return (
    <div className={styles.bg}>
      {/* <Eye className="med" /> */}
      <Eye size="small" colour="blue" />
    </div>
  );
};

export default Eyes;
