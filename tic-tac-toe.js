 /*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
const prompt = require('prompt-sync')({sigint: true});
const assert = require('assert');

// The board object used to save the current status of a gameplay
let board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    board[position] = mark;
}

// TODO: print the game board as described at the top of this code skeleton
// Will not be tested in Part 1
function printBoard() {
    console.log(`${board[1]} | ${board[2]} | ${board[3]}`);
    console.log('---------');
    console.log(`${board[4]} | ${board[5]} | ${board[6]}`);
    console.log('---------');
    console.log(`${board[7]} | ${board[8]} | ${board[9]}`);
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
// position is an input String
function validateMove(position) {
    const pos = parseInt(position);
    if (isNaN(pos) || pos < 1 || pos > 9) {
        return false;
    }
    return board[pos] === ' ';
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3], 
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    for (let combination of winCombinations) {
        const [a, b, c] = combination;
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false; 
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    for (let i = 1; i <= 9; i++) {
        if (board[i] === ' ') {
            return false;
        }
    }
    return true;
}

// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    printBoard(); // Print the current state of the board
    let position;
    do {
        position = prompt(`Player ${player}, enter your position (1-9): `);
    } while (!validateMove(position)); // Keep asking until a valid move is made

    markBoard(position, player);
    
    if (checkWin(player)) {
        printBoard(); // Print the board one last time
        console.log(`Player ${player} wins!`);
        return true; // A winner is found
    }
    
    if (checkFull()) {
        printBoard(); // Print the board one last time
        console.log("The game is a tie!");
        return true; // The game is a tie
    }
    
    return false; // No winner or tie yet
}

// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let winnerIdentified = false
let currentTurnPlayer = 'X'

// winnerIdentified = playTurn(currentTurnPlayer);
    
// Main game loop
while (!winnerIdentified) {
    winnerIdentified = playTurn(currentTurnPlayer);
    
    // Switch players if no winner or tie is found
    if (!winnerIdentified) {
        currentTurnPlayer = currentTurnPlayer === 'X' ? 'O' : 'X';
    }
}

console.log("Game Over. Thank you for playing!");



// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
