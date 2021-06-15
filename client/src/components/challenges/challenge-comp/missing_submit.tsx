import React, { useState } from "react";

const MissingSubmit = ({ callBack }: { callBack: Function }) => {
  const [flag, setFlag] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFlag(event.target.value);
  };

  return (
    <form className="" onSubmit={(e) => e.preventDefault()}>
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
    </form>
  );
};

export default MissingSubmit;
