const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getCell = (index) => {
        return board[index];
    };

    const setCell = (index, marker) => {
        if (!board[index]) {
            board[index] = marker;
        }
    };

    const reset = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    const isFull = () => {
        return board.every(cell => cell !== "");
    };

    return { getCell, setCell, reset, isFull };
})();


const createPlayer = (marker) => {
    return { marker };
};

const player1 = createPlayer('X');
const player2 = createPlayer('O');
let currentPlayer = player1;

const checkWinner = () => {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        if (gameBoard.getCell(combination[0]) && gameBoard.getCell(combination[0]) === gameBoard.getCell(combination[1]) && gameBoard.getCell(combination[0]) === gameBoard.getCell(combination[2])) {
            return currentPlayer.marker;
        }
    }
    return null;
};

const render = () => {
    const gameboardDiv = document.getElementById('gameboard');
    const winnerMessageDiv = document.getElementById('winnerMessage');
    gameboardDiv.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cellDiv = document.createElement('div');
        cellDiv.textContent = gameBoard.getCell(i);
        cellDiv.addEventListener('click', () => {
            if (!cellDiv.textContent) {
                gameBoard.setCell(i, currentPlayer.marker);
                cellDiv.textContent = currentPlayer.marker;
                if (checkWinner()) {
                    winnerMessageDiv.textContent = `${currentPlayer.marker} wins!`;
                    gameboardDiv.removeEventListener('click', render);
                } else if (gameBoard.isFull()) {
                    winnerMessageDiv.textContent = "Draw!";
                    gameboardDiv.removeEventListener('click', render);
                } else {
                    currentPlayer = currentPlayer === player1 ? player2 : player1;
                }
            }
        });
        gameboardDiv.appendChild(cellDiv);
    }
};


document.getElementById('resetGame').addEventListener('click', () => {
    gameBoard.reset();
    document.getElementById('winnerMessage').textContent = '';
    render();
});

render();
