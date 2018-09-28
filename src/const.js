const weapons = {
  ROCK: 'rock',
  PAPER: 'paper',
  SCISSORS: 'scissors'
};

const weaponRules = {
  [weapons.ROCK]: {
    beats: [weapons.SCISSORS]
  },
  [weapons.PAPER]: {
    beats: [weapons.ROCK]
  },
  [weapons.SCISSORS]: {
    beats: [weapons.PAPER]
  }
};

const outcomes = {
  WIN: 'win',
  LOSE: 'lose',
  TIE: 'tie'
};

const steps = {
  CHOOSE_WEAPON: 'choose-weapon',
  ROUND_END: 'round-end'
};

const events = {
  WEAPON_SELECTED: 'weapon-selected',
  NEXT_ROUND: 'next-round',
  UPDATE_STATE: 'update-state',
  STATE_CHANGED: 'state-changed',
  RESET_GAME: 'reset-game'
};

export {
  weapons,
  weaponRules,
  outcomes,
  steps,
  events
};
