import slimeGenerator from "components/backgrounds/slime/generator";
import { CanvasBackground } from "components/backgrounds/useBackground";
import { noSsrComponent } from "components/common/NoSSR";

export default noSsrComponent(CanvasBackground(slimeGenerator));
