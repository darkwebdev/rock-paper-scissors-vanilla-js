const subscribers = {};

const events = {
  WEAPON_SELECTED: 'weapon-selected',
  ENEMY_WEAPON_SELECTED: 'enemy-weapon-selected',
  NEXT_ROUND: 'next-round',
  UPDATE_STATE: 'update-state',
  STATE_CHANGED: 'state-changed',
  RESET_GAME: 'reset-game',
  SERVER_SEND_MSG: 'server-send-msg',
  SERVER_MSG_RECEIVED: 'server-msg-received',
  CLIENT_SEND_MSG: 'client-send-msg',
  CLIENT_MSG_RECEIVED: 'client-msg-received',
  ADD_CLIENT: 'add-client',
  WAIT_ENEMY: 'wait-enemy',
  READY: 'ready',
  CONNECTION_ON: 'connection-on',
  CONNECTION_OFF: 'connection-off'
};

module.exports = {
  ...events,

  on(event, cb) {
    subscribe(event, cb);
    return cb;
  },

  off(event, cb) { // todo: simplify design
    subscribers[event] = (subscribers[event] || []).filter(ccb => ccb !== cb);
  },

  emit(event, data) {
    console.log('EMIT', event, data);
    (subscribers[event] || []).forEach(cb => cb(data));
  }
};

function subscribe(event, cb) {
  subscribers[event] = (subscribers[event] || []).concat([cb]);
}
