import styles from "styles/flag.module.scss";

/**
 * Form that doesn't do anything. Requires user to manually send request
 * @returns Useless form
 */
const MissingSubmit = () => {
  return (
    <form
      className={`${styles.flag} ${styles.flagForm}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className={`${styles.flagInput}`}
        type="text"
        name="flag"
        placeholder="FLAG{ ... }"
      />
      <br />
    </form>
  );
};

export default MissingSubmit;
