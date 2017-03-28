
$(document).ready(function(){
  var blockY = 0, blockX = 5;
  var boardWidth = 10, boardHeight = 20;
  var score = 0;
  var spaces, droptimer, currentBlock, currentColor;
  var currentShape;
  var speed = 1500;
  currentRotation = 0;
  var bagOfBlocks = [];
  var bagOfColors = [];

  var themeMusic = new Audio('theme.mp3');


  stacked = [
  [3,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,0,3],
  [3,3,3,3,3,3,3,3,3,3,3,3]
  ];

  var colors = [
  'red',
  'green',
  'magenta',
  'yellow',
  'orange',
  'cyan',
  'blue'];

  var shapes = [
    // I
  [[[0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]],
   [[0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0]]],
  // T
  [[[0,0,0,0],
    [1,1,1,0],
    [0,1,0,0],
    [0,0,0,0]],
   [[0,1,0,0],
    [1,1,0,0],
    [0,1,0,0],
    [0,0,0,0]],
   [[0,1,0,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]],
   [[0,1,0,0],
    [0,1,1,0],
    [0,1,0,0],
    [0,0,0,0]]],
  // L
  [[[0,0,0,0],
    [1,1,1,0],
    [1,0,0,0],
    [0,0,0,0]],
   [[1,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,0,0,0]],
   [[0,0,1,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]],
   [[0,1,0,0],
    [0,1,0,0],
    [0,1,1,0],
    [0,0,0,0]]],
  // J
  [[[1,0,0,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]],
   [[0,1,1,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,0,0,0]],
   [[0,0,0,0],
    [1,1,1,0],
    [0,0,1,0],
    [0,0,0,0]],
   [[0,1,0,0],
    [0,1,0,0],
    [1,1,0,0],
    [0,0,0,0]]],
  // Z
  [[[0,0,0,0],
    [1,1,0,0],
    [0,1,1,0],
    [0,0,0,0]],
   [[0,0,1,0],
    [0,1,1,0],
    [0,1,0,0],
    [0,0,0,0]]],
  // S
  [[[0,0,0,0],
    [0,1,1,0],
    [1,1,0,0],
    [0,0,0,0]],
   [[0,1,0,0],
    [0,1,1,0],
    [0,0,1,0],
    [0,0,0,0]]],
  // O
  [[[0,1,1,0],
    [0,1,1,0],
    [0,0,0,0],
    [0,0,0,0]]]];




  //Build the board
  function buildBoard() {
    $('#playing-field').html('');
    spaces = [];
    var k;
    for (var i = 0; i < stacked.length-1; i++) {
      spaces[i] = []
      $('#playing-field').append("<tr id='" + i + "''></tr>")
      for (var j = 1; j< stacked[i].length-1; j++) {
          var coordinate = i + '-' + j;
          $('#' + i).append("<td id='" + coordinate + "' class='empty'></td>");
            spaces[i][j] = $(['#' + coordinate].join(''));
            if(stacked[i][j] === 1){
              blockColor(i, j, 'darkgray' );
            } else if (stacked[i][j] === 0){
              blockColor(i, j, 'white' );
            }
      }
    }
  }



  test = function spacesGet() {
    return spaces;
  }

  function blockColor(y, x, color){
    console.log('coords: ', y, x, color);
    console.log(stacked[y]);
    spaces[y][x].css('background-color', color)
  };

  //make empty a block that was just exited
  function blockEmpty(y, x, direction){
    for( var i=0; i < currentBlock.length ; i++){
      for (var j=0; j < currentBlock[i].length; j++){
        if(currentBlock[i][j]){
        stacked[y-i][x+j] = 0
        blockColor(y-i, x+j, 'white');
        }
      }
    }
  };

  //highlighting of given coordinates
  function blockHighlight(y, x, direction) {
    if(direction === 'rotate'){
      blockRotate();
    }
    for( var i=0; i < 4; i++){
      for (var j=0; j < 4; j++){
        if(currentBlock[i][j]){
        stacked[y-i][x+j] = 2;
        blockColor(y-i, x+j, currentColor);

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
    };
  }

  //this is just the check ahead for collision detection,
  //without actually changing anything
  function blockRotateDetect() {
    if(currentRotation === currentShape.length-1){
      return currentShape[0];
    } else  {
      return currentShape[currentRotation+1];
    }
  }

  //The actual rotation
  function blockRotate() {
    console.log('trying to rotate to shape: ', currentShape, ' rotation#: ', currentRotation);

    if(currentRotation === currentShape.length-1){
      currentRotation = 0;
    } else  {
      currentRotation++;
    }
    currentBlock = currentShape[currentRotation];
  }


  //all the steps to move the block, left, right, or down
  function blockMove(direction) {

    if (isGoingToCollide(direction) == false) {
      blockEmpty(blockY, blockX, direction);
      blockShift(direction);
      blockHighlight(blockY, blockX, direction);
    }


  };

  function touchdown(){
    console.log('blockX: ', blockX, 'blockY: ', blockY);
    for( var i=0; i < stacked.length-1 ; i++){
      for (var j=1; j < stacked[i].length-1; j++){
        if(stacked[i][j]){
        stacked[i][j] = 1
        blockColor(i, j, 'darkgray');
        }
      }
    }
    checkLines();
    newBlock();
    blockHighlight(blockY, blockX);
  }

  /*
   * Remove any full lines, replace with empty line on top,
   * and then rebuild the board based on the new array status
   */
  function checkLines(){
    var clearBoard = false;
    for(var i=0; i < stacked.length-1; i++){
      if ($.inArray(0, stacked[i]) == -1) {

        stacked.splice(i, 1);
        stacked.unshift([3,0,0,0,0,0,0,0,0,0,0,3])
        clearBoard = true;
        score += 100;
        $('#score').text(score);
        console.log('IM CLEARING LINES!');
      }
    }
    if (clearBoard === true) {
      buildBoard();
    }

  }

  /*
   * check for collision against pieces or walls
   * and return true if it's going to collide.
   * If it is going to collide and the direction is down,
   * call touchdown() to land the piece.
   */
  function isGoingToCollide(direction) {
    y = blockY;
    x = blockX;
    bottomRow = blockY;
    var collision = false;
    var block = currentBlock;
    var hitBottom = false;

    if (direction === 'rotate') {
      //if the move is to rotate, look ahead to see if its allowed
      block = blockRotateDetect();
    }

    for( var i=0; i < 4; i++){
      //console.log('current i value: ', i);
      for (var j=0; j < 4; j++){
        if(block[i][j]){
          if (direction === 'down' && (bottomRow === boardHeight || stacked[y+1-i][x+j] === 1 || stacked[y+1-i][x+j] === 3)){
            //console.log('im at the bottom row-- kickoff touchdown');
            hitBottom = true;
            collision = true;
          } else if (direction === 'left' && (x === 0 || stacked[y-i][x+j-1] === 1 ||stacked[y-i][x-1+j] === 3)){
            //console.log('Collision detected, abort!', 'Cannot move left!', stacked[y][x]);
            collision = true;
          } else if (direction === 'right' && (stacked[y-i][x+1+j] === 1 || stacked[y-i][x+1+j] === 3)){
            //console.log('Collision detected, abort!', 'Cannot move right!');
            collision = true;
          } else if (direction === 'rotate' && (stacked[y+i][x+j] === 1 || stacked[y+i][x+j] === 3)) {
            collision = true;
            //console.log('stacked coords: ' , i, j, 'val: ', stacked[y+i][x+j]);
          }
        }
      }
    }

    if (hitBottom === true) {
      touchdown();
    }
    return collision;
  };

$('html').keydown(function(e){
    switch(e.which){
      case 37:
        blockMove('left');
        //console.log('pushing the LEFT button')
        break;
      case 38:
        blockMove('rotate');
        //console.log('pushing the ROTATE button')
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

  /*
   * reestablish the X, Y coords at the starting spot.
   * if bagOfBlocks is empty repopulate with 10 blocks of
   * each and then randomize.
   * Reset the current block, color, and rotation
   */
  function newBlock(){
    blockY = 3;
    blockX = 3;

    //if we're outta blocks, restock
    if(bagOfBlocks.length === 0){
      for (var g=0; g<7; g++){
        for (var h=0; h<10; h++){
          bagOfColors.push(colors[g])
          bagOfBlocks.push(shapes[g]);
        }
      }  //Now get shufflin', fisher-yates style
      for (var i = bagOfBlocks.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = bagOfBlocks[i];
        var temp2 = bagOfColors[i];
        bagOfBlocks[i] = bagOfBlocks[j];
        bagOfColors[i] = bagOfColors[j];
        bagOfBlocks[j] = temp;
        bagOfColors[j] = temp2;
      }
    }
      currentRotation = 0;
      currentShape = bagOfBlocks.pop();
      currentColor = bagOfColors.pop();
      currentBlock = currentShape[currentRotation];
  }

  /*
  * The whole thing starts here.
  */
  function start(){
    if (!spaces) {
      buildBoard();
    }
    //make a new block and place it up top
    newBlock();
    blockHighlight(blockY, blockX);

    //start dropping blocks
    go();
  }

  /*
  * this turns on music and restarts drop timer, but does
  * not release a new block.  Should be used to resume from
  * Pause, not a full game restart.
  */
  function go(){
    //commenting this out so I don't kill myself
    //themeMusic.loop = true;
    //themeMusic.play();
    //themeMusic.playbackRate = 1;
    dropTimer = setInterval(function(){

      //if ($.inArray(2, stacked[0]) == -1 ) {
        blockMove('down');
       // }
      }, speed);
  }

  function stop(){
      clearInterval(dropTimer);
  }


  start();



})
