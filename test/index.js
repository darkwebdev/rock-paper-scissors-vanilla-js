const { expect } = require('chai');
const Game = require('../src/common/game');
const { weapons, weaponRules, outcomes } = require('../src/common/const');

const game = Game(weaponRules);

describe('Game', () => {
  it('should create the game', () => {
    expect(game).to.have.property('version');
  });

  describe('Win/lose logic', () => {
    it('Rock should beat Scissors', () => {
      expect(game.roundOutcome(weapons.ROCK, weapons.SCISSORS)).to.equal(outcomes.WIN);
    });

    it('Paper should tie Paper', () => {
      expect(game.roundOutcome(weapons.PAPER, weapons.PAPER)).to.equal(outcomes.TIE);
    });

    it('Paper should lose to Scissors', () => {
      expect(game.roundOutcome(weapons.PAPER, weapons.SCISSORS)).to.equal(outcomes.LOSE);
    });
  });
});
