import React, { useEffect, useState } from "react";
import { fiveLetterWords } from "./store";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import "./App.css";

function App() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setVisible(true);
  }, []);

  const numberWords = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
    "twenty",
    "twenty-one",
    "twenty-two",
    "twenty-three",
    "twenty-four",
    "twenty-five",
    "twenty-six",
    "twenty-seven",
    "twenty-eight",
    "twenty-nine",
    "thirty",
  ];
  const [showModal, setShowModal] = useState(false);
  const [gameResult, setGameResult] = useState("");
  const [winningGuess, setWinningGuess] = useState("");

  const [randomWord] = useState(
    () => fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)]
  );

  console.log(randomWord);

  const [value, setValue] = React.useState("");

  const [grid, setGrid] = useState(
    Array(6)
      .fill(null)
      .map(() => Array(5).fill({ letter: "", status: "" }))
  );
  const [rowIndex, setRowIndex] = useState(0);

  const rows = [];
  for (let i = 0; i < 6; i++) {
    const cols = [];
    for (let j = 0; j < 5; j++) {
      const { letter, status } = grid[i][j];
      cols.push(
        <div className={`box ${status}`} key={i * 5 + j}>
          {letter}
        </div>
      );
    }
    rows.push(
      <div className="row" key={i}>
        {cols}
      </div>
    );
  }

  const fill = (e) => {
    if (value.length === 5 && rowIndex < 6) {
      const guess = value.toUpperCase();
      const newGrid = [...grid];
      const row = [];
      const randomWordArr = randomWord.toUpperCase().split("");
      const guessArr = guess.split("");
      const status = Array(5).fill("absent");
      const used = Array(5).fill(false);
      for (let i = 0; i < 5; i++) {
        if (guessArr[i] === randomWordArr[i]) {
          status[i] = "correct";
          used[i] = true;
        }
      }
      for (let i = 0; i < 5; i++) {
        if (status[i] === "correct") continue;
        for (let j = 0; j < 5; j++) {
          if (!used[j] && guessArr[i] === randomWordArr[j]) {
            status[i] = "present";
            used[j] = true;
            break;
          }
        }
      }
      for (let i = 0; i < 5; i++) {
        row.push({ letter: guessArr[i], status: status[i] });
      }
      newGrid[rowIndex] = row;
      setGrid(newGrid);
      setRowIndex(rowIndex + 1);
      setValue("");

      if (randomWord.toUpperCase() === guess) {
        setTimeout(() => {
          setGameResult("win");
          setShowModal(true);
          setWinningGuess(guess);
        }, 500);
      } else if (rowIndex >= 5) {
        setTimeout(() => {
          setGameResult("lose");
          setShowModal(true);
        }, 500);
      }
    } else {
      alert("Please enter exactly 5 letters");
    }
  };

  return (
    <>
      <div
        className={`app-container ${visible ? "visible" : ""} ${
          showModal ? "blurred" : ""
        }`}
      >
        <form
          className="game"
          onSubmit={(event) => {
            event.preventDefault();
            fill(event);
          }}
        >
          <h1 className="outro">Word Game</h1>
          {rows}
          <input
            type="text"
            name="guess-the-word"
            id="guess"
            maxLength="5"
            minLength="5"
            autoComplete="off"
            pattern="[A-Za-z]{5}"
            onChange={(event) => {
              const input = event.target.value;
              const onlyLetters = input.replace(/[^a-zA-Z]/g, "");
              setValue(onlyLetters);
            }}
            value={value}
          />
        </form>
      </div>

      {showModal && (
        <Popup
          randomWord={randomWord}
          guess={winningGuess}
          rowIndex={rowIndex}
          gameResult={gameResult}
        />
      )}
    </>
  );
}

export default App;
