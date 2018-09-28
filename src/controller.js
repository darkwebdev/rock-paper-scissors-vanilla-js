import { emit, on } from './events.js';
import { weapons, events, steps } from './const.js';
import Main from './components/main/index.js';

let state = {};

export default function (game) {
  on(events.WEAPON_SELECTED, weapon1 => {
    const weapon2 = game.randomWeapon();
    const outcome = game.roundResult(weapon1, weapon2);

    const newState = {
      step: steps.ROUND_END,
      weapon1,
      weapon2,
      outcome,
      score: game.updatedScore(state.score, outcome)
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
    const newState = {
      step: steps.CHOOSE_WEAPON,
      weapon1: undefined,
      weapon2: undefined,
      outcome: undefined,
      score: [0, 0]
    };

    emit(events.UPDATE_STATE, newState);
  });

  on(events.STATE_CHANGED, newState => {
    document.querySelector('#app').innerHTML = Main({
      state: newState,
      game,
      weapons
    });
  });
}
