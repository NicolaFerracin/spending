import React from 'react';
import Menu from '../Menu';
import styles from './styles.module.scss';

export default function Layout(props) {
  return (
    <div className={styles.layout}>
      <Menu />
      <div className={styles.content}>
        <div className={styles.box}>{props.children}</div>
      </div>
    </div>
  );
}
