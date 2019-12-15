class TicTacToe {

    constructor(nRows, nColumns, players) {
        this.empty = '';
        this.gameState = {
            CONTINUE: -1,
            TIE: -2
        }

        this.boardWidth = nRows;
        this.boardHeight = nColumns;

        this.board = this.createBoard(nRows, nColumns);
        this.available = this.createAvailable(nRows, nColumns);
        this.players = players;
    }

    drawBoard(w, h) {
        background(255);
        strokeWeight(4);

        line(w, 0, w, height);
        line(w * 2, 0, w * 2, height);
        line(0, h, width, h);
        line(0, h * 2, width, h * 2);

        for (let j = 0; j < this.boardWidth; j++) {
            for (let i = 0; i < this.boardHeight; i++) {
                const x = (w * i) + (w / 2);
                const y = (h * j) + (h / 2);

                switch (this.board[j][i]) {
                    case this.players[0]:
                        this.drawX(x, y, w, h);
                        break;
                    case this.players[1]:
                        this.drawCircle(x, y, w);
                        break;
                }
            }
        }
    }

    drawCircle(x, y, w) {
        noFill();
        ellipse(x, y, w / 2);
    }

    drawX(x, y, w, h) {
        let xr = w / 4;
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr, y - xr, x - xr, y + xr);
    }

    takeAvailable(index, playerIndex) {
        let spot = this.available.splice(index, 1)[0];
        let i = spot[0];
        let j = spot[1];
        this.board[j][i] = this.players[playerIndex];
    }

    checkWinner() {
        let winner = this.gameState.CONTINUE;

        // Horizontal
        for (let j = 0; j < this.boardHeight; j++) {
            const row = this.board[j];

            winner = this.checkWinnerData(row[0], row);
            if (winner != this.gameState.CONTINUE) {
                break;
            }
        }

        // Vertical
        if (winner == this.gameState.CONTINUE) {
            for (let i = 0; i < this.boardWidth; i++) {
                const columns = [];
                for (let j = 0; j < this.boardHeight; j++) {
                    columns.push(this.board[j][i]);
                }

                winner = this.checkWinnerData(columns[0], columns);
                if (winner != this.gameState.CONTINUE) {
                    break;
                }
            }
        }

        // Diagonal
        if (winner == this.gameState.CONTINUE) {
            let data = [];
            for (let i = 0, j = 0; i < this.boardWidth && j < this.boardHeight; i++ , j++) {
                data.push(this.board[j][i]);
            }

            winner = this.checkWinnerData(data[0], data);

            if (winner == this.gameState.CONTINUE) {
                data = [];
                for (let i = this.boardWidth - 1, j = 0; i >= 0 && j < this.boardHeight; i-- , j++) {
                    data.push(this.board[j][i]);
                }

                winner = this.checkWinnerData(data[0], data);
            }
        }

        // Tie
        if (winner == this.gameState.CONTINUE && this.available.length == 0) {
            winner = this.gameState.TIE
        }

        return winner;
    }

    checkWinnerData(checkingPlayer, data) {
        if (checkingPlayer != this.empty && data.every(e => e == checkingPlayer)) {
            return this.players.findIndex(e => e == checkingPlayer);
        }

        return this.gameState.CONTINUE;
    }

    createBoard() {
        const b = [];

        for (let i = 0; i < this.boardWidth; i++) {
            const row = [];

            for (let i = 0; i < this.boardHeight; i++) {
                row.push(this.empty);
            }
            b.push(row);
        }

        return b;
    }

    createAvailable() {
        const a = [];
        for (let j = 0; j < this.boardWidth; j++) {
            for (let i = 0; i < this.boardHeight; i++) {
                a.push([i, j]);
            }
        }

        return a;
    }
}