import React from 'react';

import styles from './Button.module.css';

const Button = (props) => {
  const classes = [styles.Button];

  if (props.active) {
    classes.push(styles.Active);
  }

  return (
    <button
      className={classes.join(' ')}
      disabled={props.disabled}
      onClick={() => props.clicked(props.value)}
    >
      {props.value}
      <span>{props.letters}</span>
    </button>
  );
};

export default Button;
