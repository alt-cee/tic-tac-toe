import { useState } from "react";
// In React, a component is a piece of reusable code that represents a part of a user interface.
// JSX element with prop className="square"

function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    setValue('X')
  }
  return <button className="square" onClick={handleClick}>{value}</button>;  // escape into js
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
