
$(document).ready(function(){
  var blockY = 0;
  var blockX = 5;
  var boardWidth = 10;
  var boardHeight = 20;
  var spaces;
  var currentBlock;

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
  [0,0,0,0,0,0,0,0,0,0]
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
    spaces = [];
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

  function blockColor(y, x, color){
    spaces[y][x].css('background-color', color)
  }

  //make empty a block that was just exited
  function blockEmpty(y, x, direction){
    for( var i=0; i < currentBlock.length ; i++){
      for (var j=0; j < currentBlock[i].length; j++){
        if(!currentBlock[i][j]){
        stacked[y+i][x+j] = 0
        blockColor(y-i, x+j, 'white');
        }
      }
    }
  };

  //highlighting of given coordinates
  function blockHighlight(y, x, direction) {
    for( var i=0; i < currentBlock.length ; i++){
      for (var j=0; j < currentBlock[i].length; j++){
        if(currentBlock[i][j]){
        stacked[y+i][x+j] = 2;
        blockColor(y-i, x+j, 'red');
        }
      }
    }
  };

  //modify the array to reflect the changed location
  function blockShift(direction) {
    if(direction === 'down'){
      blockY += 1;
    } else if (direction === 'left') {
      blockX -= 1;
    } else if (direction === 'right' ) {
      blockX += 1;
    }
  }

  //all the steps to move the block, left, right, or down
  function blockMove(direction) {
    blockX;
    blockY;
    //console.log('calling blockMove');
    //console.log('heading in ', direction, ' direction', blockX, blockY)
    if (isGoingToCollide(direction) == false) {
      blockEmpty(blockY, blockX, direction);
      blockShift(direction);
      blockHighlight(blockY, blockX, direction);
    }


  };

  function isGoingToCollide(direction) {
    y = blockY;
    bottomRow = blockY;
    x = blockX;
    var collision = false;

    for( var i=0; i < currentBlock.length; i++){
      console.log('current i value: ', i);
      for (var j=0; j < currentBlock[i].length-1; j++){
              console.log('current j value: ', j);
              console.log('very first down stacked values: ', y, i, x, j);
              console.log('currentBlock[i]', currentBlock[i]);
              console.log('stacked [y+1-i]', stacked[y+1-i][3]);


        if (direction === 'down' && (bottomRow === boardHeight-1 || stacked[y+1-i][x+j] === 1)){
          //console.log('the value of boardHeight-1:', boardHeight-1, ' and value of blockY: ', blockY);
          collision = true;
        } else if (direction === 'left' && (x === 0 || stacked[y-i][x-1+j] === 1)){
          //console.log('Collision detected, abort!', 'Cannot move left!', stacked[y][x-1]);
          collision = true;
        } else if (direction === 'right' && (x === boardWidth-1 || stacked[y-i][x+1+j] === 1)){
          //console.log('Collision detected, abort!', 'Cannot move right!');
          collision = true;
        } else {
          console.log('free and clear to proceed ', direction, '!');
        }
      }
    }
    console.log('collision status: ', collision);
    return collision;
  };

$('html').keydown(function(e){
    switch(e.which){
      case 37:
        blockMove('left');
        //console.log('pushing the LEFT button')
        break;
      case 38:
        blockRotate();
        break;
      case 39:
        blockMove('right');
        //console.log('pushing the RIGHT button')
        break;
      case 40:
        blockMove('down');
        //console.log('pushing the DOWN button')
        break;
    }
  });

  function newBlock(){
    blockY = 3;
    blockX = 3;
    currentBlock = shapes[0][1];
    console.log(currentBlock)
  }

  function start(){
    console.log(!spaces);
    if (!spaces) {
      buildBoard();
    }

    console.log('Start of Drop Block');
    var speed = 500;
    newBlock();
        blockHighlight(blockY, blockX);

    // var dropTimer = setInterval(function(){
    //   //capture current location info


    //   //check for collisions, otherwise move the block
    //   if(isGoingToCollide('down') == true){

    //     //If the piece dropped, but the game isn't over
    //     //then restart the drop process
    //     clearInterval(dropTimer);
    //     //top row doesn't already have pieces
    //     if ($.inArray(2, stacked[0]) == -1 ){
    //       start();

    //     } else {

    //       //game over
    //       clearInterval(dropTimer);

    //     }

    //   } else {

    //     //delete block current location
    //     blockEmpty(blockY, blockX , 'down');

    //     //create new coordinates
    //     blockShift('down');

    //     //move block to new coordinates
    //     blockHighlight(blockY, blockX,'down');
    //   }

    // }, speed);
  }



  start();



})
