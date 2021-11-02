import type { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";

const useBackgroundState = (): [number, Dispatch<SetStateAction<number>>] => {
  // Make sure we are in client context
  // Make arbitrary useState for SSR? Need to make sure that's right
  if (typeof window === "undefined") return useState(0);

  const localBgKey = "bgId";
  const savedBg = window.localStorage.getItem(localBgKey);

  if (!savedBg) window.localStorage.setItem(localBgKey, "0");

  const [bgId, setBgId] = useState<number>(
    !!savedBg && parseInt(savedBg) ? parseInt(savedBg) : 0
  );

  useEffect(() => {
    window.localStorage.setItem(localBgKey, bgId.toString());
  }, [bgId]);

  return [bgId, setBgId];
};

export default useBackgroundState;
