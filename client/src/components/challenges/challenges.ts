import axios from "axios";

interface ChallengeInterface {
  challengeArr: Challenge[];
  firstLoad: boolean;
  unlocked: Set<number>;
  initialUnlock: () => void;
  isFaqUnlocked: () => boolean;
  getAllChallenges: () => Challenge[];
  getUnlocked: () => number;
  getChallengeFromId: (id: number) => Challenge | undefined;
  isUnlockedFromId: (id: number) => boolean;
  checkFlag: (id: number, flag: string) => Promise<boolean>;
}

interface Challenge {
  id: number;
  title: string;
  logo: any;
  desc: string;
}

const Challenges: ChallengeInterface = {
  challengeArr: [
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
      desc: `Please fuzz for our Rules page for more information`,
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
      desc: "Contact Support for the flag",
    },
  ],

  firstLoad: true,

  unlocked: new Set([0]),

  initialUnlock() {
    this.challengeArr.forEach(({ id }) => {
      if (
        localStorage.getItem(`BG${id}`) === process.env[`REACT_APP_BG_${id}`]
      ) {
        this.unlocked.add(id);
      }
    });
  },

  isFaqUnlocked() {
    return this.unlocked.has(1);
  },

  getAllChallenges(): Challenge[] {
    return this.challengeArr;
  },

  getUnlocked(): number {
    return this.unlocked.size;
  },

  getChallengeFromId(id: number): Challenge | undefined {
    return this.challengeArr.find((challenge) => challenge.id === id);
  },

  isUnlockedFromId(id: number) {
    return this.unlocked.has(id);
  },

  async checkFlag(id: number, flag: string) {
    const { data } = await axios.post(
      process.env.REACT_APP_API_URL + "/check",
      {
        id: id,
        msg: flag,
      }
    );
    if (!!data.code && data.data === process.env[`REACT_APP_BG_${id}`]) {
      localStorage.setItem(`BG${id}`, data.secret);
      this.unlocked.add(id);
    }
    return data.code;
  },
};

export default Challenges;
