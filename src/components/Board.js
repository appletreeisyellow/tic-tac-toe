import React from "react";
import Square from "./Square";
import "../index.css";

class Board extends React.Component {
  renderSquare(i) {
    return <Square
      key={i}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }

  generateRow(rowNum, rowNumMax) {
    let row = [];

    for (let i = rowNum; i < rowNumMax; i++) {
      row.push(this.renderSquare(i));
    }
    return row;
  }

  generateBoard(columns, rows) {
    let board = [];

    for (let i = 0; i < columns * rows; i++) {
      // generate row at the beginning of each row
      if (i % columns === 0) {
        board.push(
          <div className="board-row" key={i}>
            {this.generateRow(i, i + columns)}
          </div>
        )
      }
    }
    return board;
  }

  render() {
    return (
      <div>
        {this.generateBoard(3, 3)}
      </div>
    );
  }
}

export default Board;