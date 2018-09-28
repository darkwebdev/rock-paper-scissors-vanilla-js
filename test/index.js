const { expect } = require('chai');
import Game from '../src/game';
import { weapons, weaponRules, outcomes } from '../src/const';

const game = Game(weaponRules);

describe('Game', () => {
  it('should create the game', () => {
    expect(game).to.have.property('version');
  });

  describe('Win/lose logic', () => {
    it('Rock should beat Scissors', () => {
      expect(game.roundResult(weapons.ROCK, weapons.SCISSORS)).to.equal(outcomes.WIN);
    });

    it('Paper should tie Paper', () => {
      expect(game.roundResult(weapons.PAPER, weapons.PAPER)).to.equal(outcomes.TIE);
    });

    it('Paper should lose to Scissors', () => {
      expect(game.roundResult(weapons.PAPER, weapons.SCISSORS)).to.equal(outcomes.LOSE);
    });
  });
});
