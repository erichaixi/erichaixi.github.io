import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { isUndefined } from 'util';

function Square(props) {
    if (props.value == "B") {
        return (
            <button className="black-square square" onClick={props.onClick}>
            </button>
        );
    }
    else if (props.value == "W") {
        return (
            <button className="white-square square" onClick={props.onClick}>
            </button>
        );
    }
    else {
        return (
            <button className="square" onClick={props.onClick}>
                 {props.value}
            </button>
        );
    }
}


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(81).fill(null),
            turn: "B",
            numBlack: 2,
            numWhite: 2,
            numRemaining: 60
        };
        this.state.squares[27] = "W";
        this.state.squares[28] = "B";
        this.state.squares[35] = "B";
        this.state.squares[36] = "W";
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
        /*
         For each direction (up, down, left, right, upleft, upright, downleft, downright),
         see if any pieces will be captured.

        If pieces are captured, process those captures.

        If no pieces would be captured, change nothing and don't render as this is invalid move.
        */
        let isValidMove = false;
        if (this.state.squares[i] == null) {
            const squares = this.state.squares.slice();
            squares[i] = this.state.turn;

            if (this.state.turn == "B") {
                const numBlack = this.state.numBlack + 1;
                this.setState({ numBlack: numBlack })
            }
            else {
                const numWhite = this.state.numWhite + 1;
                this.setState({ numWhite: numWhite })
            }

            const numRemaining = this.state.numRemaining - 1;
            this.setState({ numRemaining: numRemaining })

            this.setState({ squares: squares });

            isValidMove = true;
        }

        if (isValidMove) {
            this.alternateTurn();
        }
    }

    alternateTurn() {
        //if (this.state.turn[0] == "W") {
        //    return;
        //}
        if (this.state.turn == "W") {
            this.state.turn = "B";
        }
        else {
            this.state.turn = "W";
        }
    }

    render() {
        let rows = [];

        for (let i = 0; i < 8; i++) {
            let row_items = [];
            for (let j = 0; j < 8; j++) {
                row_items.push(<span>{this.renderSquare(i * 8 + j)}</span>)
            }
            rows.push(<div className="board-row">{row_items}</div>)
        }

        if (this.state.turn == "B") {
            return (
                <div>
                    <div className="game">
                        <div className="game-board">
                            <div className="game-board">
                                {rows}
                            </div>
                        </div>
                        <div className="game-info">
                            <div>
                                <div class="score-title">Scores</div>
                                <div className="score-display-highlighted">
                                    <div className="black-piece-display"></div>
                                    <div className="black-counter">{this.state.numBlack}</div>
                                </div>
                                <div className="score-display">
                                    <div className="white-piece-display"></div>
                                    <div className="white-counter">{this.state.numWhite}</div>
                                </div>
                                <div class="remaining-title">Remaining Pieces</div>
                                <div className="remaining-display">
                                    <div className="remaining-black-piece"></div>
                                    <div className="remaining-white-piece"></div>
                                    <div className="remaining-counter">{this.state.numRemaining}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            );
        }
        else if (this.state.turn == "W") {
            return (
                <div>
                    <div className="game">
                        <div className="game-board">
                            <div className="game-board">
                                {rows}
                            </div>
                        </div>
                        <div className="game-info">
                            <div>
                                <div class="score-title">Scores</div>
                                <div className="score-display">
                                    <div className="black-piece-display"></div>
                                    <div className="black-counter">{this.state.numBlack}</div>
                                </div>
                                <div className="score-display-highlighted">
                                    <div className="white-piece-display"></div>
                                    <div className="white-counter">{this.state.numWhite}</div>
                                </div>
                                <div class="remaining-title">Remaining Pieces</div>
                                <div className="remaining-display">
                                    <div className="remaining-black-piece"></div>
                                    <div className="remaining-white-piece"></div>
                                    <div className="remaining-counter">{this.state.numRemaining}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            );
        }
    }
}

class Game extends React.Component {
    render() {
        return (
            <div>
                <h1 className="Title">
                    Reversi
                </h1>
   
                <Board />

            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
