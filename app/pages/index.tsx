import type { NextPage } from "next";
import { useEffect } from "react";
import Background from "../components/backgrounds/background";
import Menu from "../components/menu/menu";
import useBackgroundState from "lib/hooks/backgroundObserver";
import "styles/Home.module.scss";

const Home: NextPage = () => {
  useEffect(() => {
    //eslint-disable-next-line
    console.log(
      "%c" +
      "-------------------------------------------------------\n" +
      "|                                                     |\n" +
      "|              Tired of the background?               |\n" +
      "|               Try unlocking some! ;)                |\n" +
      "|                                                     |\n" +
      "-------------------------------------------------------",
      "background: #000; color: #bada55",
    );
  }, []);

  const [bgId, setBgId] = useBackgroundState();

  return (
    <div className="app">
      <Background bgId={bgId} />
      <Menu bgId={bgId} unlock={(id: number) => setBgId(id)} />
    </div>
  );
};

export default Home;
