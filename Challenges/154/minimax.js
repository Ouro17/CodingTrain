const bestMove = () => {
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {

            if (board[i][j] == '') {
                board[i][j] = ai;

                let score = minimax(board);

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = { i, j};
                }
            }
        }
    }

    board[bestMove.i][bestMove.j] = ai;
    currentPlayer = human;
}

const minimax = (board) => {
    return 1;
}