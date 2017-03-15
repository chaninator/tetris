
$(document).ready(function(){
  var blockRow = 0;
  var blockCol = 5;
  var boardWidth = 10;
  var boardHeight = 20;

  var stacked = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,1,1,0,0,0]
  ];

  var shapes= [
    // I
  [[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
   [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]],
  // T
  [[[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],
   [[0,1,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]],
   [[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
   [[0,1,0,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]]],
  // L
  [[[0,0,0,0],[1,1,1,0],[1,0,0,0],[0,0,0,0]],
   [[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
   [[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
   [[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]]],
  // J
  [[[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
   [[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
   [[0,0,0,0],[1,1,1,0],[0,0,1,0],[0,0,0,0]],
   [[0,1,0,0],[0,1,0,0],[1,1,0,0],[0,0,0,0]]],
  // Z
  [[[0,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,0,0]],
   [[0,0,1,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]]],
  // S
  [[[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]],
   [[0,1,0,0],[0,1,1,0],[0,0,1,0],[0,0,0,0]]],
  // O
  [[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]]]];


  //Build the board
  function buildBoard() {
    spaces = []
    var k;
    for (var i = 0; i < 20; i++) {
      spaces[i] = []
      $('#playing-field').append("<tr id='" + i + "''></tr>")
      for (var j = 0; j< 10; j++) {
          var coordinate = i + '-' + j;
          $('#' + i).append("<td id='" + coordinate + "' class='empty'></td>");
            spaces[i][j] = $(['#' + coordinate].join(''))
      }
    }
  }

  function blockColor(x, y, color){
    spaces[x][y].css('background-color', color)
  }

  //make empty a block that was just exited
  function blockEmpty(piece, x, y, direction){
    //if (direction === 'down')
    stacked[blockRow][blockCol] = 0;
    blockColor(blockRow, blockCol, 'white');
    //id = '#' + blockRow + '-' + blockCol;
    //$(id).attr('class', 'empty');
    //console.log('Im graying this bad boy out!', id);

  };

  //highlighting of given coordinates
  function blockHighlight(direction) {
    stacked[blockRow][blockCol] = 2;
    blockColor(blockRow, blockCol, 'red');
  };

  //modify the array to reflect the changed location
  function blockShift(direction) {
    if(direction === 'down'){
      blockRow += 1;
    } else if (direction === 'left') {
      blockCol -= 1;
    } else if (direction === 'right' ) {
      blockCol += 1;
    }
  }

  //all the steps to move the block, left, right, or down
  function blockMove(direction) {
    if (isGoingToCollide(piece, x, y, direction) == false) {
      blockEmpty(piece, x, y, direction);
      blockShift(piece, x, y, direction);
      //console.log('block move is executing move to: ', blockRow, blockCol, direction);
      blockHighlight(piece, x, y, direction);
    }


  };

  function isGoingToCollide(piece, x, y, direction) {
    //console.log ('currents row:', stacked[blockRow], 'current column 1 to the left', stacked[blockRow][blockCol-1]);
    if (direction === 'down' && (blockRow === boardHeight-1 || stacked[blockRow+1][blockCol] > 0 && blockRow <= boardHeight)){
      //console.log('Collision detected, abort!');
      return true;
    } else if (direction === 'left' && (y === 0 || stacked[blockRow][blockCol-1] > 0)){
      //console.log('Collision detected, abort!', 'Cannot move left!', blockRow);
      return true;
    } else if (direction === 'right' && (y === boardWidth || stacked[blockRow][blockCol+1] > 0)){
      //console.log('Collision detected, abort!', 'Cannot move right!');
      return true;
    } else {
      //console.log('free and clear to proceed!')
      return false;
    }

  };

$('html').keydown(function(e){
    switch(e.which){
      case 37:
        blockMove('left');
        break;
      case 38:
        blockRotate();
        break;
      case 39:
        blockMove('right');
        break;
      case 40:
        blockMove('down');
        break;
    }
  });

  function newBlock(){
    //blockRow = 0;
    //blockCol = 5;
    currentBlock = shapes[1];
  }

  function start(){
    buildBoard();
    console.log('Start of Drop Block');
    var speed = 1000;
    newBlock();
    blockHighlight(blockRow, blockCol);
    var dropTimer = setInterval(function(){
      //capture current location info


      //check for collisions, otherwise move the block
      if(isGoingToCollide('down') == true){

        //If the piece dropped, but the game isn't over
        //then restart the drop process
        clearInterval(dropTimer);
        //top row doesn't already have pieces
        if ($.inArray(2, stacked[0]) == -1 ){
          start();

        } else {

          //game over
          clearInterval(dropTimer);
          console.log('exiting')
        }

      } else {

        //delete block current location
        blockEmpty('down');

        //create new coordinates
        blockShift('down');

        //move block to new coordinates
        blockHighlight('down');
      }

    }, speed);
  }



  start();



})
