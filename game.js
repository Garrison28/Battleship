document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('reset').addEventListener('click', startGame);
});
//Global Variables
let playerGameBoard;
let aiGameBoard;
let isHumanTurn;
document.getElementById('aiGameBoardContainer').addEventListener('click', humanTurn, false);

var playerHitCounter = 0;
var aiHitCounter = 0;

var torpedos = 55;

// Ship pieces and there size
//     carrier1 = [1, 1, 1, 1, 1],
//     carrier2 = [1, 1, 1, 1, 1],
//     battleShip1 = [1, 1, 1, 1],
//     battleShip2 = [1, 1, 1, 1],
//     cruiser1 = [1, 1, 1],
//     cruiser2 = [1, 1, 1],
//     destroyer1 = [1, 1, 1],
//     destroyer2 = [1, 1, 1]
//     ptBoat1 = [1, 1],
//     ptBoat2 = [1, 1]


startGame();


function startGame() {
    
    playerGameBoard = [
        // 0 = water, 1 = ship, 2 = partial sunk ship, 3 = miss
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0]
    ]

    aiGameBoard = [
        [0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [1, 1, 1, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    isHumanTurn = true;
    
};


function fireTorpedo(e) {
    var currentBoard;
    if (isHumanTurn) {
        currentBoard = aiGameBoard;
    } else {
        currentBoard = playerGameBoard;
    }
    // console.log(currentBoard);
    if (e.target !== e.currentTarget) {
        var row = e.target.id.substring(2, 3);
        var col = e.target.id.substring(3, 4);
        // console.log(row, col);
        if (currentBoard[row][col] === 0) {
            e.target.style.background = 'black';
            currentBoard[row][col] = 3;
            console.log('miss');
            torpedos--;
        }
        else if (currentBoard[row][col] === 1) {
            e.target.style.background = 'red';
            currentBoard[row][col] = 2;
            console.log('hit');
            playerHitCounter++;
            torpedos--;
        }
        if (playerHitCounter == 17) {
            alert('You have sunk all the ships! You Win!');
            document.getElementById('aiGameBoardContainer').removeEventListener('click', humanTurn, false);
        }
        if (torpedos == 0) {
            alert('You have run out of torpedos! You Lose');
            console.log(torpedos);
            document.getElementById('aiGameBoardContainer').removeEventListener('click', humanTurn, false);
        }
        else if (currentBoard[row][col] > 1) {
            // alert('You/ve already hit that square!');
        }

    }
    e.stopPropagation();

};
function humanTurn(e) {
    fireTorpedo(e)
    isHumanTurn = false;
    aiTurn()
    isHumanTurn = true;
}
function aiTurn() {
    var row = Math.floor(Math.random() * 10);
    var col = Math.floor(Math.random() * 10);
    var string = row.toString() + col.toString();
    // decided which row and col the ai wants to hit
     if (playerGameBoard[row][col] === 0) {
        document.getElementById(string).style.background = 'black';
        playerGameBoard[row][col] = 3;
        console.log('miss');
    }
    else if (playerGameBoard[row][col] === 1) {
        document.getElementById(string).style.background = 'red';
        playerGameBoard[row][col] = 2;
        console.log('hit');
        hitCounter++;
    }
    if (aiHitCounter == 17) {
        alert('All opposing ships have been sunk, AI Won');
    }
    
}






