import { createContext } from "react";

type bgContextProps = { bgId: number; solved: Set<number>; all: number };

const BackgroundContext = createContext<bgContextProps>({
  bgId: 0,
  solved: new Set(),
  all: 0,
});

export default BackgroundContext;
