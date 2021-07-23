import React, { useState } from "react";
import {
  GithubLink,
  ResumeLink,
  // TwitterLink,
  // BlogLink,
  MailLink,
  MediumLink,
  ExtLink,
} from "../../assets/icons";
import "./portfolio.css";
import "./content.css";
import { experienceText } from "./experience";
import { Divider } from "components/common/divider";

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

  // const scrollTo = (scrollTo: number) => {
  //   window.scrollTo(0, scrollTo);
  //   setScreen((screen) => !screen);
  // };

  /**
   * Lists experiences
   * Image right side, text, left side
   * @returns Experience component
   */

  const ProgressiveImageContainer = ({
    icon,
    placeholderIcon,
    alt,
  }: {
    icon: string;
    placeholderIcon: string;
    alt: string;
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
      <div className="image-container">
        <img
          className="img thumb placeholder"
          alt={alt}
          src={require(`assets/sprites/${placeholderIcon}`).default}
          style={{
            visibility: isLoaded ? "hidden" : "visible",
            height: "100%",
          }}
        />
        <img
          className="img thumb full"
          alt={alt}
          src={require(`assets/sprites/${icon}`).default}
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0, height: "100%" }}
        />
      </div>
    );
  };

  const Experience = () => {
    return (
      <div id="experience">
        {/* Python password generator */}
        {experienceText.map((e, key) => (
          <div className="nav-row" key={key}>
            <ProgressiveImageContainer
              placeholderIcon={e.placeholderImgIcon}
              icon={e.imgIcon}
              alt={e.imgIconAlt}
            />
            <div className="proj-text">
              <h4>{e.title}</h4>
              <p>{e.desc}</p>
            </div>
            <div className="links">
              {!!e.githubLink && (
                <GithubLink link={e.githubLink}>
                  GitHub
                  <Divider />
                </GithubLink>
              )}
              {!!e.url && <ExtLink link={e.url} />}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div id="view">
      <div className="main screen">
        <h1 style={{ margin: 0 }}>Glorison Lai</h1>
        <code>Cyber-Security; Web Development;</code>
        <Divider />
        {/** Icon row */}
        <div className="icons">
          <GithubLink link="https://www.github.com/glorisonlai">
            <div className="line" />
            <div className="tag">GitHub</div>
          </GithubLink>
          {/* <TwitterLink>
            <div className="line" />
            <div className="tag">Twitter</div>
          </TwitterLink> */}
          <MediumLink>
            <div className="line" />
            <div className="tag">Posts</div>
          </MediumLink>
          <ResumeLink>
            <div className="line" />
            <div className="tag">Resume</div>
          </ResumeLink>
          <MailLink>
            <div className="line" />
            <div className="tag">Contact</div>
          </MailLink>
        </div>
      </div>
      {/** Scroll down button */}
      <footer
        id="footer-button"
        className={"scroll"}
        onClick={() => window.scrollTo(0, window.innerHeight)}
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
