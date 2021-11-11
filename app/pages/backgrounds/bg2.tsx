import lineGenerator from "components/backgrounds/lines/generator";
import { NoSSRCanvasBackground } from "components/backgrounds/useBackground";
import dynamic from "next/dynamic";

export default dynamic(
  () => Promise.resolve(NoSSRCanvasBackground(lineGenerator)),
  {
    ssr: false,
  }
);
