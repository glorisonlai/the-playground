import React from "react";
import {
  GithubIcon,
  ResumeIcon,
  // TwitterIcon,
  // BlogIcon,
  MailIcon,
} from "../../assets/fontawesome";
import "./portfolio.css";
import "./content.css";
import { ScreenConstants } from "components/backgrounds/background";

/**
 * Portfolio website view
 * Contains main page, personal projects
 * @returns Portfolio view
 */
const Portfolio = () => {
  // Following code appropriately renders nav arrow between screens
  // const [screen, setScreen] = useState(true);
  // const downArrowClass = screen ? "" : "hidden";
  // const upArrowClass = screen ? "hidden" : "";

  const scrollTo = (scrollTo: number) => {
    window.scrollTo(0, scrollTo);
    // setScreen((screen) => !screen);
  };

  /**
   * Lists experiences
   * Image right side, text, left side
   * @returns Experience component
   */
  const Experience = () => (
    <div id="experience">
      {/* Python password generator */}
      <div className={"nav-row"}>
        <img
          src={require("assets/sprites/logo.svg")}
          alt="Password Generator"
        />
        <div>
          <h4>Password Wordlist/Generator</h4>
          <p>
            A Python script that generates pronouneable passwords. Intended for
            bruteforcing the weirder passwords. Includes ruleset for including
            numbers at the end of syllables.
          </p>
        </div>
      </div>
      {/* Weather app */}
      <div className={"nav-row"}>
        <img src={require("assets/sprites/logo.svg")} alt="Weather App" />
        <div>
          <h4>Weather Display</h4>
          <p>
            Weather web app that fetches data from OpenWeatherMap. Includes
            search and autocomplete for any region listed in OpenWeather.
          </p>
        </div>
      </div>
      {/* Chat app */}
      <div className={"nav-row"}>
        <img src={require("assets/sprites/logo.svg")} alt="Chat App" />
        <div>
          <h4>Secure Chat app</h4>
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
          {/* Github Icon */}
          <a
            href="https://www.github.com/glorisonlai"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
            <div className="line" />
            <div className="tag">GitHub</div>
          </a>
          {/* <Twitter Icon /> */}
          {/* <a
            href="https://twitter.com/Glorison3"
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon />
            <div className="line" />
            <div className="tag">Twitter</div>
          </a> */}
          {/* <Blog Icon /> */}
          {/* <a
            href="https://dev.to/glorisonlai"
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon />
            <div className="line" />
            <div className="tag">Blog Posts</div>
          </a> */}
          {/* Resume Icon */}
          <a
            href="resume.pdf"
            download="Glorison_Lai_2021_Resume.pdf"
            target="this"
            rel="noreferrer"
          >
            <ResumeIcon />
            <div className="line" />
            <div className="tag">Resume</div>
          </a>
          {/* Email Icon */}
          <a
            href="mailto:lai.glorison@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <MailIcon />
            <div className="line" />
            <div className="tag">Contact</div>
          </a>
        </div>
      </div>
      {/** Scroll down button */}
      <footer
        id="footer-button"
        // className={downArrowClass}
        onClick={() => scrollTo(ScreenConstants.height)}
      >
        <code className="label">Projects</code>
        <div className={`arrow down`} />
      </footer>
      {/** Scroll up button */}
      {/* <header className={upArrowClass} onClick={() => scrollTo(0)}>
        <div className={`arrow up `} />
        <code id="labelup" className="label">
          Home
        </code>
      </header> */}
      <Experience />
    </div>
  );
};

export default Portfolio;
