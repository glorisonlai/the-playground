import axios from "axios";

interface ChallengeInterface {
  challengeArr: Challenge[];
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
  unsolvedDesc: string;
  solvedDesc: string;
}

const Challenges: ChallengeInterface = {
  challengeArr: [
    {
      id: 0,
      title: "Boring. Gross.",
      logo: "nodes.svg",
      unsolvedDesc: `Seriously, stop using this background it's uncreative and unoriginal. And I know what you're thinking, "You're using it as well; you're just as bad as the rest of us." And that's true but-`,
      solvedDesc: "The journey begins!",
    },
    {
      id: 1,
      title: "Ground rules",
      logo: "lines.svg",
      unsolvedDesc: `Please fuzz for our Rules page for more information`,
      solvedDesc: "Thanks for reading - have fun!",
    },
    {
      id: 2,
      title: `WHY. WON'T. THIS. WORK?!`,
      logo: "boids.svg",
      unsolvedDesc: `FLAG{TH1S15TH3FL4G}`,
      solvedDesc: "We thank StackOverflow",
    },
    {
      id: 3,
      title: "Support Desk",
      logo: "orbit.svg",
      unsolvedDesc: "Please contact our Support team for the flag.",
      solvedDesc:
        "Fun fact: 50% of support chats are manned by bots. You've been flirting with a bot this whole time!",
    },
    {
      id: 4,
      title: "Book Store",
      logo: "eyes.svg",
      unsolvedDesc: "Just a collection of fine reads.",
      solvedDesc: "Do people really buy books from bookstores?",
    },
  ],

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
