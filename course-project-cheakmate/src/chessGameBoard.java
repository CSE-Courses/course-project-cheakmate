public class chessGameBoard {

    //board size
    public static String[][] gameBoard = new String[10][10];

    //creating the board
    public static void createBoard() {
        for (int i = 0; i < gameBoard.length; i++) {
            for (int j = 0; j < gameBoard.length; j++) {
                System.out.print(gameBoard[i][j] + "1 ");
            }
            System.out.println();
        }
    }

    //Chess pieces in the correct location when game starts according to the pieces code names
    public static void piecesOnGameBoard() {
        boolean alternating = true;
        for (int i = 0; i < gameBoard.length; i++) {
            for (int j = 0; j < gameBoard.length; j++) {
                    if ((i * 10 +j) % 2 == 0 && alternating) {
                        gameBoard[i][j] = " ";
                }
            }
        }
        // White and Black Rooks
        gameBoard[0][1] = "lob";
        gameBoard[0][8] = "low";
        gameBoard[9][1] = "dob";
        gameBoard[9][8] = "dow";

        // White and Black Knights
        gameBoard[0][2] = "lkw";
        gameBoard[0][7] = "lkb";
        gameBoard[9][2] = "dkw";
        gameBoard[9][7] = "dkb";

        //White and Black Bishops
        gameBoard[0][3] = "lhb";
        gameBoard[0][6] = "lhw";
        gameBoard[9][3] = "dhb";
        gameBoard[9][6] = "dhw";

        //White and Black Queens
        gameBoard[0][4] = "lqw";
        gameBoard[9][4] = "dqw";

        //White and Black Kings
        gameBoard[0][5] = "lgb";
        gameBoard[9][5] = "dgb";

        //White and Black Pawns
        gameBoard[1][1] = "lpb";
        gameBoard[1][2] = "lpw";
        gameBoard[1][3] = "lpb";
        gameBoard[1][4] = "lpw";
        gameBoard[1][5] = "lpb";
        gameBoard[1][6] = "lpw";
        gameBoard[1][7] = "lpb";
        gameBoard[1][8] = "lpw";
        gameBoard[8][1] = "dpb";
        gameBoard[8][2] = "dpw";
        gameBoard[8][3] = "dpb";
        gameBoard[8][4] = "dpw";
        gameBoard[8][5] = "dpb";
        gameBoard[8][6] = "dpw";
        gameBoard[8][7] = "dpb";
        gameBoard[8][8] = "dpw";
    }
    public static void main (String[] args) {
        piecesOnGameBoard();
        createBoard();
    }
}