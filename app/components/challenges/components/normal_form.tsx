import React, { useState, ChangeEvent } from "react";
import Challenges from "../challenges";
import styles from "styles/flag.module.scss";

/**
 * Default flag form component. Allows user to submit form to be checked by server
 * @param id Challenge ID
 * @param callBack Handler for challenge solve
 * @returns Normal flag form
 */
const NormalForm = ({
  id,
  callBack,
  initialVal = "",
}: {
  id: number;
  callBack: Function;
  initialVal?: string;
}) => {
  // Prevent user from spamming submit button
  const [loading, setLoading] = useState(false);

  // Flag text
  const [flag, setFlag] = useState(initialVal);

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
    if (await Challenges.submitFlag(id, flag)) {
      callBack(id);
    }
    setFlag(initialVal);
    setLoading(false);
  };

  return (
    <form className={`${styles.flag} ${styles.flagForm}`} onSubmit={submitFlag}>
      <input
        className={`${styles.flagInput}`}
        type="text"
        name="flag"
        placeholder="FLAG{ ... }"
        aria-placeholder="FLAG{ ... }"
        value={flag}
        onChange={handleChange}
      />
      <input className={`${styles.flagSubmit}`} type="submit" value="SUBMIT" />
    </form>
  );
};

export default NormalForm;
