const { randomWeapon } = require('./game');
const { emit, on } = require('./events');
const { weapons, events, steps } = require('./const');
const Main = require('./components/main');
let state = {};

module.exports = (game) => {
  on(events.WEAPON_SELECTED, weapon1 => {
    const weapon2 = randomWeapon();
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

    console.log('State changed', state);
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
    Main({
      state: newState,
      game,
      weapons,
      root: '#app'
    });
  });
};
