const connection = new (window.WebSocket || window.MozWebSocket)('ws://127.0.0.1:1337');
const { on, emit, ...events } = require('../common/events');

// todo: retry on disconnect

connection.onopen = () => {
  console.log('Connection is opened and ready to use');
  emit(events.SERVER_SEND_MSG, { event: events.READY });
};

connection.onerror = (error) => {
  console.log('an error occurred when sending/receiving data', error);
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

on(events.SERVER_SEND_MSG, ({ event, data = {} }) => {
  send({ event, data });
});

module.exports = {
  connection,
  send
};

function send({ event, data = {} }) {
  if (connection.readyState === connection.OPEN) {
    connection.send(JSON.stringify({ event, data }));
  }
}
