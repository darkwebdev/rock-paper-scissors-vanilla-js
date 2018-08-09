const { outcomes } = require('./const');

const Game = (rules) => ({
  version: '0.1',

  roundOutcome(weapon1, optionalWeapon) {
    const weapon2 = optionalWeapon || randomWeapon();

    if (weapon1 === weapon2) return outcomes.TIE;

    return rules[weapon1].beats.includes(weapon2) ? outcomes.WIN : outcomes.LOSE;
  },

  reversedOutcome(outcome) {
    return {
      [outcomes.TIE]: outcomes.TIE,
      [outcomes.WIN]: outcomes.LOSE,
      [outcomes.LOSE]: outcomes.WIN
    }[outcome];
  },

  updatedScore(score, outcome) {
    const newScores = {
      [outcomes.WIN]: [score[0] + 1, score[1]],
      [outcomes.LOSE]: [score[0], score[1] + 1],
      [outcomes.TIE]: score
    };

    return newScores[outcome];
  },

  reversedScore(score) {
    return [ score[1], score[0] ];
  }
});

function randomWeapon(weapons) {
  const weaponKeys = Object.keys(weapons);
  const randomKey = weaponKeys[Math.floor(Math.random() * weaponKeys.length)];

  return weapons[randomKey];
}

module.exports = Game;
module.exports.randomWeapon = randomWeapon;
