import { useState } from "react";
// In React, a component is a piece of reusable code that represents a part of a user interface.
// JSX element with prop className="square"

function Square({value, onSquareClick}) {
  return (
  <button className="square" onClick={onSquareClick}>
    {value}
  </button>
  );  // escape into js
}

// When do these arguments need to be escaped/not (?)
function Board({ xIsNext, squares, onPlay }) {
  //const [squares, setSquares] = useState(Array(9).fill(null));
  //const [xIsNext, setxIsNext] = useState(true);

  // In React, it’s conventional to use onSomething names for props which 
  // represent events and handleSomething for the function definitions which
  // handle those events.
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      // Do nothing if square is already filled, or somebody wins.
      return;
    }

    const nextSquares = squares.slice();
    // Make a copy of the squares and fill in the clicked square.
    if (xIsNext) {
      nextSquares[i] = "X";
    }
    else {
      nextSquares[i] = "O";
    }

    // Pass the square state up to handlePlay in Game (?)
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  }
  else {
    status = "Next player: " + (xIsNext ? "X":"O")
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}

export default function Game() {
  const [xIsNext, setxIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1)  // This was missing!
    //setHistory([...history, nextSquares]);
    setxIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    // Render components based on state at a previous point in the game
    setCurrentMove(nextMove);
    setxIsNext(nextMove % 2 == 0); // x moves on 0, 2, 4, ...
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    }
    else {
      description = 'Go to start'
    }
    // Keys tell React about the identity of each component, which allows React 
    // to maintain state between re-renders. If a component’s key changes, the 
    // component will be destroyed and re-created with a new state.
    // Keys do not need to be globally unique; they only need to be unique
    // between components and their siblings.
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}