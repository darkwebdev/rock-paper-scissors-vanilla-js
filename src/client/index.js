const Game = require('../common/game');
const Controller = require('./controller');
const { emit, on, ...events } = require('../common/events');
const { weaponRules, steps, modes } = require('../common/const');
const { connection } = require('./ws');

const game = Game(weaponRules);
Controller(game, connection);

const initialState = {
  mode: modes.MULTIPLAYER, // todo: make it selectable
  step: steps.WAIT_ENEMY,
  score: [0, 0]
};

emit(events.UPDATE_STATE, initialState);
