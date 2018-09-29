import { events, weapons, weaponIds } from '../../const.js';
import { invertedOutcome } from '../../game.js';

export default function ({ state, weaponId, clickable }) {
  const tag = clickable ? 'button' : 'span';
  
  const weaponOutcome = {
    [weaponIds.WEAPON1]: state.outcome,
    [weaponIds.WEAPON2]: invertedOutcome(state.outcome)
  }[weaponId];

  const item = name => {
    const clickHanlder = `onclick="emit('${events.WEAPON_SELECTED}', '${name}')"`;
    const outcomeClass = `${name === state[weaponId] ? weaponOutcome : ''}`

    return `
      <li>
        <${tag}
          class="weapon weapon-${name} ${outcomeClass}"
          ${state.step === 'round-end' ? 'disabled' : ''}
          ${clickable ? clickHanlder : ''}></${tag}>
      </li>
    `;
  };

  return `
    <ul>
      ${Object.values(weapons).map(item).join('')}
    </ul>
  `;
}
