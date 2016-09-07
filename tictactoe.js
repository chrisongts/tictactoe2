console.log("Linked.");


var mainBox = document.querySelectorAll('div')


function player(option) {
  this.option = option; // option "x"or "o" for users
  this.selectedBox = []; // to collect user's selected boxes on the game board
}

playerX = new player('x');
playerO = new player('o');
currentPlayer = playerX;
counter = 0;
boxesPlayed = []
gameWon = false;
row1 = 0;
row2 = 0;
row3 = 0;
col1 = 0;
col2 = 0;
col3 = 0;
dig1 = 0;
dig2 = 0;
var locId = -1;

// to initialize the array to track those boxes that already taken by users
// inital value set to be -99
function initBox() {
  for ( var i = 0; i <= 8; i++) {
    boxesPlayed[i] = -99;
  }
}
initBox();

// to update user's selected box to array
// for playerX replacing the initial value -99 in that box and
// update a "1" to the user's array
function markBox(player, location, id) {
  if ( player === playerX) {
    playerX.selectedBox.push(id);
    boxesPlayed[location] = 1;
  } else {
    playerO.selectedBox.push(id);
    boxesPlayed[location] = 0;
  }
}


// check for winner, for playerX to win mus have at least one of the rows
// or one of the columns or diagonally whhich has total of 3
function checkForWinner(){

  var row1 = boxesPlayed[0] + boxesPlayed[1] + boxesPlayed[2];
  var row2 = boxesPlayed[3] + boxesPlayed[4] + boxesPlayed[5];
  var row3 = boxesPlayed[6] + boxesPlayed[7] + boxesPlayed[8];
  var col1 = boxesPlayed[0] + boxesPlayed[3] + boxesPlayed[6];
  var col2 = boxesPlayed[1] + boxesPlayed[4] + boxesPlayed[7];
  var col3 = boxesPlayed[2] + boxesPlayed[5] + boxesPlayed[8];
  var dig1 = boxesPlayed[0] + boxesPlayed[4] + boxesPlayed[8];
  var dig2 = boxesPlayed[2] + boxesPlayed[4] + boxesPlayed[6];

  if ( currentPlayer === playerX ) {
    if ( row1 == 3 || row2 == 3 || row3 == 3 ||
         col1 == 3 || col2 == 3 || col3 == 3 ||
         dig1 == 3 || dig2 == 3 ) {
           setTimeout(function() {alert("Player X won !!!");
           gameWon = true;
           if (gameWon) {
             location.reload(true);
           }
          }, 150);
       }
     }

    if ( currentPlayer == playerO ) {
        if (row1 == 0 || row2 == 0 || row3 == 0 ||
            col1 == 0 || col2 == 0 || col3 == 0 ||
            dig1 == 0 || dig2 == 0 ) {
              setTimeout(function() {alert("Player O won !!!");
              gameWon = true;
              if (gameWon) {
                location.reload(true);
              }
              }, 150);
    }
  }

    if ( counter >= 8 && !gameWon ) {
        setTimeout(function() {alert("No player wins the game !!!");
        location.reload(true);}, 150);
        }
}

// set for next player
function nextPlayer() {
  if ( currentPleayer = playerX ) {
    currentPleayer = playerO;
  } else currentPleayer = playerX;
}


// play game
function playGame() {
    var box = document.getElementsByClassName('box');
    /*console.log("Hahaha..." + box.length);*/
    for (var n = 0; n < box.length; n++) {
      box[n].addEventListener('click', mouseClickFn, false);
    }
  }

playGame();

// under testing -- do not know how to check users inputs on screen...
// 03 Jul Uncaught TypeError: Cannot read property 'target' of undefined
function mouseClickFn() {
  if(currentPlayer == playerX) {
    event.target.innerHTML = "X";
    var x = event.target;
    checkBox(x.id);
    markBox(currentPlayer, locId, x.id);
    checkForWinner()
    if (gameWon) {
      location.reload(true);
    }
    currentPlayer = playerO;
    counter += 1;
    }
  else {
    event.target.innerHTML = "O";
    x = event.target;
    checkBox(x.id);
    markBox(currentPlayer, locId, x.id);
    checkForWinner();
    if (gameWon) {
      location.reload(true);
    }
    currentPlayer = playerX;
    counter += 1;
  }
}


function checkBox(boxPlay) {

  switch (boxPlay){
    case "b0":
      locId = 0;
      break;
    case "b1":
      locId = 1;
      break;
    case "b2":
      locId = 2
      break;
    case "b3":
      locId = 3;
      break;
    case "b4":
      locId = 4;
      break;
    case "b5":
      locId = 5;
      break;
    case "b6":
      locId = 6;
      break;
    case "b7":
      locId = 7;
      break;
    case "b8":
      locId = 8;
      break;
    default:
      console.log("wrong ID");
    }
}
