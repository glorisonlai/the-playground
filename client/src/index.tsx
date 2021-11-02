import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import "styles/index.module.scss";
import * as serviceWorker from "./serviceWorker";
import Start from "./components/content/start";
const App = lazy(() => import("./App"));

export type LoadingComps = "Chal" | "Bg";

const Index = () => {
  const loadingState: { [Property in LoadingComps]: boolean } = {
    Chal: false,
    Bg: false,
  };

  const loadedHandler = (loaded: boolean, component: LoadingComps): void => {
    if (!loaded || loadingState[component]) return;
    const loadingElem = document.getElementById(`loading${component}`);
    if (loadingElem) loadingElem.innerHTML = "...DONE!";
    loadingState[component] = loaded;
  };

  return (
    <Suspense
      fallback={<Start className="" chalLoaded={false} bgLoaded={false} />}
    >
      <App loadedCallback={loadedHandler} />
    </Suspense>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
