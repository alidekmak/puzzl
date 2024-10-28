let tiles = [];
let emptyRow = 3, emptyCol = 3;
let moveCounter = 0, time = 0, timerInterval;

function initializeBoard() {
    tiles = [...Array(15).keys()].map(x => x + 1); // Numbers 1-15
    tiles.push(""); // Empty slot
    shuffleArray(tiles);
    moveCounter = 0;
    document.getElementById('moveCounter').innerText = moveCounter;
    time = 0;
    document.getElementById('timer').innerText = time;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        time++;
        document.getElementById('timer').innerText = time;
    }, 1000);
    drawBoard();
}

function drawBoard() {
    const puzzleBoard = document.getElementById("puzzleBoard");
    puzzleBoard.innerHTML = "";
    for (let i = 0; i < 4; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement("td");
            const tile = tiles[i * 4 + j];
            cell.innerText = tile;
            cell.id = `cell${i}${j}`;
            if (tile === "") {
                cell.classList.add("empty");
                emptyRow = i;
                emptyCol = j;
            } else {
                cell.onclick = () => moveTile(i, j);
            }
            row.appendChild(cell);
        }
        puzzleBoard.appendChild(row);
    }
}

function moveTile(row, col) {
    if ((Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
        (Math.abs(col - emptyCol) === 1 && row === emptyRow)) {
        swapTiles(row, col, emptyRow, emptyCol);
        emptyRow = row;
        emptyCol = col;
        moveCounter++;
        document.getElementById('moveCounter').innerText = moveCounter;
        if (checkWin()) {
            setTimeout(() => {
                alert(`Congratulations! You won in ${moveCounter} moves and ${time} seconds!`);
                newGame();
            }, 500);
        }
    }
}

function swapTiles(row1, col1, row2, col2) {
    const temp = tiles[row1 * 4 + col1];
    tiles[row1 * 4 + col1] = tiles[row2 * 4 + col2];
    tiles[row2 * 4 + col2] = temp;
    drawBoard();
}

function checkWin() {
    for (let i = 0; i < 15; i++) {
        if (tiles[i] !== i + 1) return false;
    }
    return true;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function newGame() {
    initializeBoard();
}

function simpleGame() {
    tiles = [...Array(15).keys()].map(x => x + 1);
    tiles.push("");
    moveCounter = 0;
    document.getElementById('moveCounter').innerText = moveCounter;
    time = 0;
    document.getElementById('timer').innerText = time;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        time++;
        document.getElementById('timer').innerText = time;
    }, 1000);
    drawBoard();
}

// Initialize the game when the page loads
window.onload = newGame;
