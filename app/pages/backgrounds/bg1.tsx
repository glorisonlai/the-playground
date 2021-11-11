import boidGenerator from "components/backgrounds/boids/generator";
import UseCanvasBackground from "components/backgrounds/useBackground";

const Boids = () => <UseCanvasBackground generator={boidGenerator} />;

export default Boids;
