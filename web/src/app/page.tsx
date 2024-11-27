import Image from "next/image";
import { useEffect } from "react";
import Background from "@/components/background";
import styles from "@/styles/page.module.scss";

export default function Home() {
  useEffect(() => {
    //eslint-disable-next-line
    console.log(
      "%c" +
      "-------------------------------------------------------\n" +
      "|                                                     |\n" +
      "|              Tired of the background?               |\n" +
      "|                Try unlocking some!                  |\n" +
      "|                                                     |\n" +
      "-------------------------------------------------------",
      "background: #000; color: #bada55",
    );
  }, []);

  return (
    <div className={styles.page}>
      <Background />
    </div>
  );
}
