const players = ['X', 'O']

const boardWidth = 3;
const boardHeight = 3;

let w;
let h;
let ticTacToe;
let currentPlayer;

function setup() {
    createCanvas(400, 400);

    w = width / boardWidth;
    h = height / boardHeight;

    ticTacToe = new TicTacToe(boardWidth, boardHeight, players);

    currentPlayer = floor(random(players.length));

    frameRate(2);
}

function draw() {
    nextTurn();
    const winner = ticTacToe.checkWinner();
    if (winner != ticTacToe.gameState.CONTINUE) {
        const text = (winner == ticTacToe.gameState.TIE) ? 'TIE' : ('The winner is ' + players[winner])
        createP(text)
            .style('color', '#000')
            .style('font-size', '32pt');

        noLoop();
    }

    ticTacToe.drawBoard(w, h);
}

const nextTurn = () => {
    let index = floor(random(ticTacToe.available.length));
    ticTacToe.takeAvailable(index, currentPlayer);
    currentPlayer = (currentPlayer + 1) % players.length;
}
