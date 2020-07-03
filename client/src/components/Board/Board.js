import React from 'react';

import styles from './Board.module.css';

const Board = (props) => {
  return (
    <div className={styles.Board}>
      <h2>Words</h2>
      <div>{props.children}</div>
    </div>
  );
};

export default Board;
