import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";
import {
  faFileAlt,
  faEnvelope,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export const GithubLink = ({
  link,
  children,
}: {
  link: string;
  children?: React.ReactNode;
}) => (
  <a href={link} target="_blank" rel="noreferrer">
    <FontAwesomeIcon icon={faGithub} />
    {children}
  </a>
);

export const TwitterLink = ({ children }: { children?: React.ReactNode }) => (
  <a href="https://twitter.com/Glorison3" target="_blank" rel="noreferrer">
    <FontAwesomeIcon icon={faTwitter} />
    {children}
  </a>
);

export const MediumLink = ({ children }: { children?: React.ReactNode }) => (
  <a href="https://medium.com/@lai.glorison" target="_blank" rel="noreferrer">
    <FontAwesomeIcon icon={faMedium} />
    {children}
  </a>
);

export const ResumeLink = ({ children }: { children?: React.ReactNode }) => (
  <a
    href="resume.pdf"
    download="Glorison_Lai_2021_Resume.pdf"
    target="this"
    rel="noreferrer"
  >
    <FontAwesomeIcon icon={faFileAlt} />
    {children}
  </a>
);

export const MailLink = ({ children }: { children?: React.ReactNode }) => (
  <a href="mailto:lai.glorison@gmail.com" target="_blank" rel="noreferrer">
    <FontAwesomeIcon icon={faEnvelope} />
    {children}
  </a>
);

export const ExtLink = ({ link }: { link: string }) => (
  <a href={link} target="_blank" rel="noreferrer">
    <FontAwesomeIcon icon={faSignOutAlt} />
    App
  </a>
);

export const SupportUser = () => <FontAwesomeIcon icon={faUserCircle} />;
