import Controller from './controller.js';
import { emit } from './events.js';
import { events } from './const.js';

Controller();

emit(events.RESET_GAME);

if (window) {
  window.emit = emit;
}
