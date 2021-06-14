import React from "react";
import ChatApp from "./challenge-comp/chat_app";
import axios from "axios";

interface Challenges {
  challenges: Array<Challenge>;
  unlocked: Array<number>;
  initialUnlock: Function;
  getUnlockedChallenges: Function;
  isFaqUnlocked: Function;
  getAllChallenges: Function;
  getChallengeFromId: Function;
  isUnlockedFromId: Function;
  checkFlag: Function;
}

interface Challenge {
  id: number;
  title: string;
  logo: string;
  desc: any;
}

const Challenges: Challenges = {
  challenges: [
    {
      id: 0,
      title: "Boring. Default. Gross.",
      logo: "bubbs.svg",
      desc: "The journey begins!",
    },
    {
      id: 1,
      title: "Ground rules",
      logo: "lines.webp",
      desc: `Please fuzz for our FAQ page for more information`,
    },
    {
      id: 2,
      title: `WHY. WON'T. THIS. POST?!`,
      logo: "logo.svg",
      desc: `FLAG{TH1S15TH3FL4G}`,
    },
    {
      id: 3,
      title: "Support Desk",
      logo: "logo.svg",
      desc: "hello",
    },
  ],

  unlocked: [0],

  async initialUnlock() {
    const { data } = await axios.get("http://localhost:1469/api/check_bg", {
      withCredentials: true,
    });
    console.log(data);
    for (const key of Object.keys(data)) {
      if (data[key]) {
        this.unlocked.push(parseInt(key));
      }
    }
  },

  getUnlockedChallenges() {
    console.log("hello");
  },

  isFaqUnlocked() {
    return this.unlocked.includes(1);
  },

  getAllChallenges(): Challenge[] {
    return this.challenges;
  },

  getChallengeFromId(id: number): Challenge | void {
    if (id >= this.challenges.length) return;
    return this.challenges.find((challenge) => challenge.id === id);
  },

  isUnlockedFromId(id: number) {
    return this.unlocked.includes(id);
  },

  async checkFlag(id: number, flag: string) {
    const { data } = await axios.post(
      "http://localhost:1469/api/check_flag",
      {
        id: id,
        msg: flag,
      },
      {
        withCredentials: true,
      }
    );
    console.log(data);
    if (data.success) {
      this.unlocked.push(id);
    }
    return data.success;
  },
};

export default Challenges;
