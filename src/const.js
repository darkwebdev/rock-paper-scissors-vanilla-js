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

const weaponIds = {
  WEAPON1: 'weapon1',
  WEAPON2: 'weapon2'
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

const initialState = {
  step: steps.CHOOSE_WEAPON,
  score: [0, 0],
  weapon1: undefined,
  weapon2: undefined,
  outcome: undefined,
};

export {
  weapons,
  weaponRules,
  weaponIds,
  outcomes,
  steps,
  events,
  initialState
};
