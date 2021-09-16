import React from "react";
import Board from "./Board";
import "../index.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialize();
  }

  initialize() {
    return {
      history: [{
        squares: Array(9).fill(null),
        locationIdx: null, // the index of the square
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  gameEnd(squares, i) {
    if (this.calculateWinner(squares) ||
      squares[i] ||
      this.state.history.length === 11) {
      return true;
    }
    return false;
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.gameEnd(squares, i)) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares,
        locationIdx: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    let result = {
      status: "",
      win: {},
    }
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        result = {
          status: "win",
          win: {
            player: squares[a],
            squares: [a, b, c],
          },
        }
        return result;
      }
    }
    let tmpSq = squares.filter(cell => cell === null)
    if (tmpSq.length === 0) {
      result = {
        status: "draw",
        win: {},
      }
      return result;
    }
    return null
  }

  reset() {
    this.setState(this.initialize());
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const result = this.calculateWinner(current.squares);
    const gameStatus = result && result.status ? result.status : null;
    const moves = history.map((step, move) => {
      const row = Math.floor(step.locationIdx / 3) + 1;
      const col = step.locationIdx % 3 + 1;
      const desc = move ?
        `Go to move # ${move} (${col}, ${row})` :
        `Go to game start`
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status;
    if (gameStatus === 'win') {
      status = `Winner ${result.win.player}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }
    return (
      <div className="game">
        {
          gameStatus === "draw" ? (
            <div className="draw">
              <h2>Draw!</h2>
              <button onClick={() => this.reset()}>
                Play again!
              </button>
            </div>
          ) : (
            <div className="game-board">
              <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
              />
            </div>
          ) 
        }
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

export default Game;