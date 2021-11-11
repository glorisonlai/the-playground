import styles from "styles/flag.module.scss";

/**
 * Form that doesn't do anything. Requires user to manually send request
 * @returns Useless form
 */
const MissingSubmit = () => {
  return (
    <form
      id="flag_form"
      className={styles.flag}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className={styles.flag}
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
