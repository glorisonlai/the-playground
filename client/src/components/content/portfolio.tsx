import React, { useState } from "react";
import {
  GithubIcon,
  ResumeIcon,
  TwitterIcon,
  BlogIcon,
  MailIcon,
} from "../../assets/fontawesome";
import "./portfolio.css";
import "./content.css";

/**
 * Main CTF website view
 * Contains main page, personal projects
 * @returns Portfolio view
 */
const Portfolio = () => {
  // Following code appropriately renders nav arrow between screens
  const [screen, setScreen] = useState(true);

  const handleClick = () => {
    setScreen((screen) => !screen);
  };

  return (
    <div className="main">
      <h1>Glorison Lai</h1>
      <div className="icons">
        <a href="https://www.github.com">
          <GithubIcon />
        </a>
        <TwitterIcon />
        {/* <BlogIcon /> */}
        <ResumeIcon />
        <MailIcon />
      </div>
      <footer>
        <div className={"arrow"} onClick={handleClick} />
      </footer>
    </div>
  );
};

export default Portfolio;
