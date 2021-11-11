import boidGenerator from "components/backgrounds/boids/generator";
import { NoSSRCanvasBackground } from "components/backgrounds/useBackground";
import dynamic from "next/dynamic";

export default dynamic(
  () => Promise.resolve(NoSSRCanvasBackground(boidGenerator)),
  {
    ssr: false,
  }
);
