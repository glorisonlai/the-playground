import Challenges from "components/challenges/challenges";
import React, { Suspense } from "react";
import style from "styles/background.module.scss";

/**
 * Current available backgrounds. Will be updated!
 * @param bg Background ID
 * @returns Background
 */
const renderBg = (uri: string): JSX.Element => (
  <iframe className={style.bg} src={`/backgrounds/${uri}`} />
);

/**
 * Suspended background. Not sure if worth it
 * @param bg Background ID
 * @returns Background
 */
const Background = ({ bgId }: { bgId: number }) => {
  const uri = Challenges.getChallengeFromId(bgId)?.savedKey || "";
  return (
    <Suspense fallback={<div className={style.bg} />}>{renderBg(uri)}</Suspense>
  );
};

export default Background;
