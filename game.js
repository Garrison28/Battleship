document.addEventListener('DOMContentLoaded', function () {
    console.log('loaded');
});


var rows = 7;
var cols = 7;
// let cypher = {
//     'A': 0,
//     'B': 1,
//     'C': 2,
//     'D': 3,
//     'E': 4,
//     'F': 5,
//     'G': 6
// };






let gameBoard;
// 0 = water, 1 = ship, 2 = partial sunk ship, 3 = miss



document.getElementById('gameBoard').addEventListener('click', fireTorpedo, false);

var hitCounter = 0;

startGame();


function startGame() {
    gameBoard = [
        // 0 = water, 1 = ship, 2 = partial sunk ship, 3 = miss
        [0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]

}


function fireTorpedo(e) {
    console.log(e.target);
    if (e.target !== e.currentTarget) {
        var row = e.target.id.substring(0, 1);
        var col = e.target.id.substring(1, 2);
        console.log(row, col);
        if (gameBoard[row][col] === 0) {
            e.target.style.background = 'black';
            gameBoard[row][col] = 3;
            console.log('miss');
        }
        else if (gameBoard[row][col] === 1) {
            e.target.style.background = 'red';
            gameBoard[row][col] = 2;
            console.log('hit');
            hitCounter++;
        }
        if (hitCounter == 10) {
            alert('You have sunk all the ships! You Win!');
        }
        else if (gameBoard[row][col] > 1) {
            // alert('You/ve already hit that square!');
        }

    }
    e.stopPropagation();
}





