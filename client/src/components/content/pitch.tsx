import React from "react";

/**
 * CTF website view
 * @param unlocked Total number of challenges solved
 * @param total Total number of challenges
 * @returns CTF view
 */
const Pitch = ({ unlocked, total }: { unlocked: number; total: number }) => {
  const email = "lai.glorison@gmail.com";
  return (
    <div id="view">
      <h2>The Playground</h2>
      <h3>
        {/* Remove 1 from total to exclude initial bg */}
        {unlocked - 1} solved of {total - 1}{" "}
      </h3>
      <p>
        If you have any ideas for backgrounds/challenges: <br />
        Please contact me! 📬 <br />
        &gt;&nbsp;
        <a id="email" href={`mailto:${email}`}>
          {email}
        </a>
      </p>
    </div>
  );
};

export default Pitch;
