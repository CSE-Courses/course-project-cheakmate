/*@Author: Alam & Alex & Kat & Kevin & Richard*/
var board; /*2-D array keeping image sources for board*/
var moves; /*Keeps track of possible moves for a selected chess piece*/

var first = ""; /*Keeps track of first img to be moved*/
var second = ""; /*Keeps track of second img to be moved*/

/*@Author: Alex*/
/*@Editor: Kat*/
/*Initializes the chess board*/
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

  /*Set up Queens*/
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

/*@Author: Alam*/
/*@Editor: Alex*/
/*@Author: Kat*/
/*Reads the 2-D array and changes the image source accoring to its image id*/
function populate(){
  var num;
  for(var i = 0; i < board.length; i++){
    for(var j = 0; j < board[i].length; j++){
      num = "" + i + j;
      document.getElementById(num).src = board[i][j];
    }
  }
}

/*@Author: Alam*/
/*Exits the game and returns to main menu*/
function exit(){
  if (confirm("Are you sure you want to leave the game?")) {
    window.location.href = "index.html";
  }
}

/*@Author: Kat*/
/*Resets image selection and moves array*/
function clearMoves(){
  first = "";
  second = "";
  moves = new Array();
}

/*@Author: Kat*/
/*Changes border color of image
  Happens when the image is selected
  Happens when possible moves are shown*/
/*@Param string imageId is the location of the image*/
/*@Param string color is the color selected*/
function changeBorderColor(imageId, color){
  document.getElementById(imageId).style.border = "3px solid " + color;
}

/*@Author: Kat*/
/*Resets border color of all images
  Happens when the image selected is changed
  Happens when turn is over*/
function resetBorderColor(){
  var num;
  for(var i = 0; i < board.length; i++){
    for(var j = 0; j < board[i].length; j++){
      num = "" + i + j;
      document.getElementById(num).style.border = "3px solid black";
    }
  }
}

/*@Author: Kat*/
/*@Editor: Kevin*/
/*@Editor: Richard*/
/*Each image onclick calls for the function to run game
  This works by
  Checking the type of chess piece
  Finding the possible moves of the chess piece
  Moving the chess piece*/
/*@Param string imageId is the location of the image*/
function runGame(imageId){
  resetBorderColor();
  var r = parseInt(imageId.substring(0,1));
  var c = parseInt(imageId.substring(1));

  if(!isEmptyTile(r, c)){
    changeBorderColor(imageId, "#33cccc");
  }

  if(first == ""){
    if(isPawn(r, c)){
      first = imageId;
      showPossiblePawnMoves(r, c);
    }

    /* TODO:
    //Checks if it is a Rook here
      //If it is, show possible moves*/
    if(isRook(r, c)){
    	first = imageId;
	    showPossibleRookMoves(r, c);
    }

    /* TODO:
    //Checks if it is a Knights here
      //If it is, show possible moves*/

    /* TODO:
    //Checks if it is a Bishops here
      //If it is, show possible moves*/
    if(isBishop(r, c)){
		  first = imageId;
		  showPossibleBishopMoves(r,c);
    }

    /* TODO:
    //Checks if it is a King here
      //If it is, show possible moves*/
    if(isKing(r, c)){
		  first = imageId;
		  showPossibleKingMoves(r,c);
	  }

    /* TODO:
    //Checks if it is a Queen here
      //If it is, show possible moves*/
  }
  else if (isInMoves(imageId)){
    second = imageId;
    moveChessPiece(first, second);
    clearMoves();
  }
  else {
    first = "";
    runGame(imageId);
  }
}

/*@Author: Kat*/
/*Checks if a tile has a chess piece*/
/*@Param int r is the number value for row*/
/*@Param int c is the number value for column*/
function isEmptyTile(r, c){
  if(board[r][c].includes("l.png") || board[r][c].includes("d.png")){
    return true;
  }
  else {
    return false;
  }
}

/*@Author: Kat*/
/*Checks if a tile is a pawn*/
/*@Param int r is the number value for row*/
/*@Param int c is the number value for column*/
function isPawn(r, c){
  if(board[r][c].includes("pb") || board[r][c].includes("pw")){
    return true;
  }
  else {
    return false;
  }
}

/*@Author: Kevin*/
/*Checks if a tile is a rook*/
/*@Param int r is the number value for row*/
/*@Param int c is the number value for column*/
function isRook(r, c){
	if(board[r][c].includes("ob") || board[r][c].includes("ow")){
		return true;
	}
	else {
		return false;
	}
}

/*@Author: Richard*/
/*Checks if a tile is a bihop*/
/*@Param int r is the number value for row*/
/*@Param int c is the number value for column*/
function isBishop(r, c){
	if(board[r][c].includes("hb") || board[r][c].includes("hw")){
		return true;
	}
	else{
		return false;
	}
}

/*@Author: Richard*/
/*Checks if a tile is a king*/
/*@Param int r is the number value for row*/
/*@Param int c is the number value for column*/
function isKing(r, c){
	if(board[r][c].includes("gb") || board[r][c].includes("gw")){
		return true;
	}
	else{
		return false;
	}
}

/*@Author: Kat*/
/*Checks if the second tile || chess piece is in the listed possible moves of the first chess piece*/
/*@Param string imageId is the location of the image*/
function isInMoves(imageId){
  for(var i = 0; i < moves.length; i++){
    if(moves[i] == imageId){
      return true;
    }
  }
  return false;
}

/*@Author: Kat*/
/*Shows possible moves for pawn*/
/*Conditions are made in order and according to the following rules
  Rule 1 : Pawns can only move forward one square at a time
  Rule 1.5 : Pawns can not move backwards
  Rule 2 : Pawns can move forward two squares for their very first move
  Rule 2.5 : There must be no chess pieces in between the two squares
  Rule 3 : Pawns can only capture one square diagonally in front of them*/
/*@Param int r is the number value for row*/
/*@Param int c is the number value for column*/
function showPossiblePawnMoves(r, c){
  var num;
  moves = new Array(4);
  for(var i = 0; i < moves.length; i++){
    moves[i] = "";
  }

  if(board[r][c].includes("pw")){
    if(r - 1 >= 0 && (board[r - 1][c].includes("l.png") || board[r - 1][c].includes("d.png"))){
      num = "" + (r - 1) + c;
      changeBorderColor(num, "#33cccc");
      moves[0] = num;
    }
    if(r == 8 && (c >= 1 || c <= 8) ){
      if((board[r - 1][c].includes("l.png") || board[r - 1][c].includes("d.png"))){
        if(r - 2 >= 0 && (board[r - 2][c].includes("l.png") || board[r - 2][c].includes("d.png"))){
          num = "" + (r - 2) + c;
          changeBorderColor(num, "#33cccc");
          moves[1] = num;
        }
      }
    }
    if(r - 1 >= 0 && c - 1 >= 0){
      num = "" + (r - 1) + (c - 1);
      if(!(board[r - 1][c - 1].includes("l.png")) && !(board[r - 1][c - 1].includes("d.png")) && !(board[r - 1][c - 1].includes("w.png"))){
        changeBorderColor(num, "#ff5050");
        moves[2] = num;
      }
    }
    if(r - 1 >= 0 && c + 1 <= 9){
      num = "" + (r - 1) + (c + 1);
      if(!(board[r - 1][c + 1].includes("l.png")) && !(board[r - 1][c + 1].includes("d.png")) && !(board[r - 1][c + 1].includes("w.png"))){
        changeBorderColor(num, "#ff5050");
        moves[3] = num;
      }
    }
  }

  if(board[r][c].includes("pb")){
    if(r + 1 <= 9 && (board[r + 1][c].includes("l.png") || board[r + 1][c].includes("d.png"))){
      num = "" + (r + 1) + c;
      changeBorderColor(num, "#33cccc");
      moves[0] = num;
    }
    if(r == 1 && (c >= 1 || c <= 8) ){
      if((board[r + 1][c].includes("l.png") || board[r + 1][c].includes("d.png"))){
        if(r + 2 <= 9 && (board[r + 2][c].includes("l.png") || board[r + 2][c].includes("d.png"))){
          num = "" + (r + 2) + c;
          changeBorderColor(num, "#33cccc");
          moves[1] = num;
        }
      }
    }
    if(r + 1 <= 9 && c + 1 <= 9){
      num = "" + (r + 1) + (c + 1);
      if(!(board[r + 1][c + 1].includes("l.png")) && !(board[r + 1][c + 1].includes("d.png")) && !(board[r + 1][c + 1].includes("b.png"))){
        changeBorderColor(num, "#ff5050");
        moves[2] = num;
      }
    }
    if(r + 1 <= 9 && c - 1 >= 0){
      num = "" + (r + 1) + (c - 1);
      if(!(board[r + 1][c - 1].includes("l.png")) && !(board[r + 1][c - 1].includes("d.png")) && !(board[r + 1][c - 1].includes("b.png"))){
        changeBorderColor(num, "#ff5050");
        moves[3] = num;
      }
    }
  }
}

/*@Author: Kevin*/
/*Shows possible moves for rook*/
/*@Param int r is the number value for row*/
/*@Param int c is the number value for column*/
function showPossibleRookMoves(r, c){
	var num;
	var movesIndex = 0;

	moves = new Array(18);/*The most possible moves rook can have*/
	 for(var i = 0; i < moves.length; i++){
		 moves[i] = "";
	 }

	/*Moving Rook upwards*/
	for(var up = r; up >= 0; up--){
		if(board[r][c].includes("w.png")){
			/*If the piece is white it should check if there are any
			 * black pieces and should be highlighted red*/
			if(up-1 >= 0){
				if(board[up-1][c].includes("w.png")){
					break;
				}else if(board[up-1][c].includes("b.png")){
					num = "" + (up-1) + c;
					changeBorderColor(num, "#ff5050");

					moves[movesIndex] = num;
					movesIndex++;
					break;
				}else{
					num = "" + (up-1) + c;
					changeBorderColor(num, "#33cccc");

					moves[movesIndex] = num;
					movesIndex++;
				}
			}
		}
		if(board[r][c].includes("b.png")){
			/*If the piece is white it should check if there are any
			 * black pieces and should be highlighted red*/
			if(up-1 >= 0){
				if(board[up-1][c].includes("b.png")){
					break;
				}else if(board[up-1][c].includes("w.png")){
					num = "" + (up-1) + c;
					changeBorderColor(num, "#ff5050");

					moves[movesIndex] = num;
					movesIndex++;
					break;
				}else{
					num = "" + (up-1) + c;
					changeBorderColor(num, "#33cccc");

					moves[movesIndex] = num;
					movesIndex++;
				}
			}
		}
	}

	/*Moving Rook downwards*/
	for(var down = r; down <= 9; down++){
		if(board[r][c].includes("w.png")){
			/*If the piece is white it should check if there are any
			 * black pieces and should be highlighted red*/
			if(down+1 <= 9){
				if(board[down+1][c].includes("w.png")){
					break;
				}else if(board[down+1][c].includes("b.png")){
					num = "" + (down+1) + c;
					changeBorderColor(num, "#ff5050");

					moves[movesIndex] = num;
					movesIndex++;
					break;
				}else{
					num = "" + (down+1) + c;
					changeBorderColor(num, "#33cccc");

					moves[movesIndex] = num;
					movesIndex++;
				}
			}
		}
		if(board[r][c].includes("b.png")){
			/*If the piece is white it should check if there are any
			 * black pieces and should be highlighted red*/
			if(down+1 <= 9){
				if(board[down+1][c].includes("b.png")){
					break;
				}else if(board[down+1][c].includes("w.png")){
					num = "" + (down+1) + c;
					changeBorderColor(num, "#ff5050");

					moves[movesIndex] = num;
					movesIndex++;
					break;
				}else{
					num = "" + (down+1) + c;
					changeBorderColor(num, "#33cccc");

					moves[movesIndex] = num;
					movesIndex++;
				}
			}
		}
	}
	/*Moving Rook left*/
	for(var left = c; left >= 0; left--){
		if(board[r][c].includes("w.png")){
			/*If the piece is white it should check if there are any
			 * black pieces and should be highlighted red*/
			if(left-1 >= 0){
				if(board[r][left -1].includes("w.png")){
					break;
				}else if(board[r][left-1].includes("b.png")){
					num = "" + r + (left-1);
					changeBorderColor(num, "#ff5050");

					moves[movesIndex] = num;
					movesIndex++;
					break;
				}else{
					num = "" + r + (left-1);
					changeBorderColor(num, "#33cccc");

					moves[movesIndex] = num;
					movesIndex++;
				}
			}
		}
		if(board[r][c].includes("b.png")){
			/*If the piece is white it should check if there are any
			 * black pieces and should be highlighted red*/
			if(left-1 >= 0){
				if(board[r][left -1].includes("b.png")){
					break;
				}else if(board[r][left-1].includes("w.png")){
					num = "" + r + (left-1);
					changeBorderColor(num, "#ff5050");

					moves[movesIndex] = num;
					movesIndex++;
					break;
				}else{
					num = "" + r + (left-1);
					changeBorderColor(num, "#33cccc");

					moves[movesIndex] = num;
					movesIndex++;
				}
			}
		}
	}

	/*Moving Rook right*/
	for(var right = c; right <= 9; right++){
		if(board[r][c].includes("w.png")){
			/*If the piece is white it should check if there are any
			 * black pieces and should be highlighted red*/
			if (right+1 <= 9){
				if(board[r][right+1].includes("w.png")){
					break;
				}else if(board[r][right+1].includes("b.png")){
					num = "" + r + (right+1);
					changeBorderColor(num, "#ff5050");

					moves[movesIndex] = num;
					movesIndex++;
					break;
				}else{
					num = "" + r + (right+1);
					changeBorderColor(num, "#33cccc");

					moves[movesIndex] = num;
					movesIndex++;
				}
			}
		}
		if(board[r][c].includes("b.png")){
			/*If the piece is white it should check if there are any
			 * black pieces and should be highlighted red*/
			if (right+1 <= 9){
				if(board[r][right+1].includes("b.png")){
					break;
				}else if(board[r][right+1].includes("w.png")){
					num = "" + r + (right+1);
					changeBorderColor(num, "#ff5050");

					moves[movesIndex] = num;
					movesIndex++;
					break;
				}else{
					num = "" + r + (right+1);
					changeBorderColor(num, "#33cccc");

					moves[movesIndex] = num;
					movesIndex++;
				}
			}
		}
	}
}

/*@Author: Richard*/
/*Shows possible moves for bishop*/
/*@Param int r is the number value for row*/
/*@Param int c is the number value for column*/
function showPossibleBishopMoves(r, c){
	var num;
	var rw = r;
	var cl = c;
	moves = new Array();
	if(board[r][c].includes("hw")){
		/*up left movement */
		for(i=rw-1, j=cl-1; i>-1 && j>-1; i--, j--){
			/* window.alert(i + " " + j); */
			if(!isEmptyTile(i,j)){
				if(board[i][j].includes("b.png")){
					num = "" + i + j;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + i + j;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
		/* up right movement */
		for(i=rw-1, j=cl+1; i>-1 && j<10; i--, j++){
			/* window.alert(i + " " + j); */
			if(!isEmptyTile(i,j)){
				if(board[i][j].includes("b.png")){
					num = "" + i + j;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + i + j;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
		/* down left movement */
		for(i=rw+1, j=cl-1; i<10 && j>-1; i++, j--){
			/* window.alert(i + " " + j); */
			if(!isEmptyTile(i,j)){
				if(board[i][j].includes("b.png")){
					num = "" + i + j;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + i + j;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
		/* down right movement */
		for(i=rw+1, j=cl+1; i>-1 && j<10; i++, j++){
			/* window.alert(i + " " + j); */
			if(!isEmptyTile(i,j)){
				if(board[i][j].includes("b.png")){
					num = "" + i + j;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + i + j;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
  }
  if(board[r][c].includes("hb")){
		/*up left movement */
		for(i=rw-1, j=cl-1; i>-1 && j>-1; i--, j--){
			/* window.alert(i + " " + j); */
			if(!isEmptyTile(i,j)){
				if(board[i][j].includes("w.png")){
					num = "" + i + j;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + i + j;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
		/* up right movement */
		for(i=rw-1, j=cl+1; i>-1 && j<10; i--, j++){
			/* window.alert(i + " " + j); */
			if(!isEmptyTile(i,j)){
				if(board[i][j].includes("w.png")){
					num = "" + i + j;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + i + j;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
		/* down left movement */
		for(i=rw+1, j=cl-1; i<10 && j>-1; i++, j--){
			/* window.alert(i + " " + j); */
			if(!isEmptyTile(i,j)){
				if(board[i][j].includes("w.png")){
					num = "" + i + j;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + i + j;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
		/* down right movement */
		for(i=rw+1, j=cl+1; i>-1 && j<10; i++, j++){
			/* window.alert(i + " " + j); */
			if(!isEmptyTile(i,j)){
				if(board[i][j].includes("w.png")){
					num = "" + i + j;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + i + j;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
	}
}

/*@Author: Richard*/
/*Shows possible moves for king*/
/* Conditions for king's movement
1. Kings can only move one space
2. Kings can go in all 8 directions
3. Kings can capture any opposite colored piece if in movement range
	***not implimented yet***
4. Kings cannot move to a tile that causes a check
5. Kings can do a castle with rook
6. */
/*@Param int r is the number value for row*/
/*@Param int c is the number value for column*/
function showPossibleKingMoves(r, c){
var num;
/*since it can go in 8 directions with 8 possible captures*/
moves = new Array(16);
/*this populates the moves array with empty strings*/
for(var i = 0; i < moves.length; i++){
	moves[i] = "";
}

if(board[r][c].includes("gw")){
	/*going up*/
	if(r - 1 >= 0 && (board[r - 1][c].includes("l.png") || board[r - 1][c].includes("d.png"))){
  		num = "" + (r - 1) + c;
  		changeBorderColor(num, "#33cccc");
  		moves[0] = num;
	}
	/*going down*/
	if(r + 1 <= 9 && (board[r + 1][c].includes("l.png") || board[r + 1][c].includes("d.png"))){
		num = "" + (r + 1) + c;
		changeBorderColor(num, "#33cccc");
		moves[1] = num;
	}
	/*going left*/
	if(c - 1 >= 0 && (board[r][c - 1].includes("l.png") || board[r][c - 1].includes("d.png"))){
		num = "" + r + (c - 1);
		changeBorderColor(num, "#33cccc");
		moves[2] = num;
	}
	/*going down*/
	if(c + 1 <= 9 && (board[r][c + 1].includes("l.png") || board[r][c + 1].includes("d.png"))){
		num = "" + r + (c + 1);
		changeBorderColor(num, "#33cccc");
		moves[3] = num;
	}
	/*going up left*/
	if((r - 1 >=0 && c - 1 >= 0) && (board[r - 1][c - 1].includes("l.png") || board[r - 1][c - 1].includes("d.png"))){
		num = "" + (r - 1) + (c - 1);
		changeBorderColor(num, "#33cccc");
		moves[4] = num;
	}
	/*going up right*/
	if((r - 1 >=0 && c + 1 <= 9) && (board[r - 1][c + 1].includes("l.png") || board[r - 1][c + 1].includes("d.png"))){
		num = "" + (r - 1) + (c + 1);
		changeBorderColor(num, "#33cccc");
		moves[5] = num;
	}
	/*going down left*/
	if((r + 1 <=9 && c - 1 >= 0) && (board[r + 1][c - 1].includes("l.png") || board[r + 1][c - 1].includes("d.png"))){
		num = "" + (r + 1) + (c - 1);
		changeBorderColor(num, "#33cccc");
		moves[6] = num;
	}
	/*going down right*/
	if((r + 1 <=9 && c + 1 >= 0) && (board[r + 1][c + 1].includes("l.png") || board[r + 1][c + 1].includes("d.png"))){
		num = "" + (r + 1) + (c + 1);
		changeBorderColor(num, "#33cccc");
		moves[7] = num;
	}

	/*capture up*/
	if(r - 1 >= 0){
		num = "" + (r - 1) + c;
		if(!(board[r - 1][c].includes("l.png")) && !(board[r - 1][c].includes("d.png")) && !(board[r - 1][c].includes("w.png"))){
			changeBorderColor(num, "#ff5050");
    		moves[8] = num;
		}
	}
	/*capture down*/
	if(r + 1 <= 9){
		num = "" + (r + 1) + c;
		if(!(board[r + 1][c].includes("l.png")) && !(board[r + 1][c].includes("d.png")) && !(board[r + 1][c].includes("w.png"))){
			changeBorderColor(num, "#ff5050");
    		moves[9] = num;
		}
	}
	/*capture left*/
	if(c - 1 >= 0){
		num = "" + r + (c - 1);
		if(!(board[r][c - 1].includes("l.png")) && !(board[r][c - 1].includes("d.png")) && !(board[r][c - 1].includes("w.png"))){
			changeBorderColor(num, "#ff5050");
    		moves[10] = num;
		}
	}
	/*capture right*/
	if(c + 1 <= 9){
		num = "" + r + (c + 1);
		if(!(board[r][c + 1].includes("l.png")) && !(board[r][c + 1].includes("d.png")) && !(board[r][c + 1].includes("w.png"))){
			changeBorderColor(num, "#ff5050");
    		moves[11] = num;
		}
	}
	/*capture up left*/
	if(r - 1 >= 0 && c - 1 >= 0){
		num = "" + (r - 1) + (c - 1);
		if(!(board[r - 1][c - 1].includes("l.png")) && !(board[r - 1][c - 1].includes("d.png")) && !(board[r - 1][c - 1].includes("w.png"))){
			changeBorderColor(num, "#ff5050");
    		moves[12] = num;
		}
	}
	/*capture down left*/
	if(r + 1 >= 0 && c - 1 >= 0){
		num = "" + (r + 1) + (c - 1);
		if(!(board[r + 1][c - 1].includes("l.png")) && !(board[r + 1][c - 1].includes("d.png")) && !(board[r + 1][c - 1].includes("w.png"))){
			changeBorderColor(num, "#ff5050");
    		moves[13] = num;
		}
	}
	/*capture up right*/
	if(r + 1 <= 9 && c + 1 <= 9){
		num = "" + (r + 1) + (c + 1);
		if(!(board[r + 1][c + 1].includes("l.png")) && !(board[r + 1][c + 1].includes("d.png")) && !(board[r + 1][c + 1].includes("w.png"))){
			changeBorderColor(num, "#ff5050");
    		moves[14] = num;
		}
	}
	/*capture down right*/
	if(r - 1 >= 0 && c + 1 <= 9){
		num = "" + (r - 1) + (c + 1);
		if(!(board[r - 1][c + 1].includes("l.png")) && !(board[r - 1][c + 1].includes("d.png")) && !(board[r - 1][c + 1].includes("w.png"))){
			changeBorderColor(num, "#ff5050");
    		moves[15] = num;
		}
	}
}
if(board[r][c].includes("gb")){
	/*going up*/
	if(r - 1 >= 0 && (board[r - 1][c].includes("l.png") || board[r - 1][c].includes("d.png"))){
  		num = "" + (r - 1) + c;
  		changeBorderColor(num, "#33cccc");
  		moves[0] = num;
	}
	/*going down*/
	if(r + 1 <= 9 && (board[r + 1][c].includes("l.png") || board[r + 1][c].includes("d.png"))){
		num = "" + (r + 1) + c;
		changeBorderColor(num, "#33cccc");
		moves[1] = num;
	}
	/*going left*/
	if(c - 1 >= 0 && (board[r][c - 1].includes("l.png") || board[r][c - 1].includes("d.png"))){
		num = "" + r + (c - 1);
		changeBorderColor(num, "#33cccc");
		moves[2] = num;
	}
	/*going down*/
	if(c + 1 <= 9 && (board[r][c + 1].includes("l.png") || board[r][c + 1].includes("d.png"))){
		num = "" + r + (c + 1);
		changeBorderColor(num, "#33cccc");
		moves[3] = num;
	}
	/*going up left*/
	if((r - 1 >=0 && c - 1 >= 0) && (board[r - 1][c - 1].includes("l.png") || board[r - 1][c - 1].includes("d.png"))){
		num = "" + (r - 1) + (c - 1);
		changeBorderColor(num, "#33cccc");
		moves[4] = num;
	}
	/*going up right*/
	if((r - 1 >=0 && c + 1 <= 9) && (board[r - 1][c + 1].includes("l.png") || board[r - 1][c + 1].includes("d.png"))){
		num = "" + (r - 1) + (c + 1);
		changeBorderColor(num, "#33cccc");
		moves[5] = num;
	}
	/*going down left*/
	if((r + 1 <=9 && c - 1 >= 0) && (board[r + 1][c - 1].includes("l.png") || board[r + 1][c - 1].includes("d.png"))){
		num = "" + (r + 1) + (c - 1);
		changeBorderColor(num, "#33cccc");
		moves[6] = num;
	}
	/*going down right*/
	if((r + 1 <=9 && c + 1 >= 0) && (board[r + 1][c + 1].includes("l.png") || board[r + 1][c + 1].includes("d.png"))){
		num = "" + (r + 1) + (c + 1);
		changeBorderColor(num, "#33cccc");
		moves[7] = num;
	}

	/*capture up*/
	if(r - 1 >= 0){
		num = "" + (r - 1) + c;
		if(!(board[r - 1][c].includes("l.png")) && !(board[r - 1][c].includes("d.png")) && !(board[r - 1][c].includes("b.png"))){
			changeBorderColor(num, "#ff5050");
    		moves[8] = num;
		}
	}
	/*capture down*/
	if(r + 1 <= 9){
		num = "" + (r + 1) + c;
		if(!(board[r + 1][c].includes("l.png")) && !(board[r + 1][c].includes("d.png")) && !(board[r + 1][c].includes("b.png"))){
			changeBorderColor(num, "#ff5050");
    		moves[9] = num;
		}
	}
	/*capture left*/
	if(c - 1 >= 0){
		num = "" + r + (c - 1);
		if(!(board[r][c - 1].includes("l.png")) && !(board[r][c - 1].includes("d.png")) && !(board[r][c - 1].includes("b.png"))){
			changeBorderColor(num, "#ff5050");
    		moves[10] = num;
		}
	}
	/*capture right*/
	if(c + 1 <= 9){
		num = "" + r + (c + 1);
		if(!(board[r][c + 1].includes("l.png")) && !(board[r][c + 1].includes("d.png")) && !(board[r][c + 1].includes("b.png"))){
			changeBorderColor(num, "#ff5050");
    		moves[11] = num;
		}
	}
	/*capture up left*/
	if(r - 1 >= 0 && c - 1 >= 0){
		num = "" + (r - 1) + (c - 1);
		if(!(board[r - 1][c - 1].includes("l.png")) && !(board[r - 1][c - 1].includes("d.png")) && !(board[r - 1][c - 1].includes("b.png"))){
			changeBorderColor(num, "#ff5050");
    		moves[12] = num;
		}
	}
	/*capture down left*/
	if(r + 1 >= 0 && c - 1 >= 0){
		num = "" + (r + 1) + (c - 1);
		if(!(board[r + 1][c - 1].includes("l.png")) && !(board[r + 1][c - 1].includes("d.png")) && !(board[r + 1][c - 1].includes("b.png"))){
			changeBorderColor(num, "#ff5050");
    		moves[13] = num;
		}
	}
	/*capture up right*/
	if(r + 1 <= 9 && c + 1 <= 9){
		num = "" + (r + 1) + (c + 1);
		if(!(board[r + 1][c + 1].includes("l.png")) && !(board[r + 1][c + 1].includes("d.png")) && !(board[r + 1][c + 1].includes("b.png"))){
			changeBorderColor(num, "#ff5050");
    		moves[14] = num;
		}
	}
	/*capture down right*/
	if(r - 1 >= 0 && c + 1 <= 9){
		num = "" + (r - 1) + (c + 1);
		if(!(board[r - 1][c + 1].includes("l.png")) && !(board[r - 1][c + 1].includes("d.png")) && !(board[r - 1][c + 1].includes("b.png"))){
			changeBorderColor(num, "#ff5050");
    		moves[15] = num;
		}
	}
}
}

/*@Author: Kat*/
/*Moves selected chess piece to selected location*/
/*@Param string first is the source of the first selected tile*/
/*@Param string second is the source of the second selected tile*/
function moveChessPiece(first, second){
  var r1 = parseInt(first.substring(0,1));
  var c1 = parseInt(first.substring(1));
  src1 = board[r1][c1];

  var r2 = parseInt(second.substring(0,1));
  var c2 = parseInt(second.substring(1));
  src2 = board[r2][c2];

  board[r1][c1] = src1.substring(0, 16) + ".png";
  board[r2][c2] = src2.substring(0, 16) + src1.substring(16);

  populate();
}
