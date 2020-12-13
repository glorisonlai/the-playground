import { xdomainrequest } from "modernizr";

interface Challenge {
  id: number;
  title: string;
  logo: NodeRequire;
  desc: string;
}

class Challenges {
  challenges: Array<Challenge> = [
    {
      id: 0,
      title: 'Bubbles',
      logo: require('assets/sprites/bubbs.svg'),
      desc: 'The journey begins!',
    },
    {
      id: 1,
      title: 'Lines of Communication',
      logo: require('assets/sprites/logo.svg'),
      desc: `Please fuzz our FAQ page for more information`,
    },
    {
      id: 2,
      title: `WHY. WON'T. THIS. GO. IN?!`,
      logo: require('assets/sprites/logo.svg'),
      desc: `FLAG{TH1S_15_TH3_FL4G}`,
    },
  ];

  unlocked: Array<number> = [0, 1];

  getAllChallenges () {
    return this.challenges;
  }

  getChallengeFromId (id: number) {
    if (id >= this.challenges.length) return;
    return this.challenges.find(challenge => challenge.id === id)
  };

  isUnlockedFromId (id: number) {
    return this.unlocked.includes(id);
  }
}

export default new Challenges();