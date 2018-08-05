const Game = require('./game');
const Controller = require('./controller');
const { emit } = require('./events');
const { weaponRules, steps, events } = require('./const');

const game = Game(weaponRules);
Controller(game);

const initialState = {
  step: steps.CHOOSE_WEAPON,
  score: [0, 0]
};

emit(events.UPDATE_STATE, initialState);

console.log("Game started, version", game.version);
