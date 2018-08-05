const { weapons, outcomes } = require('./const');

const Game = (rules) => ({
  version: "0.1",

  roundResult(weapon1, optionalWeapon) {
    const weapon2 = optionalWeapon || randomWeapon();

    console.log('roundResult', weapon1, weapon2);
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
  }
});

function randomWeapon() {
  const weaponKeys = Object.keys(weapons);
  const randomKey = weaponKeys[Math.floor(Math.random() * weaponKeys.length)];

  return weapons[randomKey];
}

module.exports = Game;
module.exports.randomWeapon = randomWeapon;
