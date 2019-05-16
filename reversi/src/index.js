import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { isLabeledStatement } from '@babel/types';
//import { isUndefined } from 'util';

function Square(props) {
    if (props.value == "B") {
        if (props.isLastPlay) {
            return (
                <button className="black-square square-highlighted" onClick={props.onClick}>
                </button>
            );
        }
        else {
            return (
                <button className="black-square square" onClick={props.onClick}>
                </button>
            );
        }
        
    }
    else if (props.value == "W") {
        if (props.isLastPlay) {
            return (
                <button className="white-square square-highlighted" onClick={props.onClick}>
                </button>
            );
        }
        else {
            return (
                <button className="white-square square" onClick={props.onClick}>
                </button>
            );
        }
    }
    else {
        return (
            <button className="square" onClick={props.onClick}>
                 {props.value}
            </button>
        );
    }
}

class ScoreDisplay extends React.Component {
    BlackScoreDisplay() {
        if (this.props.turn == "B") {
            return (
                <div className="score-display-highlighted">
                    <div className="black-piece-display"></div>
                    <div className="black-counter">{this.props.numBlack}</div>
                </div>
            );
        }
        else if (this.props.turn == "W") {
            return (
                <div className="score-display">
                    <div className="black-piece-display"></div>
                    <div className="black-counter">{this.props.numBlack}</div>
                </div>
            );
        }
        
    }

    WhiteScoreDisplay() {
        if (this.props.turn == "W") {
            return (
                <div className="score-display-highlighted">
                    <div className="white-piece-display"></div>
                    <div className="white-counter">{this.props.numWhite}</div>
                </div>
            );
        }
        else if (this.props.turn == "B") {
            return (
                <div className="score-display">
                    <div className="white-piece-display"></div>
                    <div className="white-counter">{this.props.numWhite}</div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="game-info">
                <div class="score-title">Scores</div>
                {this.BlackScoreDisplay()}
                {this.WhiteScoreDisplay()}
                <div class="display-divider"></div>
                <div class="remaining-title">Remaining Pieces</div>
                <div className="remaining-display">
                    <div className="remaining-black-piece"></div>
                    <div className="remaining-white-piece"></div>
                    <div className="remaining-counter">{this.props.numRemaining}</div>
                </div>
            </div>
        );
    }
}

class Board extends React.Component {
    renderSquare(idx) {
        let isLastPlay = false;
        if (idx == this.props.lastPlay) {
            isLastPlay = true;
        }
        return (
            <Square
                value={this.props.squares[idx]}
                onClick={() => this.props.onClick(idx)}
                isLastPlay={isLastPlay}
            />
        );
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

 
        return (
            <div>
                <div className="game">
      
                    <div className="game-board">
                        {rows}
                    </div>
              
                        
                </div>

            </div>
        );
        
        
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(64).fill(null),
            turn: "B",
            numBlack: 2,
            numWhite: 2,
            numRemaining: 60,
            lastPlay: -1
        };

        this.state.squares[27] = "W";
        this.state.squares[28] = "B";
        this.state.squares[35] = "B";
        this.state.squares[36] = "W";
    }

    handleClick(idx) {
        let isValidMove = false;
        if (this.state.squares[idx] == null) {
            const squares = this.state.squares.slice();
            squares[idx] = this.state.turn;

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
            this.setState({ lastPlay: idx });
        }
    }

    alternateTurn() {
        if (this.state.turn == "W") {
            this.state.turn = "B";
        }
        else if (this.state.turn == "B") {
            this.state.turn = "W";
        }
    }

    render() {
        return (
            <div>
                <h1 className="Title">Reversi</h1>
                <div className="game">
                    <Board
                        squares={this.state.squares}
                        lastPlay={this.state.lastPlay}
                        onClick={idx => this.handleClick(idx)}
                    />
                    <ScoreDisplay
                        turn={this.state.turn}
                        numBlack={this.state.numBlack}
                        numWhite={this.state.numWhite}
                        numRemaining={this.state.numRemaining}
                    />
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
