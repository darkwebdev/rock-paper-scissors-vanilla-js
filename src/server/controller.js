const { on, off, emit, ...events } = require('../common/events');
const { modes, steps } = require('../common/const');
const reducers = require('./reducers');

const initialState = {
  mode: modes.MULTIPLAYER,
  step: steps.WAIT_READY,
  score: [0, 0]
};

let state = {};

module.exports = (game, clients) => {
  const onClientMsgReceived = on(events.CLIENT_MSG_RECEIVED, ({ event: clientEvent, clientId, data: eventData }) => {
    if (!clients.includes(clientId)) return;

    console.log('CLIENT_MSG_RECEIVED', clientEvent, eventData);
    const reducer = reducers[clientEvent];

    if (!reducer) {
      console.log('Error: unknown client event', clientEvent);
      return;
    }

    const { serverState, clientMessages = [] } = reducer({ state, eventData, game, clients, clientId });

    emit(events.UPDATE_STATE, serverState);

    clientMessages.forEach(msg => {
      emit(events.CLIENT_SEND_MSG, msg);
    });
  });

  const onUpdateState = on(events.UPDATE_STATE, newState => {
    state = { ...state, ...newState };

    emit(events.STATE_CHANGED, state);
  });

  const onStateChanged = on(events.STATE_CHANGED, newState => {
    console.log('State update', newState);
  });

  const onDisconnect = on(events.CONNECTION_OFF, () => {
    emit(events.UPDATE_STATE, initialState);
  });

  return {
    destroy() {
      off(events.CLIENT_MSG_RECEIVED, onClientMsgReceived);
      off(events.UPDATE_STATE, onUpdateState);
      off(events.STATE_CHANGED, onStateChanged);
      off(events.CONNECTION_OFF, onDisconnect);
    }
  };
};

module.exports.initialState = initialState;
