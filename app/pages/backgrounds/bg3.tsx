import orbitGenerator from "components/backgrounds/orbit/generator";
import { CanvasBackground } from "components/backgrounds/useBackground";
import { noSsrComponent } from "components/common/NoSSR";

export default noSsrComponent(CanvasBackground(orbitGenerator));
