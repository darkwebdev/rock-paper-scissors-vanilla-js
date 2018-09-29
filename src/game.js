import { weapons, outcomes, weaponRules } from './const.js';

export {
  roundResult,
  updatedScore,
  randomWeapon,
  invertedOutcome
};

function updatedScore(score, outcome) {
  const newScores = {
    [outcomes.WIN]: [score[0] + 1, score[1]],
    [outcomes.LOSE]: [score[0], score[1] + 1],
    [outcomes.TIE]: score
  };

  return newScores[outcome];
}

function invertedOutcome(outcome) {
  return {
    [outcomes.WIN]: outcomes.LOSE,
    [outcomes.LOSE]: outcomes.WIN,
    [outcomes.TIE]: outcomes.TIE
  }[outcome];
}

function roundResult(weapon1, optionalWeapon) {
  const weapon2 = optionalWeapon || randomWeapon();

  if (weapon1 === weapon2) return outcomes.TIE;

  return weaponRules[weapon1].beats.includes(weapon2) ? outcomes.WIN : outcomes.LOSE;
}

function randomWeapon() {
  const weaponKeys = Object.keys(weapons);
  const randomKey = weaponKeys[Math.floor(Math.random() * weaponKeys.length)];

  return weapons[randomKey];
}
