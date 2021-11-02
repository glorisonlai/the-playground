import React from "react";

/**
 * Form that doesn't do anything. Requires user to manually send request
 * @returns Useless form
 */
const MissingSubmit = () => {
  return (
    <form id="flag_form" onSubmit={(e) => e.preventDefault()}>
      <input
        className="flag"
        type="text"
        id="flag"
        name="flag"
        placeholder="FLAG{ ... }"
      />
      <br />
    </form>
  );
};

export default MissingSubmit;
