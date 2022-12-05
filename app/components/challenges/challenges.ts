interface ChallengeInterface {
  challengeArr: Challenge[];
  initialUnlock: () => void;
  isFaqSolved: () => boolean;
  getAllChallenges: () => Challenge[];
  getUnlocked: () => number;
  getChallengeFromId: (id: number) => Challenge | undefined;
  isUnlockedFromId: (id: number) => boolean;
  checkKey: (key: string) => boolean; // TODO: Make API to check keys
  submitFlag: (id: number, flag: string) => Promise<boolean>;
  getBgTemplate: (id: number) => string;
  saveKey: (id: number, key: string) => void;
  getSavedKey: (id: number) => string | null;
}

interface Challenge {
  id: number;
  title: string;
  logo: any;
  unsolvedDesc: string;
  solvedDesc: string;
  savedKey: string;
}

const Challenges: ChallengeInterface = {
  challengeArr: [
    {
      id: 0,
      title: "Boring. Gross.",
      logo: "nodes.svg",
      unsolvedDesc: `Seriously, stop using this background it's uncreative and unoriginal. And I know what you're thinking, "You're using it as well; you're just as bad as the rest of us." And that's true but-`,
      solvedDesc: "The journey begins!",
      savedKey: "bg1",
    },
    {
      id: 1,
      title: "Ground rules",
      logo: "lines.svg",
      unsolvedDesc: `Please fuzz for our Rules page for more information`,
      solvedDesc: "Thanks for reading - have fun!",
      savedKey: "bg2",
    },
    {
      id: 2,
      title: `WHY. WON'T. THIS. WORK?!`,
      logo: "boids.svg",
      unsolvedDesc: `👉 FLAG{TH1S15TH3FL4G} 👈`,
      solvedDesc: "Here's a business proposal: Postmates, but for dogs..?",
      savedKey: "",
    },
    {
      id: 3,
      title: "Support Desk",
      logo: "orbit.svg",
      unsolvedDesc: "Please contact our Support team for the flag.",
      solvedDesc:
        "Fun fact: 50% of support chats are manned by bots. You've been flirting with a bot this whole time!",
      savedKey: "",
    },
    {
      id: 4,
      title: "Book Store",
      logo: "eyes.svg",
      unsolvedDesc: "Just a collection of fine reads.",
      solvedDesc: "Do people really buy books from bookstores?",
      savedKey: "",
    },
  ],

  initialUnlock() {
    this.challengeArr.forEach((chal) => {
      const { id } = chal;
      const key = this.getSavedKey(id) || chal.savedKey;
      if (this.checkKey(key)) {
        chal.savedKey = key;
      }
    });
  },

  isFaqSolved() {
    const faqId = 1;
    return this.checkKey(this.challengeArr[faqId].savedKey);
  },

  getAllChallenges(): Challenge[] {
    return this.challengeArr;
  },

  getUnlocked(): number {
    return this.challengeArr.reduce(
      (acc, { savedKey }) => acc + (this.checkKey(savedKey) ? 1 : 0),
      0
    );
  },

  getChallengeFromId(id: number): Challenge | undefined {
    return this.challengeArr.find((challenge) => challenge.id === id);
  },

  isUnlockedFromId(id: number) {
    const chal = this.getChallengeFromId(id);
    return !!chal ? this.checkKey(chal.savedKey) : false;
  },

  checkKey(key: string) {
    return !!key;
  },

  async submitFlag(id: number, flag: string) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/checkFlag", {
      method: "POST",
      body: JSON.stringify({ id: id, flag: flag }),
    });
    const { data } = res;
    console.log(data, res, res.body);
    if (!!data.code && this.checkKey(data.data)) {
      this.saveKey(id, data.data);
      const chal = this.getChallengeFromId(id);
      if (!!chal) {
        chal.savedKey = data.data;
        return true;
      }
    }
    return false;
  },

  getBgTemplate(id: number) {
    return `BG${id}`;
  },

  saveKey(id: number, key: string) {
    localStorage.setItem(this.getBgTemplate(id), key);
  },

  getSavedKey(id: number) {
    return localStorage.getItem(this.getBgTemplate(id));
  },
};

export default Challenges;
