import { useEffect, useRef, useState } from 'preact/hooks';
import { evaluate } from 'mathjs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as calcs from '~/store/calcs.js';
import Disclaimer from '~/components/Disclaimer';
import Help from '~/components/Help';
import SavedCalcs from '~/components/SavedCalcs';
import styles from './index.css';

/**
 * parseExp
 * 
 * solve an expression
 * using mathjs lib
 */
const parseExp = (exp) => {
  let result = '';

  if (!exp) {
    return result;
  }

  try {
    result = evaluate(exp);
  } catch(e) {
    result = '...';
  }

  return `${result}`;
};

export default function App() {
  const inputs = [useRef(), useRef(), useRef(), useRef()];
  
  const selected = calcs.select.selected();

  const [exp0, setExp0] = useState();
  const [exp1, setExp1] = useState();
  const [exp2, setExp2] = useState();
  const [exp3, setExp3] = useState();
  const [res0, setRes0] = useState();
  const [res1, setRes1] = useState();
  const [res2, setRes2] = useState();
  const [res3, setRes3] = useState();
  
  useEffect(() => setExp0(selected.exp0), [selected.exp0]);
  useEffect(() => setExp1(selected.exp1), [selected.exp1]);
  useEffect(() => setExp2(selected.exp2), [selected.exp2]);
  useEffect(() => setExp3(selected.exp3), [selected.exp3]);

  useEffect(() => setRes0(parseExp(exp0)), [exp0]);
  useEffect(() => setRes1(parseExp(exp1)), [exp1]);
  useEffect(() => setRes2(parseExp(exp2)), [exp2]);
  useEffect(() => setRes3(parseExp(exp3)), [exp3]);

  /**
   * checkForLineChange
   * 
   * when user presses keys, check
   * if they're trying to navigate up or down
   * we need to do this because we're just using text inputs
   * but making it look like a textarea
   * to avoid the gargantuan task of text-editor capabilities
   */
  const checkForLineChange = (i) => (e) => {
    /**
     * "enter" or "down": move down
     */
    if (e.keyCode === 13 || e.keyCode === 40) {
      const target = i + 1;
      if (target < inputs.length) {
        e.preventDefault();
        return inputs[target].current.focus();
      }
    }

    /**
     * "backspace" or "up": move up
     */
    if (e.keyCode === 38 || (e.keyCode === 8 && !e.target.value)) {
      const target = i - 1;
      if (target >= 0) {
        e.preventDefault();
        return inputs[target].current.focus();
      }
    }
  };

  /**
   * saveCalc
   * 
   * user has clicked save button
   * save the current state as a new calc
   */
  const saveCalc = (e) => {
    e.preventDefault();

    const name = prompt('enter Calc name');

    if (!name) {
      return;
    }

    const createdAt = +new Date();

    calcs.trigger.addCalc({ id: `${createdAt}`, createdAt, name, exp0, exp1, exp2, exp3 });
  };

  return (
    <div class="p30">
      <h1 class={`${styles.heading} mb20`}><img class={styles.logo} src="/assets/logo.svg" /></h1>

      <Help />
      <Disclaimer />
      
      <div class={`${styles.container} mb20`}>
        <main class={`${styles.inputs} p20 bggray`}>
            <input
              class={styles.input}
              onInput={(e) => setExp0(e.target.value)}
              onKeydown={checkForLineChange(0)}
              ref={inputs[0]}
              type="text"
              value={exp0}
            />
            <input
              class={`${styles.input} hideXsDown`}
              onInput={(e) => setExp1(e.target.value)}
              onKeydown={checkForLineChange(1)}
              ref={inputs[1]}
              type="text"
              value={exp1}
            />
            <input
              class={`${styles.input} hideXsDown`}
              onInput={(e) => setExp2(e.target.value)}
              onKeydown={checkForLineChange(2)}
              ref={inputs[2]}
              type="text"
              value={exp2}
            />
            <input
              class={`${styles.input} hideXsDown`}
              onInput={(e) => setExp3(e.target.value)}
              onKeydown={checkForLineChange(3)}
          
              ref={inputs[3]}
              type="text"
              value={exp3}
            />
        </main>
        <aside class={`${styles.results} p20`}>
          <CopyToClipboard text={res0} onCopy={() => alert(`${res0} copied to clipboard!`)}>
            <div class={`${styles.result}`}>{res0}</div>
          </CopyToClipboard>
          <CopyToClipboard text={res1} onCopy={() => alert(`${res1} copied to clipboard!`)}>
            <div class={`${styles.result} hideXsDown`}>{res1}</div>
          </CopyToClipboard>
          <CopyToClipboard text={res2} onCopy={() => alert(`${res2} copied to clipboard!`)}>
            <div class={`${styles.result} hideXsDown`}>{res2}</div>
          </CopyToClipboard>
          <CopyToClipboard text={res3} onCopy={() => alert(`${res3} copied to clipboard!`)}>
            <div class={`${styles.result} hideXsDown`}>{res3}</div>
          </CopyToClipboard>
        </aside>
      </div>

      <div class="mb40">
        <button class={styles.saveBtn} onClick={saveCalc}>Save Calc</button>
      </div>

      <SavedCalcs />
    </div>
  );
}
