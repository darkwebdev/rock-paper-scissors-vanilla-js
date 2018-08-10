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
  ROUND_END: 'round-end',
  WAIT_ENEMY: 'wait-enemy',
  WAIT_READY: 'wait-ready'
};

const modes = {
  SINGLEPLAYER: 'singleplayer',
  MULTIPLAYER: 'multiplayer'
};

const config = {
  MAX_CLIENTS: 2
};

const connection = {
  ONLINE: 'online',
  OFFLINE: 'offline'
};

module.exports = {
  weapons,
  weaponRules,
  outcomes,
  steps,
  modes,
  config,
  connection
};
