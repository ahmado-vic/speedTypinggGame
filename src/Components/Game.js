import React, { useState, useEffect, useRef } from 'react';

const Game = () => {
  const STARTIG_TIME = 5;
  const [text, setText] = useState('');
  const [words, setWords] = useState([]);
  const [wordCount, setWordCount] = useState(0);
  const [start, setStart] = useState(false);
  const [startingTime, setStartingTime] = useState(STARTIG_TIME);
  const inputRef = useRef();

  //Handle Writing Text.
  const handleChange = e => {
    const { value } = e.target;
    setText(value);
  };

  //Start Game
  const startGame = () => {
    setText('');
    setWordCount(0);
    setStart(true);
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  //Starting Timer
  const startingTimer = () => {
    setTimeout(() => {
      setStartingTime(prev => prev - 1);
    }, 1000);
  };

  //Return written text into array
  const splitText = () => {
    setWords(text.trim().split(' '));
  };

  //Count how many words have been written.
  const countWord = () => {
    setWordCount(words.length);
  };

  //End Game
  const endGame = () => {
    setStart(false);
    setStartingTime(STARTIG_TIME);
  };

  useEffect(() => {
    if (start) {
      splitText();
      countWord();
    }
  }, [text, start]);

  useEffect(() => {
    if (start && startingTime > 0) {
      startingTimer();
    } else if (startingTime === 0) {
      endGame();
    }
  }, [start, startingTime]);

  return (
    <>
      <h1>How Fast Do You Type?!</h1>
      <textarea
        ref={inputRef}
        name="gameTextArea"
        value={text}
        onChange={handleChange}
        disabled={!start}
      />
      <h1>Time Remaining:{startingTime}</h1>
      <button onClick={startGame} disabled={start}>
        Start
      </button>
      {!start && <h1>Word Count:{text.trim() === '' ? 0 : wordCount}</h1>}
    </>
  );
};

export default Game;
