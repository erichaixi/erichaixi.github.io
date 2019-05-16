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
            squares: Array(81).fill(null),
            turn: "O"
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
        let status = "";
        if (this.state.turn[0] == "W") {
            status = this.state.turn;
        }
        else {
            status = 'Next player: ' + this.state.turn;
        }


        
        let rows = [];

        for (let i = 0; i < 9; i++) {
            let row_items = [];
            for (let j = 0; j < 9; j++) {
                row_items.push(<span>{this.renderSquare(i * 9 + j)}</span>)
            }
            rows.push(<div className="board-row">{row_items}</div>)
        }

        return (
            <div>
                
                <div className="game-board">
                    {rows}
                </div>
                
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div>
                <h1 className="Title">
                    Reversi
                </h1>
                <div className="game">   
                    
                    <div className="game-board">
                        <Board />
                    </div>
                    <div className="game-info">
                        <div>
                            Info
                        </div>
                    </div>
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
