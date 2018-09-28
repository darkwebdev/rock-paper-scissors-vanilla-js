const subscribers = {};

export function on(event, cb) {
  subscribe(event, cb);
}

export function emit(event, data) {
  (subscribers[event] || []).forEach(cb => cb(data));
}

function subscribe(event, cb) {
  subscribers[event] = (subscribers[event] || []).concat([cb]);
}
