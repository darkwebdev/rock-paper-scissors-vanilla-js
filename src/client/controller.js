const { on, emit, ...events } = require('../common/events');
const { weapons, steps, modes } = require('../common/const');
const Main = require('./components/main');

let state = {};

module.exports = (game) => {
  on(events.SERVER_MSG_RECEIVED, ({ event, state: newState }) => {
    console.log('SERVER_MSG_RECEIVED', { event, newState });

    if (newState) {
      emit(events.UPDATE_STATE, newState);
    }
  });

  on(events.WEAPON_SELECTED, myWeapon => {
    if (state.mode === modes.MULTIPLAYER) {
      emit(events.SERVER_SEND_MSG, {
        event: events.WEAPON_SELECTED,
        data: myWeapon
      });

      const newState = {
        step: steps.WAIT_ENEMY,
        myWeapon,
        // enemyWeapon: undefined
      };
      emit(events.UPDATE_STATE, newState);
    } else {
      const client1weapon = game.randomWeapon(weapons);
      const outcome = game.roundOutcome(myWeapon, client1weapon);

      const newState = {
        step: steps.ROUND_END,
        myWeapon,
        client1weapon,
        outcome,
        score: game.updatedScore(state.score, outcome)
      };

      emit(events.UPDATE_STATE, newState);
    }
  });

  on(events.UPDATE_STATE, newState => {
    state = { ...state, ...newState };

    emit(events.STATE_CHANGED, state);
  });

  on(events.NEXT_ROUND, () => {
    const newState = {
      step: steps.WAIT_ENEMY,
      client0weapon: undefined,
      client1weapon: undefined,
      outcome: undefined
    };

    emit(events.SERVER_SEND_MSG, events.READY);
    emit(events.UPDATE_STATE, newState);
  });

  on(events.RESET_GAME, () => {
    if (state.mode === modes.MULTIPLAYER) {
      console.log('reset game not implemented');
    } else {
      const newState = {
        step: steps.CHOOSE_WEAPON,
        client0weapon: undefined,
        client1weapon: undefined,
        outcome: undefined,
        score: [0, 0]
      };

      emit(events.UPDATE_STATE, newState);
    }
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
