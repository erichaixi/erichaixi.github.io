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
                <div className="score-title">Scores</div>
                {this.BlackScoreDisplay()}
                {this.WhiteScoreDisplay()}

                <div className="display-divider"></div>

                <div className="remaining-title">Remaining Pieces</div>
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
    renderSquare(row, col) {
        let isLastPlay = false;
        if ([row, col] == this.props.lastPlay) {
            isLastPlay = true;
        }
        return (
            <Square
                value={this.props.squares[row][col]}
                onClick={() => this.props.onClick(row, col)}
                isLastPlay={isLastPlay}
            />
        );
    }

    render() {
        let rows = [];

        for (let row = 0; row < 8; row++) {
            let row_items = [];
            for (let col = 0; col < 8; col++) {
                row_items.push(<span>{this.renderSquare(row, col)}</span>)
            }
            rows.push(<div className="board-row">{row_items}</div>)
        }
 
        return (
            <div className="game-board">
                {rows}
            </div>                 
        );
        
        
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        let temp_square = [];
        for (let i = 0; i < 8; i++) {
            temp_square.push(Array(8).fill(null));
        }

        this.state = {
            squares: temp_square,
            turn: "B",
            numBlack: 2,
            numWhite: 2,
            numRemaining: 60,
            lastPlay: -1
        };

        this.state.squares[3][3] = "W";
        this.state.squares[3][4] = "B";
        this.state.squares[4][3] = "B";
        this.state.squares[4][4] = "W";
    }

    handleClick(row, col) {
        let isValidMove = false;

        if (this.state.squares[row][col] == null) {
            //let capturedPieces = this.getCapturedPieces(row, col);

            //if (capturedPieces.length > 0) {
            //    this.processCapturedPieces(capturedPieces);
            //    isValidMove = true;
            //}     
            isValidMove = true;
            this.state.squares[row][col] = this.state.turn;
        }

        if (isValidMove) {
            this.alternateTurn();
            this.setState({ lastPlay: [row, col] });
            const numRemaining = this.state.numRemaining - 1;
            this.setState({ numRemaining: numRemaining })
        }
    }

    getCapturedPieces(row, col) {
        //Checks if playing this move would capture any pieces
        //Returns an array containing the square index of all captured pieces,
        //or an empty array if no pieces were captured, which means an invalid move
        let capturedPieces = [];

        capturedPieces.concat(this.getCapturedUp(row, col));


        return capturedPieces;
    }

    getCapturedUp(row, col) {
        //Only a play at the 3rd row or lower(e.g., 4th, 5th) can capture pieces in Up direction
        //if (row < 2) { 
        //    return [];
        //}

        ////First piece in this direction must be the opposite color
        //if (!this.isOppositeColor(this.state.squares[row - 1][col])) {
        //    return [];
        //}

        //let capturedPieces = [[row -1, col]];
        //let currIdx = row;
        //while (currIdx >= 0) {
        //    if (this.isSameColor(currIdx)) {
        //        return capturedPieces;
        //    }
        //    else if (this.isOppositeColor(currIdx)) {
        //        capturedPieces.push(currIdx);
        //    }
        //    else {
        //        return [];
        //    }
        //    currIdx -= 8;
        //}

        return [];
    }

    isOppositeColor(idx) {
        if (this.state.turn == "B") {
            return (this.state.squares[idx] == "W");
        }
        else if (this.state.turn == "W") {
            return (this.state.squares[idx] == "B");
        }
    }

    isSameColor(idx) {
        return (this.state.squares[idx] == this.state.turn);
    }

    processCapturedPieces(capturedPieces) {
        //Changes the color of captured pieces
        //Adjusts the Score counters to reflect this
        const squares = this.state.squares.slice();

        let idxCaptured;
        let newNumBlack = this.state.numBlack;
        let newNumWhite = this.state.numWhite;
        for (idxCaptured in capturedPieces) {
            squares[idxCaptured] = this.state.turn;
            if (this.state.turn == "B") {
                newNumBlack++;
                newNumWhite--;
            }
            else if (this.state.turn == "W") {
                newNumBlack--;
                newNumWhite++;
            }
        }
        
        this.setState({ numBlack: newNumBlack });
        this.setState({ numWhite: newNumWhite });
        this.setState({ squares: squares });
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
                        onClick={(row, col) => this.handleClick(row, col)}
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
