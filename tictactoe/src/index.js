import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { isUndefined } from 'util';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            turn: "O",
            history: Array()
        };
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    handleClick(i) {
        if (this.state.squares[i] == null && this.state.turn[0] != "W") {
            const squares = this.state.squares.slice();
            squares[i] = this.state.turn;
            
            this.setState({ squares: squares });
        }
    }

    checkWinner() {
        // Check horizontal
        for (let col = 0; col < 3; col++) {
            if (this.state.squares[3 * col] != null &&
                this.state.squares[3 * col] == this.state.squares[3 * col + 1] &&
                this.state.squares[3 * col + 1] == this.state.squares[3 * col + 2]) {
                this.state.turn = "Winner is " + this.state.squares[3 * col];
                return;
            }
        }
        // Check vertical
        for (let row = 0; row < 3; row++) {
            if (this.state.squares[row] != null &&
                this.state.squares[row] == this.state.squares[row + 3] &&
                this.state.squares[row + 3] == this.state.squares[row + 6]) {
                this.state.turn = "Winner is " + this.state.squares[row];
                return;
            }
        }
        // Check diagonal
        if (this.state.squares[0] != null &&
            this.state.squares[0] == this.state.squares[4] &&
            this.state.squares[4] == this.state.squares[8]) {
            this.state.turn = "Winner is " + this.state.squares[0];
            return;
        }
        if (this.state.squares[2] != null &&
            this.state.squares[2] == this.state.squares[4] &&
            this.state.squares[4] == this.state.squares[6]) {
            this.state.turn = "Winner is " + this.state.squares[2];
            return;
        }
    }

    alternateTurn() {
        if (this.state.turn[0] == "W") {
            return;
        }
        else if (this.state.turn == "X") {
            this.state.turn = "O";
        }
        else {
            this.state.turn = "X";
        }
    }

    render() {
        this.alternateTurn();
        this.checkWinner();
        let status = "";
        if (this.state.turn[0] == "W") {
            status = this.state.turn;
        }
        else {
            status = 'Next player: ' + this.state.turn;
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
