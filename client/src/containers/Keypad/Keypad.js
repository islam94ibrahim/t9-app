import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import styles from './Keypad.module.css';
import Button from '../../components/Button/Button';
import Board from '../../components/Board/Board';

const KEYPAD_BUTTONS = [
  { value: 1, letters: '. , !', disabled: true },
  { value: 2, letters: 'a b c' },
  { value: 3, letters: 'd e f' },
  { value: 4, letters: 'g h i' },
  { value: 5, letters: 'j k l' },
  { value: 6, letters: 'm n o' },
  { value: 7, letters: 'p q r s' },
  { value: 8, letters: 't u v' },
  { value: 9, letters: 'w x y z' },
  { value: '*', disabled: true },
  { value: 0, disabled: true },
  { value: '#', disabled: true },
  { value: '#', disabled: true },
];

const Keypad = () => {
  const [numbers, setNumbers] = useState('');
  const [onlyRealWords, setOnlyRealWords] = useState(false);
  const [words, setWords] = useState([]);

  const requestPrediction = useCallback(() => {
    const body = { numbers, onlyRealWords };

    axios
      .post('/predict', body)
      .then(({ data }) => {
        setWords(data.words.join(', '));
      })
      .catch((error) => {
        setWords(error.message);
      });
  }, [numbers, onlyRealWords]);

  useEffect(() => {
    if (numbers !== '') requestPrediction();
  }, [numbers, requestPrediction]);

  const buttonHandler = (buttonValue) => {
    setNumbers(numbers + buttonValue);
  };

  const deleteButtonHandler = () => {
    setNumbers(numbers.slice(0, -1));
  };

  return (
    <div className={styles.Keypad}>
      <h1>T9 application</h1>
      <table>
        <tbody>
          <tr>
            <td colSpan="3">
              <input type="text" value={numbers} readOnly />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <Button
                value="R"
                letters="Real words"
                active={onlyRealWords}
                clicked={() => setOnlyRealWords(!onlyRealWords)}
              />
            </td>
            <td>
              <Button
                value="X"
                letters="DELETE"
                clicked={deleteButtonHandler}
              />
            </td>
          </tr>
          <tr>
            {KEYPAD_BUTTONS.slice(0, 3).map((button, index) => (
              <td key={index}>
                <Button {...button} clicked={buttonHandler} />
              </td>
            ))}
          </tr>
          <tr>
            {KEYPAD_BUTTONS.slice(3, 6).map((button, index) => (
              <td key={index}>
                <Button {...button} clicked={buttonHandler} />
              </td>
            ))}
          </tr>
          <tr>
            {KEYPAD_BUTTONS.slice(6, 9).map((button, index) => (
              <td key={index}>
                <Button {...button} clicked={buttonHandler} />
              </td>
            ))}
          </tr>
          <tr>
            {KEYPAD_BUTTONS.slice(9, 12).map((button, index) => (
              <td key={index}>
                <Button {...button} clicked={buttonHandler} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <Board>{words}</Board>
    </div>
  );
};

export default Keypad;
