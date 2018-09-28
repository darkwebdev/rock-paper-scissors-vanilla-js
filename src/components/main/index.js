import { events } from '../../const.js';
import Weapons from '../weapons/index.js';

export default function ({ state, weapons, game }) {
  return `
    <h1>Rock vs Paper vs Scissors</h1>
    
    Game version: ${game.version}
    
    <h3>You: ${state.score[0]} vs Computer: ${state.score[1]}</h3>
  
    <div id="weapons">${Weapons({ state, weapons })}</div>
  
    <button id="reset-game" onclick="emit('${events.RESET_GAME}')">Restart game</button>
  `;
}
