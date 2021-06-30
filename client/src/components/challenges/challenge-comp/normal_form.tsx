import React, { useState, ChangeEvent } from "react";
import Challenges from "../challenges";

/**
 * Default flag form component. Allows user to submit form to be checked by server
 * @param id Challenge ID
 * @param callBack Handler for challenge solve
 * @returns Normal flag form
 */
const NormalForm = ({ id, callBack }: { id: number; callBack: Function }) => {
  // Prevent user from spamming submit button
  const [loading, setLoading] = useState(false);

  // Flag text
  const [flag, setFlag] = useState("");

  // Updates flag text
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFlag(event.target.value);
  };

  /* 
  Sends current form value to server to check correct flag
  If correct, switch background and save secret to localStorage
  If incorrect, clear and do nothing
  */
  const submitFlag = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    if (!flag) return;
    setLoading(true);
    if (await Challenges.checkFlag(id, flag)) {
      callBack(id);
    }
    setFlag("");
    setLoading(false);
  };

  return (
    <form onSubmit={submitFlag}>
      <input
        className="flag"
        type="text"
        id="flag"
        name="flag"
        placeholder="FLAG{ ... }"
        value={flag}
        onChange={handleChange}
      />
      <br />
      <input className="flag" type="submit" value="Submit" />
    </form>
  );
};

export default NormalForm;
