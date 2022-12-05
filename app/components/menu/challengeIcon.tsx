import styles from "styles/menu.module.scss";
/**
 * Grabs appropriate image for challenge
 * @param imgStr Image path
 * @returns Icon for challenge
 */
const ChallengeIcon = ({
  imgStr,
  unlocked,
  focussed,
}: {
  imgStr: string;
  unlocked: boolean;
  focussed: boolean;
}) => (
  <img
    className={`${styles.challenge} 
      ${unlocked ? styles.unlocked : styles.locked} 
      ${focussed ? styles.focussed : styles.unfocussed}`}
    alt={imgStr}
    src={`/${imgStr}`}
  />
);

export default ChallengeIcon;
