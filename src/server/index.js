const { server } = require('websocket');
const http = require('http');

const events = require('../common/events');
const { getJoinOrCreateSession, destroySession, allSessions } = require('./sessions');

const httpServer = http.createServer();
httpServer.listen(1337, () => {
  console.log('HTTP server started on 1337');
});

// eslint-disable-next-line new-cap
const wsServer = new server({ httpServer });

wsServer.on('request', request => {
  const connection = request.accept(null, request.origin);

  const clientId = request.key;
  const session = getJoinOrCreateSession(clientId);
  console.log('Client connected', clientId, 'session', session.id);
  console.log('All sessions:', allSessions());

  connection.sendUTF(JSON.stringify({
    state: {
      clientId,
      session: session.id
    }
  }));

  connection.on('message', message => {
    const { event, data } = parsed(message);
    console.log('Got raw message', message.utf8Data);
    events.emit(events.CLIENT_MSG_RECEIVED, { event, clientId, data });
  });

  connection.on('close', () => {
    destroySession(session.id);
    console.log('Connnection closed, session killed.');
    events.emit(events.CONNECTION_LOST);
  });

  events.on(events.CLIENT_SEND_MSG, ({ client, state = {}, event = undefined }) => {
    if (client === clientId) {
      console.log('Sending message to', client, state, event);
      connection.sendUTF(JSON.stringify({ state, event }));
    }
  });
});

function parsed(message) {
  if (message.type === 'utf8') {
    try {
      return JSON.parse(message.utf8Data);
    } catch (e) {
      console.log('Error parsing json', e);
    }
  }

  return undefined;
}
