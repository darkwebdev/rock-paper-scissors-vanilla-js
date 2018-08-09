const events = require('../common/events');
const { steps } = require('../common/const');

module.exports = {
  [events.READY]: ({ state, clients, clientId }) => {
    const clientIndex = clients.indexOf(clientId);

    if (clientIndex === -1) return {};

    const serverState = {
      [`client${clientIndex}ready`]: true
    };

    const anotherClientIndex = 1 - clientIndex;

    const clientState = {
      step: steps.CHOOSE_WEAPON
    };

    const client0msg = {
      client: clients[0],
      state: clientState
    };

    const client1msg = {
      client: clients[1],
      state: clientState
    };

    return {
      serverState,
      clientMessages: state[`client${anotherClientIndex}ready`] ? [ client0msg, client1msg ] : []
    };
  },

  [events.WEAPON_SELECTED]: ({ state, eventData: clientWeapon, game, clients, clientId }) => {

    if (!clientWeapon) return {};

    const clientIndex = clients.indexOf(clientId);

    if (clientIndex === -1) return {};

    const enemyIndex = 1 - clientIndex;
    const enemyWeapon = state[`client${enemyIndex}weapon`];

    if (!enemyWeapon) {
      return {
        serverState: {
          [`client${clientIndex}weapon`]: clientWeapon
        }
      };
    }

    const outcome = game.roundOutcome(clientWeapon, enemyWeapon);
    const score = game.updatedScore(state.score, outcome);

    const serverState = {
      step: steps.ROUND_END,
      score,
      client0weapon: undefined,
      client1weapon: undefined
    };

    const clientState = {
      step: steps.ROUND_END,
      myWeapon: clientWeapon,
      enemyWeapon,
      outcome,
      score
    };

    const enemyState = {
      step: steps.ROUND_END,
      myWeapon: enemyWeapon,
      enemyWeapon: clientWeapon,
      outcome: game.reversedOutcome(outcome),
      score: game.reversedScore(score)
    };

    return {
      serverState,

      clientMessages: [{
        client: clients[clientIndex],
        state: clientState
      }, {
        client: clients[enemyIndex],
        state: enemyState
      }]
    };
  }
};
