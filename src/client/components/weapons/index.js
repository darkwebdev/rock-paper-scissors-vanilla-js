const views = require('../../views');
const { emit, on, ...events } = require('../../../common/events');
const { weapons } = require('../../../common/const');
const template = require('./index.ejs');

const weaponHandlers = Object.keys(weapons).map(name => ({
  selector: `#weapon-${name}`,
  handler() {
    emit(events.WEAPON_SELECTED, weapons[name]);
  }
}));

const endRoundHandler = {
  selector: '#next-round',
  handler() {
    emit(events.NEXT_ROUND);
  }
};

module.exports = (context) => {
  views.render({
    ...context,
    template
  });

  views.attachHandlers(weaponHandlers.concat([endRoundHandler]));
};
