const crypto = require('crypto');

const { weaponRules, config } = require('../common/const');
const { emit, ...events } = require('../common/events');
const Game = require('../common/game');
const Controller = require('./controller');

let sessions = [];

module.exports = {
  getJoinOrCreateSession(clientId) {
    return sessionByClientId(clientId) || joinAvailableSession(clientId) || createSession(clientId);
  },

  allSessions() {
    return sessions;
  },

  destroySession(id) {
    const session = sessions.find(s => s.id === id);
    if (session) {
      session.controller.destroy();
      sessions = sessions.filter(s => s.id !== id);
    } else {
      console.log('Error: could not find session', id);
      console.log('Error: all sessions', sessions);
    }
  }
};

function sessionByClientId(clientId) {
  return sessions.find(s => s.clients.includes(clientId));
}

function joinAvailableSession(clientId) {
  const joinableSession = sessions.find(s => s.clients.length < config.MAX_CLIENTS);

  if (joinableSession) {
    joinableSession.clients.push(clientId);
  }

  return joinableSession;
}

function createSession(clientId) {
  const game = Game(weaponRules);
  const clients = [clientId];
  const session = {
    id: crypto.randomBytes(16).toString('hex'),
    clients,
    controller: Controller(game, clients)
  };
  sessions.push(session);

  emit(events.UPDATE_STATE, Controller.initialState);

  return session;
}
