import React, { ChangeEvent, useState } from "react";

const MissingSubmit = ({ callBack }: { callBack: Function }) => {
  const [flag, setFlag] = useState("");

  const handleChange = (event: ChangeEvent<HTMLFormElement>) => {
    setFlag(event.target.value);
  };

  return (
    <form className="flag-form" onSubmit={(e) => e.preventDefault()}>
      <input
        className="flag"
        type="text"
        id="flag"
        name="flag"
        placeholder="FLAG{ ... }"
        value={flag}
        onChange={(e) => handleChange(e)}
      />
      <br />
    </form>
  );
};

export default MissingSubmit;
