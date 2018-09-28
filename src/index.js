import Game from './game.js';
import Controller from './controller.js';
import { emit } from './events.js';
import { weaponRules, steps, events } from './const.js';

const game = Game(weaponRules);
Controller(game);

const initialState = {
  step: steps.CHOOSE_WEAPON,
  score: [0, 0]
};

emit(events.UPDATE_STATE, initialState);

if (window) {
  window.emit = emit;
}
