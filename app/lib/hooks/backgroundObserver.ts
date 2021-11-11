import Challenges from "components/challenges/challenges";
import type { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";

const useBackgroundState = (): [number, Dispatch<SetStateAction<number>>] => {
  // Make sure we are in client context
  // Make arbitrary useState for SSR? Need to make sure that's right
  if (typeof window === "undefined") return useState(0);

  Challenges.initialUnlock();

  const localBgKey = "bgId";
  const savedBg = window.localStorage.getItem(localBgKey);

  if (!savedBg) window.localStorage.setItem(localBgKey, "0");

  const initBg = (!!savedBg && parseInt(savedBg, 10)) || 0;

  const [bgId, setBgId] = useState<number>(
    Challenges.isUnlockedFromId(initBg) ? initBg : 0
  );

  useEffect(() => {
    window.localStorage.setItem(localBgKey, bgId.toString());
  }, [bgId]);

  return [bgId, setBgId];
};

export default useBackgroundState;
