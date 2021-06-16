import React from "react";
import "./content.css";

/**
 * Main CTF website view
 * @param unlocked Total number of challenges solved
 * @param total Total number of challenges
 * @returns CTF view
 */
const Pitch = ({ unlocked, total }: { unlocked: number; total: number }) => {
  const email = "lai.glorison@gmail.com";
  return (
    <div className="main">
      <h1>The Playground</h1>
      <h3>
        {unlocked} solved of {total}
      </h3>
      <br />
      <br />
      <footer className="footer">
        If you have any ideas for backgrounds/challenges: <br />
        Please contact me! 📬 <br />
        <a href={`mailto:${email}`}>{email}</a>
      </footer>
    </div>
  );
};

export default Pitch;
