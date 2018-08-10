const { on, emit, ...events } = require('../common/events');

const minIntervalMs = 1000;
let retriesCounter = 0;
let connection;

connect();

on(events.SERVER_SEND_MSG, ({ event, data = {} }) => {
  send({ event, data });
});

on(events.CONNECTION_OFF, () => {
  console.log('Connection closed.');
  // reconnect();
});

module.exports = {
  connection,
  send
};

function connect({ server = '127.0.0.1', port = 1337 } = {}) {
  if (connection && connection.readyState !== connection.CLOSED) {
    connection.close();
  }

  console.log('Connecting...', retriesCounter);

  connection = new (window.WebSocket || window.MozWebSocket)(`ws://${server}:${port}`);

  connection.onclose = () => {
    console.log('connection.onclose');
    emit(events.CONNECTION_OFF);

    reconnect();
  };

  connection.onopen = () => {
    console.log('Connection is opened.');
    retriesCounter = 0;
    emit(events.SERVER_SEND_MSG, { event: events.READY });
    emit(events.CONNECTION_ON);
  };

  connection.onerror = (error) => {
    console.log('Websocket error', error);

    if (connection.readyState === connection.CLOSED) {
      console.log('Connection failed');

      // reconnect();
    }
  };

  connection.onmessage = (message) => {
    try {
      const json = JSON.parse(message.data);
      console.log('Got message from server', json);
      emit(events.SERVER_MSG_RECEIVED, json);
    } catch (e) {
      console.log('This does not look like a valid JSON: ', message.data);
    }
  };

}

function reconnect() {

  setTimeout(() => {
    console.log('reconnect');
    retriesCounter += 1;
    connection = undefined;
    connect();
  }, 2000);
}
function send({ event, data = {} }) {
  if (connection.readyState === connection.OPEN) {
    connection.send(JSON.stringify({ event, data }));
  }
}
