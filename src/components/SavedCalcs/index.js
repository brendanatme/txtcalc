import * as calcs from '~/store/calcs.js';
import styles from './index.css';

export default function SavedCalcs() {
  const items = calcs.select.items();
  const sid = calcs.select.selectedId();

  const makeSelectCbFor = (id) => (e) => {
    e.preventDefault();
    calcs.trigger.selectCalc(id);
  };

  const makeDeleteCbFor = (id) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    calcs.trigger.deleteCalc(id);
  };

  return (
    <div>
      <h2 class="mb20">Saved Calcs</h2>

      <div>
        {items.map((calc) => (
          <button
            class={`${styles.calc} p3040 bggray ${sid === calc.id ? styles.selected : ''}`}
            onClick={makeSelectCbFor(calc.id)}
          >
            {calc.name}
            <span className={styles.del} onClick={makeDeleteCbFor(calc.id)}>x</span>
          </button>
        ))}
      </div>
    </div>
  );
}
