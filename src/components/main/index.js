import { events, weaponIds } from '../../const.js';
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
    <header>
      <h1>Rock, Paper, Scissors</h1>
    </header>
    
    <div class="score">
      <h3>You: ${state.score[0]} vs Computer: ${state.score[1]}</h3>
    </div>
    
    <button
      id="next-round"
      ${state.step !== 'round-end' ? 'hidden' : ''}
      onclick="emit('${events.NEXT_ROUND}')">Again!</button>
      
    <div class="player1">
      <img src="src/images/BoyPlayer.png" />
      <h2>${headings[state.step]}</h2>

      <div class="weapons">${player1weapons}</div>
    </div>

    <div class="player2">
      <img src="src/images/ComputerPlayer.png" />
      <div class="weapons">${player2weapons}</div>
    </div>
  
    <button id="reset-game" onclick="emit('${events.RESET_GAME}')">Restart game</button>
  `;
}
