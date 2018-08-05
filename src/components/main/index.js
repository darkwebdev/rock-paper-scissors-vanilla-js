const { emit } = require('../../events');
const views = require('../../views');
const Weapons = require('../weapons');
const template = require('./index.ejs');
const { events } = require('../../const');

module.exports = (context) => {
  views.render({
    ...context,
    template
  });

  views.attachHandlers([{
    selector: '#reset-game',
    handler() {
      emit(events.RESET_GAME);
    }
  }]);

  Weapons({
    ...context,
    root: '#weapons'
  });
};
