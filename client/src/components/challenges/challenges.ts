interface Challenges {
  challenges: Array<Challenge>;
  unlocked: Array<number>;
  getUnlockedChallenges: Function;
  getAllChallenges: Function;
  getChallengeFromId: Function;
  isUnlockedFromId: Function;
}

interface Challenge {
  id: number;
  title: string;
  logo: string;
  desc: string;  
}

const Challenges: Challenges = {
  challenges: [
    {
      id: 0,
      title: 'Bubbles',
      logo: 'bubbs.svg',
      desc: 'The journey begins!',
    },
    {
      id: 1,
      title: 'Lines of Communication',
      logo: 'lines.webp',
      desc: `Please fuzz for our FAQ page for more information`,
    },
    {
      id: 2,
      title: `WHY. WON'T. THIS. POST?!`,
      logo: 'logo.svg',
      desc: `FLAG{TH1S_15_TH3_FL4G}`,
    },
  ],

  unlocked:  [0, 1, 2],

  getUnlockedChallenges () {
    console.log('hello')
  },

  getAllChallenges () {
    return this.challenges;
  },

  getChallengeFromId (id: number) {
    if (id >= this.challenges.length) return;
    return this.challenges.find(challenge => challenge.id === id)
  },

  isUnlockedFromId (id: number) {
    return this.unlocked.includes(id);
  },
};

export default Challenges;