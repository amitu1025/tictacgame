import React, { useState } from "react";
import "./Game.css";

const Game = () => {
  // To create an array of an indexes of 9 each
  const [board, setBoard] = useState(Array(9).fill(null));
  // State to store value of X in every next move
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    // If winner is already there then it should not let player to play
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    // Everytime user clicks, it checks for the winner
    setWinner(calculateWinner(newBoard));
  };

  // To reset game and restart again
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  // TO create a square boxes for the X or O
  const createSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  // Check for the winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      // Here it checks for each row with same value with all possibility
      const [value1, value2, value3] = lines[i];
      if (
        squares[value1] &&
        squares[value1] === squares[value2] &&
        squares[value1] === squares[value3]
      ) {
        return squares[value1];
      }
    }
    return null;
  };

  const status = winner
    ? `Winner: ${winner}`
    : `Current player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="main-container">
      <div className="container">
        <header className="App-header">
          <h1>Game</h1>
        </header>
        <div className="status">{status}</div>
        <div className="board-row">
          {createSquare(0)}
          {createSquare(1)}
          {createSquare(2)}
        </div>
        <div className="board-row">
          {createSquare(3)}
          {createSquare(4)}
          {createSquare(5)}
        </div>
        <div className="board-row">
          {createSquare(6)}
          {createSquare(7)}
          {createSquare(8)}
        </div>
        <button className="btnreset" onClick={resetGame}>
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default Game;
