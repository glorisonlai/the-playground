import React, { useState, Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Start from "./components/content/start";
const App = lazy(() => import("./App"));

const Index = () => {
  const [chalsLoaded, setChalsLoaded] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  const chalsLoadedHandler = (loaded: boolean): void => {
    if (chalsLoaded) return;
    setChalsLoaded(loaded);
  };

  const bgLoadedHandler = (loaded: boolean): void => {
    if (bgLoaded) return;
    setBgLoaded(loaded);
  };

  return (
    <Suspense
      fallback={
        <Start className="" chalLoaded={chalsLoaded} bgLoaded={bgLoaded} />
      }
    >
      <App
        chalLoadedCallback={chalsLoadedHandler}
        bgLoadedCallback={bgLoadedHandler}
      />
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
