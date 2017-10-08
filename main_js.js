// Track whos turn it is (either X or O).  X starts first.
var activePlayer = "X";

// Track the moves on the tic-tac-toe grid
var moves = [];

// Store the cells of the tic-tac-toe board
var ticTacToeCells = document.querySelectorAll("canvas");

var winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [6,4,2],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8]
];


///////////////////////////////////
// Functions
///////////////////////////////////

// Draw an X or O in the clicked cell
function draw(cellIndex) {
  if (isBlank(cellIndex)) {
    // Track each player's moves
    moves[cellIndex] = activePlayer;

    var cell = ticTacToeCells[cellIndex];
    if (activePlayer == "X") {
      drawX(cell);
    } else {
      drawO(cell);
    }

    if (isWinner(activePlayer)) {
      gameOver(activePlayer + " has won!");
    } else if (isTie()) {
      gameOver("It's a draw, try again!");
    } else {
      // It's the other players turn
      // TODO: Can we simplify this?  Also repeated in gameOver method.
      activePlayer = (activePlayer === "X") ? "O" : "X";
    }
  }
}

function gameOver(message) {
  // Pause the game for a 1/2 second before displaying the game over message
  setTimeout(function() {
    alert(message);
    reset();
    activePlayer = (activePlayer === "X") ? "O" : "X";
  }, 500);
}

function drawX(cell) {
  var context = cell.getContext("2d");
  context.moveTo(10,10);
  context.lineTo(75,75);
  context.moveTo(10,75);
  context.lineTo(75,10);
  context.strokeStyle = 'green';
  context.lineWidth = 5;
  context.stroke();
}

function drawO(cell) {
  var context = cell.getContext("2d");
  context.beginPath();
  context.arc(43,43,30,0,2*Math.PI);
  context.strokeStyle = '#ff3399';
  context.lineWidth = 5;
  context.stroke();
}

function isBlank(cellIndex) {
  if (moves[cellIndex] === undefined) {
    return true;
  } else {
    return false;
  }
}

function isWinner(player) {
  for (var i = 0; i < winningCombinations.length; i++) {
    if (moves[winningCombinations[i][0]] == player &&
       moves[winningCombinations[i][1]] == player &&
       moves[winningCombinations[i][2]] == player) {
       highlightWinningCombo(winningCombinations[i]);
       return true;
    }
  }
  return false;
}

function isTie() {
  for (var i = 0; i < 9; i++) {
    console.log("moves[" + i + "]=" + moves[i]);
    if (typeof moves[i] == 'undefined' || null === moves[i] ) {
      return false;
    }
  }
  return true;
}

function highlightWinningCombo(winningCombo) {
  for (var i = 0; i < winningCombo.length; i++) {
    var cell = ticTacToeCells[winningCombo[i]];
    cell.classList.add("winner");
  }
}

function reset() {
  for (var i = 0; i <= moves.length; i++) {
    if (moves[i] !== undefined) {
      // Erase the cells that have X or O
      var cell = ticTacToeCells[i];
      var context = cell.getContext("2d");
      context.beginPath();
      context.clearRect(0, 0, cell.width, cell.height);
      cell.classList.remove("winner");
    }
  }

  // Reset the moves array
  moves = [];
}

///////////////////////////////////
// Event Handlers
///////////////////////////////////

// Add a click handler for each of our tic-tac-toe boxes
for (var i = 0; i < ticTacToeCells.length; i++) {
    addClickHandler(ticTacToeCells[i], i);
}

function addClickHandler(canvas, index) {
    canvas.addEventListener("click", function() {
        draw(index);
    }, false);
}
