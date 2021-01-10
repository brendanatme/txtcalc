import { useState } from 'preact/hooks';
import common from '../../styles/common.css';
import styles from './index.css';

export default function Popup({
  children,
  pos = 'topRight',
  title,
}) {
  const [isShowing, setIsShowing] = useState(false);

  const show = () => setIsShowing(true);
  const hide = () => setIsShowing(false);

  return (
    <div>
      <a class={`${styles.toggle} ${styles[pos]}`} onClick={show} href="#">{title}</a>

      <div class={`${styles.overlay} ${isShowing ? styles.show : ''}`}>
        <button class={styles.x} onClick={hide}>x</button>
        <div class={`${common.p30} ${styles.scroll}`}>
          <div class={common.center}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
