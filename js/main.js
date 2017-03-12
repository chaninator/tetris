
$(document).ready(function(){
  var blockRow = 0;
  var blockCol = 5;


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


  //Build the board
  for (var i = 0; i< stacked.length; i++) {
    $('#playing-field').append("<tr id='" + i + "''></tr>")
    console.log(i);
    for (var j = 0; j< stacked[i].length; j++) {
      if (stacked[i][j] == 0) {
        var coordinate = i + '-' + j;
        $('#' + i).append("<td id='" + coordinate + "' class='empty'></td>");
      } else if (stacked[i][j] == 1) {
        var coordinate = i + '-' + j;
        $('#' + i).append("<td id='" + coordinate + "' class='stacked'></td>");
      }
    }
  }

  //make empty a block that was just exited
  function blockEmpty(direction){
    //if (direction === 'down')
    stacked[blockRow][blockCol] = 0;
    id = '#' + blockRow + '-' + blockCol;
    $(id).attr('class', 'empty');
    console.log('Im graying this bad boy out!', id);

  };

  //highlighting of given coordinates
  function blockHighlight(direction) {
    stacked[blockRow][blockCol] = 2;
    id = '#' + blockRow + '-' + blockCol;
    $(id).attr('class', 'stacked');
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
    if (isGoingToCollide(direction) == false) {
      blockEmpty(direction);
      blockShift(direction);
      console.log('block move is executing move to: ', blockRow, blockCol, direction);
      blockHighlight(direction);
    }


  };

  function isGoingToCollide(direction) {
    if (direction === 'down' && (blockRow === 19 || stacked[blockRow+1][blockCol] > 0 && blockRow <= stacked.length)){
      //console.log('Collision detected, abort!');
      return true;
    } else if (direction === 'left' && blockCol === 0){
      //console.log('Collision detected, abort!', 'Cannot move left!', blockRow);
      return true;
    } else if (direction === 'right' && blockCol === 9){
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
      case 39:
        blockMove('right');
        break;
      case 40:
        blockMove('down');
        break;
    }
  });

  function newBlock(){
    blockRow = 0;
    blockCol = 5;
  }

  function dropBlock(){
    console.log('Start of Drop Block');
  newBlock();
    blockHighlight(blockRow, blockCol);
    var dropTimer = setInterval(function(){
      //capture current location info


      //check for collisions, otherwise move the block
      console.log('row status: ', blockRow);
      console.log('Col status: ', blockCol);
      console.log('right before collision detection');
      if(isGoingToCollide('down') == true){

        //If the piece dropped, but the game isn't over
        //then restart the drop process
        clearInterval(dropTimer);
        console.log('Clear Interval Step')
        //top row doesn't already have pieces
        if ($.inArray(2, stacked[0]) == -1 ){
          console.log('before Drop Block')
          dropBlock();

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

    }, 1000);
  }



  dropBlock();



})
