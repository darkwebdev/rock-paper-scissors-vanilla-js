const views = require('../../views');
const { emit } = require('../../events');
const { weapons, events } = require('../../const');
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
