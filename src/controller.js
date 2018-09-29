import { emit, on } from './events.js';
import { events, steps, initialState } from './const.js';
import { randomWeapon, roundResult, updatedScore } from './game.js';
import Main from './components/main/index.js';

let state = {};

export default function (main) {
  on(events.WEAPON_SELECTED, weapon1 => {
    const weapon2 = randomWeapon();
    const outcome = roundResult(weapon1, weapon2);

    const newState = {
      step: steps.ROUND_END,
      weapon1,
      weapon2,
      outcome,
      score: updatedScore(state.score, outcome)
    };

    emit(events.UPDATE_STATE, newState);
  });

  on(events.UPDATE_STATE, newState => {
    state = { ...state, ...newState };

    emit(events.STATE_CHANGED, state);
  });

  on(events.NEXT_ROUND, () => {
    const newState = {
      step: steps.CHOOSE_WEAPON,
      weapon1: undefined,
      weapon2: undefined,
      outcome: undefined
    };

    emit(events.UPDATE_STATE, newState);
  });

  on(events.RESET_GAME, () => {
    emit(events.UPDATE_STATE, initialState);
  });

  on(events.STATE_CHANGED, newState => {
    document.querySelector(main).innerHTML = Main({ state: newState });
  });
}
