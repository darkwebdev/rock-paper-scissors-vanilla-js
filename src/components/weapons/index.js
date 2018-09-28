import { events } from '../../const.js';

export default function ({ state, weapons }) {
  const outcomeMessages = {
    win: 'You win!',
    lose: 'You lose!',
    tie: 'Stalemate!'
  };

  const headings = {
    'choose-weapon': 'Choose your weapon',
    'round-end': outcomeMessages[state.outcome]
  };

  const weaponItem = (name, weapon, clickable) => {
    const clickHanlder = `onclick="emit('${events.WEAPON_SELECTED}', '${weapons[name]}')"`;

    return `
      <li class="${weapons[name] === state[weapon] ? 'active' : ''}">
        <button
          id="weapon-${name}"
          ${state.step === 'round-end' ? 'disabled' : ''}
          ${clickable ? clickHanlder : ''}>${name}</button>
      </li>
    `;
  };

  return `
    <h2>${headings[state.step]}</h2>
  
    <button
      id="next-round"
      ${state.step !== 'round-end' ? 'hidden' : ''}
      onclick="emit('${events.NEXT_ROUND}')">Again!</button>
  
    <ul>
      ${Object.keys(weapons).map(name => weaponItem(name, 'weapon1', true)).join('')}
    </ul>
  
    <h3>Computer</h3>
  
    <ul>
      ${Object.keys(weapons).map(name => weaponItem(name, 'weapon2', false)).join('')}
    </ul>
  `;
}
