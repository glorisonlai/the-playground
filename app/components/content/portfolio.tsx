import React, { useState } from "react";
import {
  GithubLink,
  ResumeLink,
  // TwitterLink,
  // BlogLink,
  MailLink,
  MediumLink,
  ExtLink,
<<<<<<< HEAD:client/src/components/content/portfolio.tsx
} from "./icons";
import "./portfolio.css";
import "./content.css";
=======
} from "../../components/icons";
import styles from "styles/portfolio.module.scss";
import contentStyles from "styles/content.module.scss";
>>>>>>> backgrounds/challenges:app/components/content/portfolio.tsx
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
      <div className={styles.imageContainer}>
        <img
          className={`${styles.img} ${styles.thumb} ${styles.placeholder}`}
          alt={alt}
          src={`/${placeholderIcon}`}
          style={{
            visibility: isLoaded ? "hidden" : "visible",
          }}
        />
        <img
          className={`${styles.img} ${styles.thumb} ${styles.full}`}
          alt={alt}
          src={`/${icon}`}
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      </div>
    );
  };

  const Experience = () => {
    return (
      <div className={styles.experience}>
        <Divider />
        {experienceText.map((e, key) => (
          <div className={styles.navRow} key={key}>
            <ProgressiveImageContainer
              placeholderIcon={e.placeholderImgIcon}
              icon={e.imgIcon}
              alt={e.imgIconAlt}
            />
            <div className={styles.projText}>
              <h4>{e.title}</h4>
              <p>{e.desc}</p>
            </div>
            <div className={styles.links}>
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
    <div className={contentStyles.view}>
      <div className={`${contentStyles.main} ${styles.screen}`}>
        <h1 className={styles.title}>Glorison Lai</h1>
        <code>Cyber-Security; Web Development;</code>
        <Divider />
        {/** Icon row */}
        <div className={styles.icons}>
          <GithubLink link="https://www.github.com/glorisonlai">
            <div className={styles.line} />
            <div className={styles.tag}>GitHub</div>
          </GithubLink>
          {/* <TwitterLink>
            <div className={`${styles.line}`} />
            <div className={`${styles.tag}`}>Twitter</div>
          </TwitterLink> */}
          <MediumLink>
            <div className={`${styles.line}`} />
            <div className={`${styles.tag}`}>Posts</div>
          </MediumLink>
          <ResumeLink>
            <div className={`${styles.line}`} />
            <div className={`${styles.tag}`}>Resume</div>
          </ResumeLink>
          <MailLink>
            <div className={`${styles.line}`} />
            <div className={`${styles.tag}`}>Contact</div>
          </MailLink>
        </div>
      </div>
      {/** Scroll down button */}
      <footer
        className={styles.scroll}
        onClick={() => window.scrollTo(0, window.innerHeight)}
      >
        <code className={styles.label}>Projects</code>
        <div className={`${styles.arrow} ${styles.down}`} />
      </footer>
      {/** Scroll up button */}
      {/* <header className={upArrowClass} onClick={() => scrollTo(0)}>
        <div className={`arrow up `} />
        <code id="labelup" className="label">
          Home
        </code>
      </header> */}
      {/* <Experience /> */}
    </div>
  );
};

export default Portfolio;
