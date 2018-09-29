const { expect } = require('chai');
import { roundResult } from '../src/game';
import { weapons, outcomes } from '../src/const';

describe('Game', () => {
  describe('Win/lose logic', () => {
    it('Rock should beat Scissors', () => {
      expect(roundResult(weapons.ROCK, weapons.SCISSORS)).to.equal(outcomes.WIN);
    });

    it('Paper should tie Paper', () => {
      expect(roundResult(weapons.PAPER, weapons.PAPER)).to.equal(outcomes.TIE);
    });

    it('Paper should lose to Scissors', () => {
      expect(roundResult(weapons.PAPER, weapons.SCISSORS)).to.equal(outcomes.LOSE);
    });
  });
});
