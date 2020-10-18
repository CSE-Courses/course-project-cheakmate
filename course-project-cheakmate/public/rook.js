/*@Author: Alam
@Editor : Alex & Kat & Kevin & Richard 
*/
var board; /*2-D array keeping image sources for board*/

function initialize(){
  /*Create a 10 x 10 board*/
  board = new Array(10);
  for(var i = 0; i < board.length; i++){
    board[i] = new Array(10);
  }

  /*Set up a 10 x 10 board*/

  /*Set up Rooks*/
  board[0][1] = "images/sprites/dob.png";
  board[0][8] = "images/sprites/lob.png";
  board[9][1] = "images/sprites/low.png";
  board[9][8] = "images/sprites/dow.png";

  /*Set up Knights*/
  board[0][2] = "images/sprites/lkb.png";
  board[0][7] = "images/sprites/dkb.png";
  board[9][2] = "images/sprites/dkw.png";
  board[9][7] = "images/sprites/lkw.png";

  /*Set up Bishops*/
  board[0][3] = "images/sprites/dhb.png";
  board[0][6] = "images/sprites/lhb.png";
  board[9][3] = "images/sprites/lhw.png";
  board[9][6] = "images/sprites/dhw.png";

  /*Set up Kings*/
  board[0][5] = "images/sprites/dgb.png";
  board[9][5] = "images/sprites/lgw.png";

  /*Set up Queens*/
  board[0][4] = "images/sprites/lqb.png";
  board[9][4] = "images/sprites/dqw.png";

  /*Set up Empty Tiles*/
  for(var i = 0; i < board.length; i++){
    for(var j = 0; j < board[i].length; j++){
      if(i % 2 == 0 && j == 0 && board[i][j] == null){
        board[i][j] = "images/sprites/l.png";
      }
      else if (i % 2 == 1 && j == 0 && board[i][j] == null){
        board[i][j] = "images/sprites/d.png";
      }

      if(i % 2 == 0 && j == 9 && board[i][j] == null){
        board[i][j] = "images/sprites/d.png";
      }
      else if (i % 2 == 1 && j == 9 && board[i][j] == null){
        board[i][j] = "images/sprites/l.png";
      }

      if(i >= 2 && i <= 7){
        if(i % 2 == 0 && j % 2 == 0 && board[i][j] == null){
          board[i][j] = "images/sprites/l.png";
        }
        else if (i % 2 == 0 && j % 2 == 1 && board[i][j] == null) {
          board[i][j] = "images/sprites/d.png";
        }
        if(i % 2 == 1 && j % 2 == 0 && board[i][j] == null){
          board[i][j] = "images/sprites/d.png";
        }
        else if (i % 2 == 1 && j % 2 == 1 && board[i][j] == null) {
          board[i][j] = "images/sprites/l.png";
        }
      }

      /*Set up Pawns*/
      if (i == 1) {
          if(j % 2 == 0 && board[i][j] == null){
            board[i][j] = "images/sprites/dpb.png";
          }
          else if (j % 2 == 1 && board[i][j] == null){
            board[i][j] = "images/sprites/lpb.png";
          }
      }
      else if (i == 8) {
        if(j % 2 == 0 && board[i][j] == null){
          board[i][j] = "images/sprites/lpw.png";
        }
        else if (j % 2 == 1 && board[i][j] == null){
          board[i][j] = "images/sprites/dpw.png";
        }
      }
    }
  }


  /*Display board*/
  populate();
}

/*Reads the 2-D array and changes the image source accoring to its image id */
function populate(){
  var num;
  for(var i = 0; i < board.length; i++){
    for(var j = 0; j < board[i].length; j++){
      num = "" + i + j;
      document.getElementById(num).src = board[i][j];
    }
  }
}

/*Exits the game and returns to main menu */
function exit(){
  if (confirm("Are you sure you want to leave the game?")) {
    window.location.href = "index.html";
  }
}

/*
Changes border color of image
Happens when the image is selected
Happens when possible moves are shown
*/
function changeBorderColor(imageId, color){
  document.getElementById(imageId).style.border = "3px solid " + color;
}

/*
Resets border color of all images
Happens when the image selected is changed
Happens when turn is over
*/
function resetBorderColor(){
  var num;
  for(var i = 0; i < board.length; i++){
    for(var j = 0; j < board[i].length; j++){
      num = "" + i + j;
      document.getElementById(num).style.border = "0px solid black";
    }
  }
}

/*
Each image onclick calls for the function to run game
This works by
Checking the type of chess piece
Finding the possible moves of the chess piece
Moving the chess piece\
*/
function runGame(imageId){
  resetBorderColor();
  var r = parseInt(imageId.substring(0,1));
  var c = parseInt(imageId.substring(1));

  if(!isEmptyTile(r, c)){
    changeBorderColor(imageId, "#006699");
  }

  if(isPawn(r, c)){
    showPossiblePawnMoves(r, c);
  }

  /* TODO:
  Checks if it is a Rook here
    If it is, show possible moves
      Make a move */
  
  if(isRook(r, c)){
	    showPossibleRookMoves(r, c);
  }
  
  /* TODO:
  Checks if it is a Knights here
    If it is, show possible moves
      Make a move */

  /* TODO:
  Checks if it is a Bishops here
    If it is, show possible moves
      Make a move */

  /* TODO:
  Checks if it is a King here
    If it is, show possible moves
      Make a move */

  /* TODO:
  Checks if it is a Queen here
    If it is, show possible moves
      Make a move */
}

function isEmptyTile(r, c){
  if(board[r][c].includes("l.png") || board[r][c].includes("d.png")){
    return true;
  }
  else {
    return false;
  }
}

function isPawn(r, c){
  if(board[r][c].includes("pb") || board[r][c].includes("pw")){
    return true;
  }
  else {
    return false;
  }
}

function isRook(r, c){
	if(board[r][c].includes("ob") || board[r][c].includes("ow")){
	    alert("I am " + board[r][c]);
		return true;
	}
	else {
		return false;
	}
}

/*Conditions are made in order and according to the following rules
Rule 1 : Pawns can only move forward one square at a time
Rule 1.5 : Pawns can not move backwards
Rule 2 : Pawns can move forward two squares for their very first move
Rule 2.5 : There must be no chess pieces in between the two squares
Rule 3 : Pawns can only capture one square diagonally in front of them
*/
function showPossiblePawnMoves(r, c){
  var num;

  if(board[r][c].includes("pw")){
    if(r - 1 >= 0 && (board[r - 1][c].includes("l.png") || board[r - 1][c].includes("d.png"))){
      num = "" + (r - 1) + c;
      changeBorderColor(num, "#006699");
    }
    if(r == 8 && (c >= 1 || c <= 8) ){
      if((board[r - 1][c].includes("l.png") || board[r - 1][c].includes("d.png"))){
        if(r - 2 >= 0 && (board[r - 2][c].includes("l.png") || board[r - 2][c].includes("d.png"))){
          num = "" + (r - 2) + c;
          changeBorderColor(num, "#006699");
        }
      }
    }
    if(r - 1 >= 0 && c - 1 >= 0){
      num = "" + (r - 1) + (c - 1);
      if(!(board[r - 1][c - 1].includes("l.png")) && !(board[r - 1][c - 1].includes("d.png"))){
        changeBorderColor(num, "#ff0000");
      }
    }
    if(r - 1 >= 0 && c + 1 <= 9){
      num = "" + (r - 1) + (c + 1);
      if(!(board[r - 1][c + 1].includes("l.png")) && !(board[r - 1][c + 1].includes("d.png"))){
        changeBorderColor(num, "#ff0000");
      }
    }
  }

  if(board[r][c].includes("pb")){
    if(r + 1 <= 9 && (board[r + 1][c].includes("l.png") || board[r + 1][c].includes("d.png"))){
      num = "" + (r + 1) + c;
      changeBorderColor(num, "#006699");
    }
    if(r == 1 && (c >= 1 || c <= 8) ){
      if((board[r + 1][c].includes("l.png") || board[r + 1][c].includes("d.png"))){
        if(r + 2 <= 9 && (board[r + 2][c].includes("l.png") || board[r + 2][c].includes("d.png"))){
          num = "" + (r + 2) + c;
          changeBorderColor(num, "#006699");
        }
      }
    }
    if(r + 1 <= 9 && c + 1 <= 9){
      num = "" + (r + 1) + (c + 1);
      if(!(board[r + 1][c + 1].includes("l.png")) && !(board[r + 1][c + 1].includes("d.png"))){
        changeBorderColor(num, "#ff0000");
      }
    }
    if(r + 1 <= 9 && c - 1 >= 0){
      num = "" + (r + 1) + (c - 1);
      if(!(board[r + 1][c - 1].includes("l.png")) && !(board[r + 1][c - 1].includes("d.png"))){
        changeBorderColor(num, "#ff0000");
      }
    }
  }
}
/*By Kevin*/
function showPossibleRookMoves(r, c){
	var num;
	/*Moving Rook upwards*/
	for(var up = r; up >= 0; up--){
		/*alert("My position is " + up + ", " + c);*/
		if(up >= 0 && (board[up][c].includes("l.png") || board[up][c].includes("d.png"))){
			num = "" + up + c;
			changeBorderColor(num, "#006699");
			
		}
		/*Only while you're white, pieces are the black pieces red*/
		if(board[up][c].includes("b.png") && board[r][c].includes("ow")){
			num = "" + up + c;
			changeBorderColor(num, "#ff0000");
		}
		/*Only while you're black, pieces are the white pieces red*/
		if(board[up][c].includes("w.png") && board[r][c].includes("ob")){
			num = "" + up + c;
			changeBorderColor(num, "#ff0000");
		}
	}
	/*Moving Rook downwards*/
	for(var down = r; down <= 9; down++){
		/*alert("My position is " + down + ", " + c);*/
		if(down <= 9 && (board[down][c].includes("l.png") || board[down][c].includes("d.png"))){
			num = "" + down + c;
			changeBorderColor(num, "#006699");
			
		}
		/*Only while you're white, pieces are the black pieces red*/
		if(board[down][c].includes("b.png") && board[r][c].includes("ow")){
			num = "" + down + c;
			changeBorderColor(num, "#ff0000");

		}
		/*Only while you're black, pieces are the white pieces red*/
		if(board[down][c].includes("w.png") && board[r][c].includes("ob")){
			num = "" + down + c;
			changeBorderColor(num, "#ff0000");

		}
	}
	/*Moving Rook left*/
	for(var left = c; left >= 0; left--){
		/*alert("My position is " + r + ", " + left);*/
		if(left >= 0 && (board[r][left].includes("l.png") || board[r][left].includes("d.png"))){
			num = "" + r + left;
			changeBorderColor(num, "#006699");
		}
		/*Only while you're white, pieces are the black pieces red*/
		if(board[r][left].includes("b.png") && board[r][c].includes("ow")){
			num = "" + r + left;
			changeBorderColor(num, "#ff0000");
		}
		/*Only while you're black, pieces are the white pieces red*/
		if(board[r][left].includes("w.png") && board[r][c].includes("ob")){
			num = "" + r + left;
			changeBorderColor(num, "#ff0000");
		}
	}
	/*Moving Rook right*/
	for(var right = c; right <= 9; right++){
		/*alert("My position is " + r + ", " + right);*/
		if(right <= 9 && (board[r][right].includes("l.png") || board[r][right].includes("d.png"))){
			num = "" + r + right;
			changeBorderColor(num, "#006699");
		}
		/*Only while you're white, pieces are the black pieces red*/
		if(board[r][right].includes("b.png") && board[r][c].includes("ow")){
			num = "" + r + right;
			changeBorderColor(num, "#ff0000");
		}
		/*Only while you're black, pieces are the white pieces red*/
		if(board[r][right].includes("w.png") && board[r][c].includes("ob")){
			num = "" + r + right;
			changeBorderColor(num, "#ff0000");
		}
	}

	
}

