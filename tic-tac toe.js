const boxes = document.querySelectorAll('.box');
const gameStatus = document.getElementById('gameStatus');
const resetBtn = document.getElementById('resetBtn');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleBoxClick(e) {
    const box = e.target;
    const boxIndex = box.getAttribute('data-index');

    if (board[boxIndex] !== '' || !isGameActive) {
        return;
    }

    updateBox(box, boxIndex);
    checkWinner();
}

function updateBox(box, index) {
    board[index] = currentPlayer;
    box.textContent = currentPlayer;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameStatus.textContent = `Player ${currentPlayer} has won!`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        gameStatus.textContent = 'Game ended in a draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    gameStatus.textContent = "Player X's turn";
    boxes.forEach(box => {
        box.textContent = '';
    });
}

boxes.forEach(box => box.addEventListener('click', handleBoxClick));
resetBtn.addEventListener('click',resetGame)
