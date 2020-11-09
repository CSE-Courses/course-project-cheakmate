/*@Author: Alam & Alex & Kat & Kevin & Richard*/
var player = ""; /*Keeps track of player*/
const WHITE = "WHITE"; /*Possible player value WHITE*/
const BLACK = "BLACK"; /*Possible Player value BLACK*/

var board; /*2-D array keeping image sources for board*/
var moves; /*Keeps track of possible moves for a selected chess piece by keeping track of string containing row and column*/

var firstPiece = ""; /*Keeps track of first img to be moved*/
var secondPiece = ""; /*Keeps track of second img to be moved*/

/*@Author: Alex*/
/*@Editor: Kat*/
/*Initializes the chess board*/
function initialize(){
  /*initialize turn to White*/
  setPlayer(WHITE);
  displayPlayer();

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

/*@Author: Alam*/
/*@Editor: Alex*/
/*@Editor: Kat*/
/*Reads the 2-D array and changes the image source accoring to its image id*/
function populate(){
  var num;
  for(var i = 0; i < board.length; i++){
    for(var j = 0; j < board[i].length; j++){
      num = "" + i + j;
      document.getElementById(num).src = board[i][j];
    }
  }

  resetBorderColor();
  setTurn();
}

/*@Author: Alam*/
/*Checks to see if the king was killed, if a king is missing it will trigger the endgame */
function checkKill(){
	wking = false;
	bking = false;
	for(var i = 0; i < board.length; i++){
		for(var j = 0; j < board[i].length; j++){
			if(board[i][j].includes("gw.png")){
				wking = true;
			}
			if(board[i][j].includes("gb.png")){
				bking = true;
			}
		}
	}
	if (!wking){
		callGame("white", "Black");
	}else if(!bking){
		callGame("black", "White");
	}	
}

/*@Author: Alam*/
/*Calls the winner of the game and ends the game*/
function callGame(loser, winner){
	endstatment = "The king of the " + loser + " team has been killed! " + winner + " team wins!"
	if (confirm(endstatment)) {
		window.location.href = "end.html";
	  }
}


/*@Author: Kat*/
/*Sets the current condition of the chess board for each turn
  If current player is white, enable white chess pieces and disable black chess pieces.
  If current player is black, enable black chess pieces and disable white chess pieces.*/
function setTurn(){
	checkKill();
  	if(getCurrentPlayer() == WHITE){
    	enablePieces(WHITE);
    	disablePieces(BLACK);
  	}
  	else if (getCurrentPlayer() == BLACK) {
    	enablePieces(BLACK);
    	disablePieces(WHITE);
  	}
}

/*@Author: Kat*/
/*Set the current player*/
/*@Param string p is the current player color (e.g. WHITE or BLACK)*/
function setPlayer(p){
  player = p;
}

/*@Author: Kat*/
/*Returns a string containing the current player (e.g. WHITE or BLACK)*/
function getCurrentPlayer(){
  return player;
}

/*@Author: Kat*/
/*Changes the current player*/
function changePlayer(){
  if(getCurrentPlayer() == WHITE){
    setPlayer(BLACK);
  }
  else if (getCurrentPlayer() == BLACK) {
    setPlayer(WHITE);
  }

  displayPlayer(player);
}

/*@Author: Kat*/
/*Displays the current player (e.g. WHITE or BLACK)*/
function displayPlayer(){
  document.getElementById("player").innerHTML = "Current Player: " + player;
}

/*@Author: Kat*/
/*Enables functionality of chess pieces depending on the player
  If current player is white, enable white chess pieces.
  If current player is black, enable black chess pieces.*/
/*@Param string p is the player's color for chess pieces that needs to be enabled*/
function enablePieces(p){
  var imgId = "";

  if(p == WHITE){
    for(var i = 0; i < board.length; i++){
      for(var j = 0; j < board[i].length; j++){
        var imgId = "" + i + j;
        if(board[i][j].includes("w.png")){
          document.getElementById(imgId).style.pointerEvents = "auto";
        }
      }
    }
  }

  if(p == BLACK){
    for(var i = 0; i < board.length; i++){
      for(var j = 0; j < board[i].length; j++){
        var imgId = "" + i + j;
        if(board[i][j].includes("b.png")){
          document.getElementById(imgId).style.pointerEvents = "auto";
        }
      }
    }
  }
}

/*@Author: Kat*/
/*Enables functionality of chess pieces that are capturable depending on the player
  If current player is white, enable capturable black chess pieces.
  If current player is black, enable capturable white chess pieces.*/
/*@Param string p is the player's color for chess pieces that needs to be enabled*/
function enableCapturePieces(){
  if(player == WHITE && moves != null){
    for(var k = 0; k < moves.length; k++){
      if(moves[k] != ""){
        var r = parseInt(moves[k].substring(0,1));
        var c = parseInt(moves[k].substring(1));
        if(board[r][c].includes("b.png")){
          document.getElementById(moves[k]).style.pointerEvents = "auto";
        }
      }
    }
  }

  if(player == BLACK && moves != null){
    for(var k = 0; k < moves.length; k++){
      if(moves[k] != ""){
        var r = parseInt(moves[k].substring(0,1));
        var c = parseInt(moves[k].substring(1));
        if(board[r][c].includes("w.png")){
          document.getElementById(moves[k]).style.pointerEvents = "auto";
        }
      }
    }
  }
}

/*@Author: Kat*/
/*Disables functionality of chess pieces depending on the player
  If current player is white, disable black chess pieces.
  If current player is black, disable white chess pieces.*/
/*@Param string p is the player's color for chess pieces that need to be disabled*/
function disablePieces(p){
  var imgId = "";

  if(p == WHITE){
    for(var i = 0; i < board.length; i++){
      for(var j = 0; j < board[i].length; j++){
        var imgId = "" + i + j;
        if(board[i][j].includes("w.png")){
          document.getElementById(imgId).style.pointerEvents = "none";
        }
      }
    }
  }

  if(p == BLACK){
    for(var i = 0; i < board.length; i++){
      for(var j = 0; j < board[i].length; j++){
        var imgId = "" + i + j;
        if(board[i][j].includes("b.png")){
          document.getElementById(imgId).style.pointerEvents = "none";
        }
      }
    }
  }
}

/*@Author: Kat*/
/*Disables functionality of chess pieces that were capturable depending on the player
  If current player is white, and selects another white piece, disable black chess pieces that were capturable for previous select.
  If current player is black, and selects another black piece, disable white chess pieces that were capturable for previous select.*/
/*@Param string p is the player's color for chess pieces that needs to be enabled*/
function disableCapturePieces(){
  if(player == WHITE && moves != null){
    for(var k = 0; k < moves.length; k++){
      if(moves[k] != ""){
        var r = parseInt(moves[k].substring(0,1));
        var c = parseInt(moves[k].substring(1));
        if(board[r][c].includes("b.png")){
          document.getElementById(moves[k]).style.pointerEvents = "none";
        }
      }
    }
  }

  if(player == BLACK && moves != null){
    for(var k = 0; k < moves.length; k++){
      if(moves[k] != ""){
        var r = parseInt(moves[k].substring(0,1));
        var c = parseInt(moves[k].substring(1), 10);
        if(board[r][c].includes("w.png")){
          document.getElementById(moves[k]).style.pointerEvents = "none";
        }
      }
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

  if(firstPiece == ""){
    if(isPawn(r, c)){
      firstPiece = imageId;
      showPossiblePawnMoves(r, c);
    }

    /* TODO:
    //Checks if it is a Rook here
      //If it is, show possible moves*/
    if(isRook(r, c)){
    	firstPiece = imageId;
	    showPossibleRookMoves(r, c);
    }

    /* TODO:
    //Checks if it is a Knights here
    //If it is, show possible moves*/
    if(isKnight(r, c)){
      firstPiece = imageId;
      showPossibleKnightMoves(r, c);
    }

    /* TODO:
    //Checks if it is a Bishops here
      //If it is, show possible moves*/
    if(isBishop(r, c)){
		  firstPiece = imageId;
		  showPossibleBishopMoves(r,c);
    }

    /* TODO:
    //Checks if it is a King here
      //If it is, show possible moves*/
    if(isKing(r, c)){
		  firstPiece = imageId;
		  showPossibleKingMoves(r,c);
	  }

    /* TODO:
    //Checks if it is a Queen here
      //If it is, show possible moves*/
		if(isQueen(r,c)){
			firstPiece = imageId;
			showPossibleQueenMoves(r,c);
		}
  }
  else if (isInMoves(imageId)){
    secondPiece = imageId;
    moveChessPiece(firstPiece, secondPiece);
    clearMoves();
  }
  else {
    firstPiece = "";
    disableCapturePieces();
    runGame(imageId);
  }
}

/*Author: Richard */
/*Checks if a tile is out of the board */
/*@Param int r is the number value for row*/
/*@Param int c is the number value for column*/
function isOutOfBounds(r,c){
  if(r>9 || r<0 || c>9 || c<0){
    return true;
  }
  else{
    return false;
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

/*@Author: Kat*/
/*Checks if a tile is a knight*/
/*@Param int r is the number value for row*/
/*@Param int c is the number value for column*/
function isKnight(r, c){
  if(board[r][c].includes("kb") || board[r][c].includes("kw")){
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

/*@Author: Richard*/
/*Checks if a tile is a queen*/
/*@Param int r is the number value for row*/
/*@Param int c is the number value for column*/
function isQueen(r,c){
	if(board[r][c].includes("qw.png") || board[r][c].includes("qb.png")){
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
/*Resets image selection and moves array*/
function clearMoves(){
  firstPiece = "";
  secondPiece = "";
  moves = new Array();
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

  enableCapturePieces();
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

  enableCapturePieces();
}


/*@Author: Kat*/
/*Shows possible moves for knight*/
/*Conditions are made in order and according to the following rules
  Rule 1 : Knights can skip over pieces
  Rule 2 : Knights move two squares up || down || left || right
  Rule 2.5 : Followed by one more square at a 90 degree turn
  Rule 2.75 : This generally makes the shape of a 'L'*/
/*@Param int r is the number value for row*/
/*@Param int c is the number value for column*/
function showPossibleKnightMoves(r, c){
  var num;
  moves = new Array(8);
  for(var i = 0; i < moves.length; i++){
    moves[i] = "";
  }

  if(board[r][c].includes("kw")){
    if(r - 2 >= 0 && c - 1 >= 0){
      num = "" + (r - 2) + (c - 1);
      if(board[r - 2][c - 1].includes("l.png") || board[r - 2][c - 1].includes("d.png")){
        changeBorderColor(num, "#33cccc");
        moves[0] = num;
      }
      else if (board[r - 2][c - 1].includes("b.png")){
        changeBorderColor(num, "#ff5050");
        moves[0] = num;
      }
    }
    if(r - 2 >= 0 && c + 1 <= 9){
      num = "" + (r - 2) + (c + 1);
      if(board[r - 2][c + 1].includes("l.png") || board[r - 2][c + 1].includes("d.png")){
        changeBorderColor(num, "#33cccc");
        moves[1] = num;
      }
      else if (board[r - 2][c + 1].includes("b.png")){
        changeBorderColor(num, "#ff5050");
        moves[1] = num;
      }
    }
    if(c + 2 <= 9 && r - 1 >= 0){
      num = "" + (r - 1) + (c + 2);
      if(board[r - 1][c + 2].includes("l.png") || board[r - 1][c + 2].includes("d.png")){
        changeBorderColor(num, "#33cccc");
        moves[2] = num;
      }
      else if (board[r - 1][c + 2].includes("b.png")){
        changeBorderColor(num, "#ff5050");
        moves[2] = num;
      }
    }
    if(c + 2 <= 9 && r + 1 <= 9){
      num = "" + (r + 1) + (c + 2);
      if(board[r + 1][c + 2].includes("l.png") || board[r + 1][c + 2].includes("d.png")){
        changeBorderColor(num, "#33cccc");
        moves[3] = num;
      }
      else if (board[r + 1][c + 2].includes("b.png")){
        changeBorderColor(num, "#ff5050");
        moves[3] = num;
      }
    }
    if(r + 2 <= 9 && c + 1 <= 9){
      num = "" + (r + 2) + (c + 1);
      if(board[r + 2][c + 1].includes("l.png") || board[r + 2][c + 1].includes("d.png")){
        changeBorderColor(num, "#33cccc");
        moves[4] = num;
      }
      else if (board[r + 2][c + 1].includes("b.png")){
        changeBorderColor(num, "#ff5050");
        moves[4] = num;
      }
    }
    if(r + 2 <= 9 && c - 1 >= 0){
      num = "" + (r + 2) + (c - 1);
      if(board[r + 2][c - 1].includes("l.png") || board[r + 2][c - 1].includes("d.png")){
        changeBorderColor(num, "#33cccc");
        moves[5] = num;
      }
      else if (board[r + 2][c - 1].includes("b.png")){
        changeBorderColor(num, "#ff5050");
        moves[5] = num;
      }
    }
    if(c - 2 >= 0 && r + 1 <= 9){
      num = "" + (r + 1) + (c - 2);
      if(board[r + 1][c - 2].includes("l.png") || board[r + 1][c - 2].includes("d.png")){
        changeBorderColor(num, "#33cccc");
        moves[6] = num;
      }
      else if (board[r + 1][c - 2].includes("b.png")){
        changeBorderColor(num, "#ff5050");
        moves[6] = num;
      }
    }
    if(c - 2 >= 0 && r - 1 >= 0){
      num = "" + (r - 1) + (c - 2);
      if(board[r - 1][c - 2].includes("l.png") || board[r - 1][c - 2].includes("d.png")){
        changeBorderColor(num, "#33cccc");
        moves[7] = num;
      }
      else if (board[r - 1][c - 2].includes("b.png")){
        changeBorderColor(num, "#ff5050");
        moves[7] = num;
      }
    }
  }

  if(board[r][c].includes("kb")){
    if(r - 2 >= 0 && c - 1 >= 0){
      num = "" + (r - 2) + (c - 1);
      if(board[r - 2][c - 1].includes("l.png") || board[r - 2][c - 1].includes("d.png")){
        changeBorderColor(num, "#33cccc");
        moves[0] = num;
      }
      else if (board[r - 2][c - 1].includes("w.png")){
        changeBorderColor(num, "#ff5050");
        moves[0] = num;
      }
    }
    if(r - 2 >= 0 && c + 1 <= 9){
      num = "" + (r - 2) + (c + 1);
      if(board[r - 2][c + 1].includes("l.png") || board[r - 2][c + 1].includes("d.png")){
        changeBorderColor(num, "#33cccc");
        moves[1] = num;
      }
      else if (board[r - 2][c + 1].includes("w.png")){
        changeBorderColor(num, "#ff5050");
        moves[1] = num;
      }
    }
    if(c + 2 <= 9 && r - 1 >= 0){
      num = "" + (r - 1) + (c + 2);
      if(board[r - 1][c + 2].includes("l.png") || board[r - 1][c + 2].includes("d.png")){
        changeBorderColor(num, "#33cccc");
        moves[2] = num;
      }
      else if (board[r - 1][c + 2].includes("w.png")){
        changeBorderColor(num, "#ff5050");
        moves[2] = num;
      }
    }
    if(c + 2 <= 9 && r + 1 <= 9){
      num = "" + (r + 1) + (c + 2);
      if(board[r + 1][c + 2].includes("l.png") || board[r + 1][c + 2].includes("d.png")){
        changeBorderColor(num, "#33cccc");
        moves[3] = num;
      }
      else if (board[r + 1][c + 2].includes("w.png")){
        changeBorderColor(num, "#ff5050");
        moves[3] = num;
      }
    }
    if(r + 2 <= 9 && c + 1 <= 9){
      num = "" + (r + 2) + (c + 1);
      if(board[r + 2][c + 1].includes("l.png") || board[r + 2][c + 1].includes("d.png")){
        changeBorderColor(num, "#33cccc");
        moves[4] = num;
      }
      else if (board[r + 2][c + 1].includes("w.png")){
        changeBorderColor(num, "#ff5050");
        moves[4] = num;
      }
    }
    if(r + 2 <= 9 && c - 1 >= 0){
      num = "" + (r + 2) + (c - 1);
      if(board[r + 2][c - 1].includes("l.png") || board[r + 2][c - 1].includes("d.png")){
        changeBorderColor(num, "#33cccc");
        moves[5] = num;
      }
      else if (board[r + 2][c - 1].includes("w.png")){
        changeBorderColor(num, "#ff5050");
        moves[5] = num;
      }
    }
    if(c - 2 >= 0 && r + 1 <= 9){
      num = "" + (r + 1) + (c - 2);
      if(board[r + 1][c - 2].includes("l.png") || board[r + 1][c - 2].includes("d.png")){
        changeBorderColor(num, "#33cccc");
        moves[6] = num;
      }
      else if (board[r + 1][c - 2].includes("w.png")){
        changeBorderColor(num, "#ff5050");
        moves[6] = num;
      }
    }
    if(c - 2 >= 0 && r - 1 >= 0){
      num = "" + (r - 1) + (c - 2);
      if(board[r - 1][c - 2].includes("l.png") || board[r - 1][c - 2].includes("d.png")){
        changeBorderColor(num, "#33cccc");
        moves[7] = num;
      }
      else if (board[r - 1][c - 2].includes("w.png")){
        changeBorderColor(num, "#ff5050");
        moves[7] = num;
      }
    }
  }

  enableCapturePieces();
}

/*@Author: Richard*/
/*Shows possible moves for bishop*/
/* Conditions for bishop movement
1. bishops can only move diagonally
2. bishops can move unlimited around of spaces until the end of
the board or there is a piece in the way
3. bishop can capture any opposite piece in movement range
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

  enableCapturePieces();
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

enableCapturePieces();
}

/*@Author: Richard*/
/*Shows possible moves for queen*/
/* Conditions for queen movement
1. Queens can go unlimited amount of spaces until queen hits the end of
board or a piece
2. Queens can go in all 8 directions
3. Queen can capture any opposite colored piece if in movement range
/*@Param int r is the number value for row*/
/*@Param int c is the number value for column*/
function showPossibleQueenMoves(r,c){
	var num;
	move = new Array();
	/* Copy and paste from "bishop.js", but for Queens*/
	rw = r;
	cl = c;
	if(board[r][c].includes("qw")){
		/*up left movement */
		for(i=rw-1, j=cl-1; i>-1 && j>-1; i--, j--){
			/* window.alert(i + " " + j); */
			if(!isEmptyTile(i,j) && !isOutOfBounds(i,j)){
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
			if(!isEmptyTile(i,j) && !isOutOfBounds(i,j)){
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
			if(!isEmptyTile(i,j) && !isOutOfBounds(i,j)){
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
		for(i=rw+1, j=cl+1; i<10 && j<10; i++, j++){
			/* window.alert(i + " " + j); */
			if(!isEmptyTile(i,j) && !isOutOfBounds(i,j)){
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
		/* verticle and horiziontal movement */
		/* up movement */
		for(i=rw-1; i>-1; i--){
			if(!isEmptyTile(i,c)){
				if(board[i][c].includes("b.png")){
					num = "" + i + c;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + i + c;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
		/* down movement */
		for(i=rw+1; i<10; i++){
			/*window.alert(i); */
			if(!isEmptyTile(i,c)){
				if(board[i][c].includes("b.png")){
					num = "" + i + c;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + i + c;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
		/* right movement */
		for(i=cl+1; i<10; i++){
			/* window.alert(i) */
			if(!isEmptyTile(r,i)){
				if(board[r][i].includes("b.png")){
					num = "" + r + i;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + r + i;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
		/*left movement */
		for(i=cl-1; i>-1; i--){
			/* window.alert(i) */
			if(!isEmptyTile(r,i)){
				if(board[r][i].includes("b.png")){
					num = "" + r + i;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + r + i;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
    }
    if(board[r][c].includes("qb")){
		/*up left movement */
		for(i=rw-1, j=cl-1; i>-1 && j>-1; i--, j--){
			/* window.alert(i + " " + j); */
			if(!isEmptyTile(i,j) && !isOutOfBounds(i,j)){
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
			if(!isEmptyTile(i,j) && !isOutOfBounds(i,j)){
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
			if(!isEmptyTile(i,j) && !isOutOfBounds(i,j)){
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
		for(i=rw+1, j=cl+1; i<10 && j<10; i++, j++){
			/* window.alert(i + " " + j); */
			if(!isEmptyTile(i,j) && !isOutOfBounds(i,j)){
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
		/* verticle and horiziontal movement */
		/* down movement */
		for(i=rw+1; i<10; i++){
			/* window.alert(i) */
			if(!isEmptyTile(i,c)){
				if(board[i][c].includes("w.png")){
					num = "" + i + c;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + i + c;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
		/* up movement */
		for(i=rw-1; i>-1; i--){
			/* window.alert(i) */
			if(!isEmptyTile(i,c)){
				if(board[i][c].includes("w.png")){
					num = "" + i + c;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + i + c;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
		/* right movement */
		for(i=cl+1; i<10; i++){
			/* window.alert(i) */
			if(!isEmptyTile(r,i)){
				if(board[r][i].includes("w.png")){
					num = "" + r + i;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + r + i;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
		/*left movement */
		for(i=cl-1; i>-1; i--){
			/* window.alert(i) */
			if(!isEmptyTile(r,i)){
				if(board[r][i].includes("w.png")){
					num = "" + r + i;
					changeBorderColor(num, "#ff5050");
					moves.push(num);
					break;
				}
				else{
					break;
				}
			}
			else{
				num = "" + r + i;
				changeBorderColor(num, "#33cccc");
				moves.push(num);
			}
		}
	}

  enableCapturePieces();
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

  changePlayer(player);
  populate();
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

/*@Author: Alam*/
/*Exits the game and returns to main menu*/
function exit(){
  if (confirm("Are you sure you want to leave the game?")) {
    window.location.href = "index.html";
  }
}
