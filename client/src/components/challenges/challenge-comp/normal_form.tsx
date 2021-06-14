import React, { useState, ChangeEvent } from "react";
import Challenges from "../challenges";

const NormalForm = ({ id, callBack }: { id: number; callBack: Function }) => {
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState("");

  const handleChange = (event: ChangeEvent<HTMLFormElement>) => {
    setFlag(event.target.value);
  };

  const submitFlag = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
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
