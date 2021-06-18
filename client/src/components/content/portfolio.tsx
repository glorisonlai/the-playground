import React, { useEffect, useState } from "react";
import {
  GithubIcon,
  ResumeIcon,
  TwitterIcon,
  BlogIcon,
  MailIcon,
} from "../../assets/fontawesome";
import "./portfolio.css";
import "./content.css";
import { ScreenConstants } from "components/backgrounds/background";

/**
 * Main CTF website view
 * Contains main page, personal projects
 * @returns Portfolio view
 */
const Portfolio = () => {
  // Following code appropriately renders nav arrow between screens
  const [screen, setScreen] = useState(true);
  const downArrowClass = screen ? "" : "hidden";
  const upArrowClass = screen ? "hidden" : "";

  const scrollTo = (scrollTo: number) => {
    window.scrollTo(0, scrollTo);
    setScreen((screen) => !screen);
  };

  /**
   * Lists experiences
   * Image right side, text, left side
   * @returns Experience component
   */
  const Experience = () => (
    <div id="experience" className={"main"}>
      {/* Python password generator */}
      <div className={"row"}>
        <img src={require("assets/sprites/logo.svg")} />
        <div>
          <h6>Password Wordlist/Generator</h6>
          <p>
            A Python script that generates pronouneable passwords. Intended for
            bruteforcing the weirder passwords. Includes ruleset for including
            numbers at the end of syllables.
          </p>
        </div>
      </div>
      {/* Weather app */}
      <div className={"row"}>
        <img src={require("assets/sprites/logo.svg")} />
        <div>
          <h6>Weather Display</h6>
          <p>
            Weather web app that fetches data from OpenWeatherMap. Includes
            search and autocomplete for any region listed in OpenWeather.
          </p>
        </div>
      </div>
      {/* Chat app */}
      <div className={"row"}>
        <img src={require("assets/sprites/logo.svg")} />
        <div>
          <h6>Secure Chat app</h6>
          <p>
            Chat application utilising Diffie Hellman key exchange and public
            key cryptography to securely store encrypted messages visible only
            to group chat members. WIP
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div id="portfolio">
      <div className="main screen">
        <h1>Glorison Lai</h1>
        {/** Icon row */}
        <div className="icons">
          <a href="https://www.github.com" target="_blank">
            <GithubIcon />
          </a>
          <TwitterIcon />
          {/* <BlogIcon /> */}
          <ResumeIcon />
          <MailIcon />
        </div>
      </div>
      {/** Scroll down button */}
      <footer
        id="footer-button"
        className={downArrowClass}
        onClick={() => scrollTo(ScreenConstants.height)}
      >
        <code className="label">Experiences</code>
        <div className={`arrow down`} />
      </footer>
      {/** Scroll up button */}
      <header className={upArrowClass} onClick={() => scrollTo(0)}>
        <div className={`arrow up `} />
        <code id="labelup" className="label">
          Home
        </code>
      </header>
      <Experience />
    </div>
  );
};

export default Portfolio;
