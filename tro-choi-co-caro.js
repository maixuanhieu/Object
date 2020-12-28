console.log('Load script...');

const X = 1;
const O = 0;
const NONE = -1;

class Cell {
    constructor(value = NONE, size, border = 0.05, left = 0, top = 0) {
        this.left = left;
        this.top = top;
        this.value = value;
        this.size = size;
        this.border = border;
    }

    draw(x, y) {
        return `
      <div
      onclick="board.changeValue(${x}, ${y});"
      id="${this.left}+${this.top}";
      style=
        "
        width: ${this.size}px;
        height: ${this.size}px;
        border: ${this.border}px solid black;
        top: ${this.top}px;
        left: ${this.left}px;
        position: absolute;
        text-align: center;
        font-size:18px;
        color: red;
        ">
      ${this.value === -1 ? ' ' : this.value === 1 ? 'X' : 'O'}
      </div>
    `;
    }
}

class Board {
    constructor(rows, cols, sizeCell) {
        this.rows = rows;
        this.cols = cols;
        this.board = [];
        for (let i = 0; i < rows; i++) {
            const temp = [];
            while (temp.length < cols) temp.push(new Cell(NONE, sizeCell));
            this.board = [...this.board, temp];
        }
    }

    init() {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                this.board[i][j].left = j * this.board[i][j].size;
                this.board[i][j].top = i * this.board[i][j].size;
            }
        }
    }

    draw() {
        console.log('Run draw');
        let result = '';
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                result += this.board[i][j].draw(i, j);
            }
        }
        document.getElementById('game-board').innerHTML = result;
    }

    changeValue(x, y) {
        if (this.board[x][y].value !== NONE) {
            window.alert('Cell is not empty');
        } else {
            if (count % 2 === 0) {
                this.board[x][y].value = X;
            } else {
                this.board[x][y].value = O;
            }
            count++;
        }
        this.draw();
        this.checkWinPlayer();
    }

    checkWin(stringBoard) {
        if (stringBoard.indexOf('11111') !== -1) {
            return X;
        }
        if (stringBoard.indexOf('00000') !== -1) {
            return O;
        }
        return NONE;
    }

    checkRow() {
        let stringBoard = '';
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                stringBoard += this.board[i][j].value.toString();
            }
            stringBoard += '|';
        }
        return stringBoard;
    }

    checkCol() {
        let stringBoard = '';
        let boardTemp = this.board;
        boardTemp = boardTemp[0].map((col, index) =>
            boardTemp.map(row => row[index])
        );

        for (let i = 0; i < boardTemp.length; i++) {
            for (let j = 0; j < boardTemp[i].length; j++) {
                stringBoard += boardTemp[i][j].value.toString();
            }
            stringBoard += '|';
        }
        return stringBoard;
    }

    checkCrossLeft() {
        let stringBoard = '';
        for (let i = 0; i < this.board.length - 5; i++) {
            for (let j = 0; j < this.board[i].length - 5; j++) {
                let str = '';
                let z = 0;
                while (i + j + z < this.board[i].length) {
                    str += this.board[i + z][i + j + z].value.toString();
                    z++;
                }
                str += '|';
                stringBoard += str;
            }
        }
        return stringBoard;
    }

    checkCrossRight() {
        let stringBoard = '';
        for (let i = 0; i < this.board.length - 5 + 1; i++) {
            for (
                let j = this.board[i].length - 5 + 1;
                j < this.board[i].length;
                j++
            ) {
                let str = '';
                let z = 0;
                while (i + j - z >= 0 && j - z >= 0 && i + z < this.board[i].length) {
                    str += this.board[i + z][j - z].value.toString();
                    z++;
                }
                str += '|';
                stringBoard += str;
            }
        }
        return stringBoard;
    }

    checkWinPlayer() {
        const rs = [
            this.checkWin(this.checkCol()),
            this.checkWin(this.checkRow()),
            this.checkWin(this.checkCrossRight()),
            this.checkWin(this.checkCrossLeft())
        ];
        if (rs.indexOf(1) !== -1) {
            window.alert('X win');
        } else if (rs.indexOf(0) !== -1) {
            window.alert('O win');
        } else if (count === this.cols * this.rows) {
            window.alert('Draw');
        }
    }

    resetBoard() {
        this.board = [];
        for (let i = 0; i < this.rows; i++) {
            const temp = [];
            while (temp.length < this.cols) temp.push(new Cell(NONE, this.size));
            this.board = [...this.board, temp];
        }

        this.init();
        this.draw();
    }
}

const board = new Board(12, 12, 30);
board.init();
board.draw();
let count = 0;