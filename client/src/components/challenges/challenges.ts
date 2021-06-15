import axios from "axios";

interface Challenges {
  challenges: Challenge[];
  unlocked: Set<number>;
  initialUnlock: () => void;
  isFaqUnlocked: () => boolean;
  getAllChallenges: () => Challenge[];
  getUnlocked: () => number;
  getChallengeFromId: (id: number) => Challenge | void;
  isUnlockedFromId: (id: number) => boolean;
  checkFlag: (id: number, flag: string) => Promise<boolean>;
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

  unlocked: new Set([0]),

  initialUnlock() {
    this.challenges.forEach(({ id }) => {
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
    return this.challenges;
  },

  getUnlocked(): number {
    return this.unlocked.size;
  },

  getChallengeFromId(id: number): Challenge | void {
    if (id >= this.challenges.length) return;
    return this.challenges.find((challenge) => challenge.id === id);
  },

  isUnlockedFromId(id: number) {
    return this.unlocked.has(id);
  },

  async checkFlag(id: number, flag: string) {
    const { data } = await axios.post(
      process.env.REACT_APP_API_URL + "/api/check_flag",
      {
        id: id,
        msg: flag,
      }
    );
    console.log(data);
    if (!!data.success && data.secret === process.env[`REACT_APP_BG_${id}`]) {
      localStorage.setItem(`BG${id}`, data.secret);
      this.unlocked.add(id);
    }
    return data.success;
  },
};

export default Challenges;
