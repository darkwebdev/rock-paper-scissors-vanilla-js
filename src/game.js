import { weapons, outcomes } from './const.js';

export default rules => ({
  version: '0.1',

  roundResult(weapon1, optionalWeapon) {
    const weapon2 = optionalWeapon || randomWeapon();

    if (weapon1 === weapon2) return outcomes.TIE;

    return rules[weapon1].beats.includes(weapon2) ? outcomes.WIN : outcomes.LOSE;
  },

  updatedScore(score, outcome) {
    const newScores = {
      [outcomes.WIN]: [score[0] + 1, score[1]],
      [outcomes.LOSE]: [score[0], score[1] + 1],
      [outcomes.TIE]: score
    };

    return newScores[outcome];
  },

  randomWeapon
});

function randomWeapon() {
  const weaponKeys = Object.keys(weapons);
  const randomKey = weaponKeys[Math.floor(Math.random() * weaponKeys.length)];

  return weapons[randomKey];
}
