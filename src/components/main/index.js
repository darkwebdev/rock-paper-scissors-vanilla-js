import { events, weaponIds, steps } from '../../const.js';
import Weapon from '../weapon/index.js';

export default function ({ state }) {
  const outcomeMessages = {
    win: 'You win!',
    lose: 'You lose!',
    tie: 'Stalemate!'
  };

  const headings = {
    'choose-weapon': 'Choose your weapon',
    'round-end': outcomeMessages[state.outcome]
  };

  const player1weapons = Weapon({ state, weaponId: weaponIds.WEAPON1, clickable: true });
  const player2weapons = Weapon({ state, weaponId: weaponIds.WEAPON2, clickable: false });
  
  return `
    <div class="control-panel">
      <div class="score">
        <h3>You: ${state.score[0]} vs Computer: ${state.score[1]}</h3>
      </div>
      
      <button
        class="next-round"
        ${state.step !== steps.ROUND_END ? 'hidden' : ''}
        onclick="emit('${events.NEXT_ROUND}')"
      >Again!</button>
        
      <button
        class="reset-game"
        ${state.score[0] === 0 && state.score[1] === 0 ? 'hidden' : ''}
        onclick="emit('${events.RESET_GAME}')"
      >Restart game</button>
    </div>
    
    <div class="players ${state.step}">
      <div class="player player1">
        <div class="avatar">
          <img src="src/images/BoyPlayer.png" />
        </div>
        <h2>${headings[state.step]}</h2>
  
        <div class="weapons">${player1weapons}</div>
      </div>
  
      <div class="player player2">
        <div class="avatar">
          <img src="src/images/ComputerPlayer.png" />
        </div>
        <h2>&nbsp;</h2>
        <div class="weapons">${player2weapons}</div>
      </div>
    </div>
  `;
}
