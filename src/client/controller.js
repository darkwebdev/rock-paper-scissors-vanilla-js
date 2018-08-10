const { on, emit, ...events } = require('../common/events');
const { weapons, steps, modes, connection } = require('../common/const');
const Main = require('./components/main');

let state = {};

module.exports = (game) => {
  on(events.SERVER_MSG_RECEIVED, ({ event, state: newState }) => {
    console.log('SERVER_MSG_RECEIVED', { event, newState });

    if (newState) {
      emit(events.UPDATE_STATE, newState);
    }
  });

  on(events.CONNECTION_ON, () => {
    const newState = {
      connection: connection.ONLINE
    };

    emit(events.UPDATE_STATE, newState);
    emit(events.RESET_GAME);
  });

  on(events.CONNECTION_OFF, () => {
    const newState = {
      connection: connection.OFFLINE
    };

    emit(events.UPDATE_STATE, newState);
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
      const enemyWeapon = game.randomWeapon(weapons);
      const outcome = game.roundOutcome(myWeapon, enemyWeapon);

      const newState = {
        step: steps.ROUND_END,
        myWeapon,
        enemyWeapon,
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
      myWeapon: undefined,
      enemyWeapon: undefined,
      outcome: undefined
    };

    emit(events.SERVER_SEND_MSG, { event: events.READY });
    emit(events.UPDATE_STATE, newState);
  });

  on(events.RESET_GAME, () => {
    if (state.mode === modes.MULTIPLAYER) {
      const newState = {
        step: steps.WAIT_ENEMY,
        myWeapon: undefined,
        enemyWeapon: undefined,
        outcome: undefined,
        score: [0, 0]
      };

      emit(events.UPDATE_STATE, newState);
    } else {
      const newState = {
        step: steps.CHOOSE_WEAPON,
        myWeapon: undefined,
        enemyWeapon: undefined,
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
