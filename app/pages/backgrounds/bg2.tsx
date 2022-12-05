import lineGenerator from "components/backgrounds/lines/generator";
import { CanvasBackground } from "components/backgrounds/useBackground";
import { noSsrComponent } from "components/common/NoSSR";

export default noSsrComponent(CanvasBackground(lineGenerator));
