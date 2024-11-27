'use client'

import boidGenerator from "components/backgrounds/boids/generator";
import { CanvasBackground } from "components/backgrounds/useBackground";
import { noSsrComponent } from "components/common/NoSSR";

export default CanvasBackground(boidGenerator);

