// In React, a component is a piece of reusable code that represents a part of a user interface.
// JSX element with prop className="square"

function Square({ value }) {
  return <button className="square">{value}</button>;  // escape into js
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
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
