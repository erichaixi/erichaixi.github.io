import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    if (props.value === "B") {
        if (props.isLastPlay) {
            return (
                <span>
                    <button className="black-square square-highlighted" onClick={props.onClick}>
                    </button>
                </span>
            );
        }
        else {
            return (
                <span>
                    <button className="black-square square" onClick={props.onClick}>
                    </button>
                </span>
            );
        }
        
    }
    else if (props.value === "W") {
        if (props.isLastPlay) {
            return (
                <span>
                    <button className="white-square square-highlighted" onClick={props.onClick}>
                    </button>
                </span>
            );
        }
        else {
            return (
                <span>        
                    <button className="white-square square" onClick={props.onClick}>
                    </button>
                </span>
            );
        }
    }
    else {
        return (
            <span>
                <button className="square" onClick={props.onClick}>
                     {props.value}
                </button>
            </span>
        );
    }
}

class ScoreDisplay extends React.Component {
    BlackScoreDisplay() {
        if (this.props.turn === "B") {
            return (
                <div className="score-display-highlighted">
                    <div className="black-piece-display"></div>
                    <div className="black-counter">{this.props.numBlack}</div>
                </div>
            );
        }
        else if (this.props.turn === "W") {
            return (
                <div className="score-display">
                    <div className="black-piece-display"></div>
                    <div className="black-counter">{this.props.numBlack}</div>
                </div>
            );
        }
        
    }

    WhiteScoreDisplay() {
        if (this.props.turn === "W") {
            return (
                <div className="score-display-highlighted">
                    <div className="white-piece-display"></div>
                    <div className="white-counter">{this.props.numWhite}</div>
                </div>
            );
        }
        else if (this.props.turn === "B") {
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
        if (row === this.props.lastPlay[0] && col === this.props.lastPlay[1]) {
            isLastPlay = true;
        }
        return (
            <Square
                key={[row,col]}
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
                row_items.push(this.renderSquare(row, col))
            }
            rows.push(<div className="board-row" key={row}>{row_items}</div>)
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
        console.log("\nClick detected");
        let isValidMove = false;

        if (this.state.squares[row][col] == null) {
            let capturedPieces = this.getCapturedPieces(row, col);

            if (capturedPieces.length > 0) {
                this.processPieces([row, col], capturedPieces);
                isValidMove = true;
            }     
        }

        if (isValidMove) {
            this.alternateTurn();       
            const numRemaining = this.state.numRemaining - 1;
            this.setState({ numRemaining: numRemaining })
        }
    }

    isValidCell(row, col) {
        return (row >= 0 && row <= 7) && (col >= 0 && col <= 7);
    }

    getCapturedPieces(row, col) {
        //Checks if playing this move would capture any pieces
        //Returns an array containing the coordinates of all captured pieces,
        //or an empty array if no pieces were captured, which means an invalid move
        console.log("Checking Captured Pieces")
        let capturedPieces = [];

        capturedPieces = capturedPieces.concat(this.getCapturedUp(row, col));
        capturedPieces = capturedPieces.concat(this.getCapturedDown(row, col));
        capturedPieces = capturedPieces.concat(this.getCapturedLeft(row, col));
        capturedPieces = capturedPieces.concat(this.getCapturedRight(row, col));
        capturedPieces = capturedPieces.concat(this.getCapturedUpLeft(row, col));
        capturedPieces = capturedPieces.concat(this.getCapturedUpRight(row, col));
        capturedPieces = capturedPieces.concat(this.getCapturedDownLeft(row, col));
        capturedPieces = capturedPieces.concat(this.getCapturedDownRight(row, col));

        console.log("Total Captured: " + capturedPieces.length);
        return capturedPieces;
    }

    getCapturedUp(row, col) {
        //Only a play at the 3rd row or lower(e.g., 4th, 5th) can capture pieces in Up direction
        if (row < 2) {
            ;
        }
        //First piece in this direction must be the opposite color
        else if (!this.hasPiece(row - 1, col) || !this.isOppositeColor(row - 1, col)) {
            ;
        }
        else {
            let capturedPieces = [[row - 1, col]];
            let currRow = row - 2;
            while (this.isValidCell(currRow, col) && this.hasPiece(currRow, col)) {
                if (this.isSameColor(currRow, col)) {
                    console.log("- Up: " + capturedPieces.length);
                    return capturedPieces;
                }
                else if (this.isOppositeColor(currRow, col)) {
                    capturedPieces.push([currRow, col]);
                }

                currRow--;
            }
        }
        
        console.log("- Up: 0");
        return [];
    }

    getCapturedDown(row, col) {
        if (row > 5) {
            ;
        }
        //First piece in this direction must be the opposite color
        else if (!this.hasPiece(row + 1, col) || !this.isOppositeColor(row + 1, col)) {
            ;
        }
        else {
            let capturedPieces = [[row + 1, col]];
            let currRow = row + 2;
            while (this.isValidCell(currRow, col) && this.hasPiece(currRow, col)) {
                if (this.isSameColor(currRow, col)) {
                    console.log("- Down: " + capturedPieces.length);
                    return capturedPieces;
                }
                else if (this.isOppositeColor(currRow, col)) {
                    capturedPieces.push([currRow, col]);
                }

                currRow++;
            }
        }

        console.log("- Down: 0");
        return [];
    }

    getCapturedLeft(row, col) {
        if (col < 2) {
            ;
        }
        //First piece in this direction must be the opposite color
        else if (!this.hasPiece(row, col-1) || !this.isOppositeColor(row, col-1)) {
            ;
        }
        else {
            let capturedPieces = [[row, col-1]];
            let currCol = col - 2;
            while (this.isValidCell(row, currCol) && this.hasPiece(row, currCol)) {
                if (this.isSameColor(row, currCol)) {
                    console.log("- Left: " + capturedPieces.length);
                    return capturedPieces;
                }
                else if (this.isOppositeColor(row, currCol)) {
                    capturedPieces.push([row, currCol]);
                }

                currCol--;
            }
        }

        console.log("- Left: 0");
        return [];
    }

    getCapturedRight(row, col) {
        if (col > 5) {
            ;
        }
        //First piece in this direction must be the opposite color
        else if (!this.hasPiece(row, col + 1) || !this.isOppositeColor(row, col + 1)) {
            ;
        }
        else {
            let capturedPieces = [[row, col + 1]];
            let currCol = col + 2;
            while (this.isValidCell(row, currCol) && this.hasPiece(row, currCol)) {
                if (this.isSameColor(row, currCol)) {
                    console.log("- Right: " + capturedPieces.length);
                    return capturedPieces;
                }
                else if (this.isOppositeColor(row, currCol)) {
                    capturedPieces.push([row, currCol]);
                }

                currCol++;
            }
        }

        console.log("- Right: 0");
        return [];
    }

    getCapturedUpLeft(row, col) {
        if (row < 2 || col < 2) {
            ;
        }
        //First piece in this direction must be the opposite color
        else if (!this.hasPiece(row - 1, col - 1) || !this.isOppositeColor(row - 1, col - 1)) {
            ;
        }
        else {
            let capturedPieces = [[row - 1, col - 1]];
            let currRow = row - 2;
            let currCol = col - 2;
            while (this.isValidCell(currRow, currCol) && this.hasPiece(currRow, currCol)) {
                if (this.isSameColor(currRow, currCol)) {
                    console.log("- Up Left: " + capturedPieces.length);
                    return capturedPieces;
                }
                else if (this.isOppositeColor(currRow, currCol)) {
                    capturedPieces.push([currRow, currCol]);
                }

                currRow--;
                currCol--;
            }
        }

        console.log("- Up Left: 0");
        return [];
    }

    getCapturedUpRight(row, col) {
        if (row < 2 || col > 5) {
            ;
        }
        //First piece in this direction must be the opposite color
        else if (!this.hasPiece(row - 1, col + 1) || !this.isOppositeColor(row - 1, col + 1)) {
            ;
        }
        else {
            let capturedPieces = [[row - 1, col + 1]];
            let currRow = row - 2;
            let currCol = col + 2;
            while (this.isValidCell(currRow, currCol) && this.hasPiece(currRow, currCol)) {
                if (this.isSameColor(currRow, currCol)) {
                    console.log("- Up Right: " + capturedPieces.length);
                    return capturedPieces;
                }
                else if (this.isOppositeColor(currRow, currCol)) {
                    capturedPieces.push([currRow, currCol]);
                }

                currRow--;
                currCol++;
            }
        }

        console.log("- Up Right: 0");
        return [];
    }

    getCapturedDownLeft(row, col) {
        if (row > 5 || col < 2) {
            ;
        }
        //First piece in this direction must be the opposite color
        else if (!this.hasPiece(row + 1, col - 1) || !this.isOppositeColor(row + 1, col - 1)) {
            ;
        }
        else {
            let capturedPieces = [[row + 1, col - 1]];
            let currRow = row + 2;
            let currCol = col - 2;
            while (this.isValidCell(currRow, currCol) && this.hasPiece(currRow, currCol)) {
                if (this.isSameColor(currRow, currCol)) {
                    console.log("- Down Left: " + capturedPieces.length);
                    return capturedPieces;
                }
                else if (this.isOppositeColor(currRow, currCol)) {
                    capturedPieces.push([currRow, currCol]);
                }

                currRow++;
                currCol--;
            }
        }

        console.log("- Down Left: 0");
        return [];
    }

    getCapturedDownRight(row, col) {
        if (row > 5 || col > 5) {
            ;
        }
        //First piece in this direction must be the opposite color
        else if (!this.hasPiece(row + 1, col + 1) || !this.isOppositeColor(row + 1, col + 1)) {
            ;
        }
        else {
            let capturedPieces = [[row + 1, col + 1]];
            let currRow = row + 2;
            let currCol = col + 2;
            while (this.isValidCell(currRow, currCol) && this.hasPiece(currRow, currCol)) {
                if (this.isSameColor(currRow, currCol)) {
                    console.log("- Down Right: " + capturedPieces.length);
                    return capturedPieces;
                }
                else if (this.isOppositeColor(currRow, currCol)) {
                    capturedPieces.push([currRow, currCol]);
                }

                currRow++;
                currCol++;
            }
        }

        console.log("- Down Right: 0");
        return [];
    }

    hasPiece(row, col) {
        return (this.state.squares[row][col] != null);
    }

    isOppositeColor(row, col) {
        if (this.state.turn === "B") {
            return (this.state.squares[row][col] === "W");
        }
        else if (this.state.turn === "W") {
            return (this.state.squares[row][col] === "B");
        }
    }

    isSameColor(row, col) {
        return (this.state.squares[row][col] === this.state.turn);
    }

    processPieces(currPlay, capturedPieces) {
        //Places down piece for the current move
        //Changes the color of captured pieces
        //Adjusts the Score counters to reflect this
        console.log("Processing Captured Pieces");
        const squares = this.state.squares.slice();
        let newNumBlack = this.state.numBlack;
        let newNumWhite = this.state.numWhite;
        this.setState({ lastPlay: [currPlay[0], currPlay[1]] });

        squares[currPlay[0]][currPlay[1]] = this.state.turn;
        if (this.state.turn === "B") {
            newNumBlack++;
        }
        else if (this.state.turn === "W") {
            newNumWhite++;
        }

        let row;
        let col;
        for (let idx = 0; idx < capturedPieces.length; idx++) {
            row = capturedPieces[idx][0];
            col = capturedPieces[idx][1];
            console.log("- [" + row + "][" + col + "] to " + this.state.turn);
            squares[row][col] = this.state.turn;
            if (this.state.turn === "B") {
                newNumBlack++;
                newNumWhite--;
            }
            else if (this.state.turn === "W") {
                newNumBlack--;
                newNumWhite++;
            }
        }
        
        this.setState({ numBlack: newNumBlack });
        this.setState({ numWhite: newNumWhite });
        this.setState({ squares: squares });
    }

    alternateTurn() {
        if (this.state.turn === "W") {
            this.setState({ turn: "B" });
        }
        else if (this.state.turn === "B") {
            this.setState({ turn: "W" });
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
