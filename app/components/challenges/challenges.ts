import axios from "axios";
import Forge from "node-forge";

interface ChallengeInterface {
  challengeArr: Challenge[];
  initialUnlock: () => void;
  isFaqUnlocked: () => boolean;
  getAllChallenges: () => Challenge[];
  getUnlocked: () => number;
  getChallengeFromId: (id: number) => Challenge | undefined;
  isUnlockedFromId: (id: number) => boolean;
  checkKey: (id: number, key: string) => boolean;
  submitFlag: (id: number, flag: string) => Promise<boolean>;
  saveKey: (id: number, key: string) => void;
  getKey: (id: number) => string | null;
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
      savedKey: "",
    },
    {
      id: 1,
      title: "Ground rules",
      logo: "lines.svg",
      unsolvedDesc: `Please fuzz for our Rules page for more information`,
      solvedDesc: "Thanks for reading - have fun!",
      savedKey: "",
    },
    {
      id: 2,
      title: `WHY. WON'T. THIS. WORK?!`,
      logo: "boids.svg",
      unsolvedDesc: `FLAG{TH1S15TH3FL4G}`,
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
      const key = this.getKey(id) || chal.savedKey;
      if (this.checkKey(id, key)) {
        chal.savedKey = key;
      }
    });
  },

  isFaqUnlocked() {
    const faqId = 1;
    return this.checkKey(faqId, this.challengeArr[faqId].savedKey);
  },

  getAllChallenges(): Challenge[] {
    return this.challengeArr;
  },

  getUnlocked(): number {
    return this.challengeArr.reduce(
      (acc, { id, savedKey }) => acc + (this.checkKey(id, savedKey) ? 1 : 0),
      0
    );
  },

  getChallengeFromId(id: number): Challenge | undefined {
    return this.challengeArr.find((challenge) => challenge.id === id);
  },

  isUnlockedFromId(id: number) {
    const chal = this.getChallengeFromId(id);
    return !!chal ? this.checkKey(id, chal.savedKey) : false;
  },

  checkKey(id: number, key: string) {
    const secret = process.env[`REACT_APP_BG_${id}_SECRET`];
    const decoded_secret = process.env["REACT_APP_FLAG_SUCCESS"];
    const keyBytes = Forge.util.createBuffer(key);

    if (
      typeof secret === "string" &&
      typeof decoded_secret === "string" &&
      keyBytes.length() === 32
    ) {
      const encrypted = Forge.util.hexToBytes(secret);
      const decipher = Forge.cipher.createDecipher("AES-CBC", keyBytes);
      decipher.start({ iv: keyBytes.data });

      decipher.update(Forge.util.createBuffer(encrypted));
      decipher.finish();
      return decipher.output.toHex() === Forge.util.encodeUtf8(decoded_secret);
    }
    return false;
  },

  async submitFlag(id: number, flag: string) {
    const { data } = await axios.post(
      process.env.REACT_APP_API_URL + "/dev/check",
      {
        id: id,
        msg: flag,
      }
    );
    if (!!data.code && this.checkKey(id, data.data)) {
      this.saveKey(id, data.data);
      const chal = this.getChallengeFromId(id);
      if (!!chal) {
        chal.savedKey = data.data;
      }
    }
    return data.code;
  },

  saveKey(id: number, key: string) {
    localStorage.setItem(`BG${id}`, key);
  },

  getKey(id: number) {
    return localStorage.getItem(`BG${id}`);
  },
};

export default Challenges;
