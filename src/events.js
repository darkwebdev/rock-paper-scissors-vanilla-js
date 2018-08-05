const subscribers = {};

module.exports = {
  on(event, cb) {
    subscribe(event, cb);
  },

  emit(event, data) {
    (subscribers[event] || []).forEach(cb => cb(data));
  }
};

function subscribe(event, cb) {
  subscribers[event] = (subscribers[event] || []).concat([cb]);
}
