import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter, faDev } from "@fortawesome/free-brands-svg-icons";
import { faFileAlt, faEnvelope } from "@fortawesome/free-regular-svg-icons";

export const GithubIcon = () => <FontAwesomeIcon icon={faGithub} />;

export const TwitterIcon = () => <FontAwesomeIcon icon={faTwitter} />;

export const BlogIcon = () => <FontAwesomeIcon icon={faDev} />;

export const ResumeIcon = () => <FontAwesomeIcon icon={faFileAlt} />;

export const MailIcon = () => <FontAwesomeIcon icon={faEnvelope} />;
