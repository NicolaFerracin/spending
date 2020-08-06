import React from 'react';
import Menu from '../Menu';
import styles from './styles.module.scss';

export default props => (
  <div className={styles.layout}>
    <Menu />
    {props.children}
  </div>
);
