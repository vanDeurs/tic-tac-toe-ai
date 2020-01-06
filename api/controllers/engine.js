/**
 * This is the engine of the game; containing all the basic functionality that is needed.
 * - All logic and functionality will happen on the server-side and be sent to the client.
 * - Start by initiating new board/game.
 * - A player (you or the AI) makes a move on the client side, server evaluates the move and responds.
 * - A game can be in three states: ongoing, X-win, O-win.
 */

 /**
  * EVALUATING POST-MOVE STAGE:
  * - Evaluate if the game is completed: either won or drawn.
  * - Evaluate who's turn it is.
  * - If it is the AI's turn, let the AI work.
  * - Send back the AI's move to the client.
  * - If it is the player's move, send back the appropiate respons and let the player make his/her move.
  * - Send back player result and evaluate.
  */

  /**
   * MAKE A MOVE STAGE FOR AI:
   * - Data recieved: the board and who's turn it is.
   * - Work out: available moves, then use the algorithm to work out the best one.
   * - Send back response to client.
   */


exports.generateBoard = () => {
    const board = {
        column1: [{value: '', index: 0}, {value: '', index: 1}, {value: '', index: 2}],
        column2: [{value: '', index: 3}, {value: '', index: 4}, {value: '', index: 5}],
        column3: [{value: '', index: 6}, {value: '', index: 7}, {value: '', index: 8}]
    };
    return board;
}

exports.makePlayerMove = (positionId, board, player) => {
    if (positionId <= 2) {
        board.column1[positionId].value = player;
    } else if (positionId <= 5) {
        board.column2[positionId - 3].value = player;
    } else if (positionId <= 8) {
        board.column3[positionId - 6].value = player;
    } else {
        return null;
    }
    return board;
}

exports.decideTurn = (lastPlayer) => {
    return lastPlayer === 'X' ? 'O' : 'X';
}

exports.isGameOver = (board, player) => {
    // Result.winner or result.draw will not equal undefined if game is over.
    // Start by checking for a winner
    const {column1, column2, column3} = board;
    const result = {
        winner: null,
        draw: null
    }
        // Check vertical
    if (   column1[0].value === column1[1].value && column1[2].value === player && column1[0].value === column1[2].value
        || column2[0].value === column2[1].value && column2[2].value === player && column2[0].value === column2[2].value
        || column3[0].value === column3[1].value && column3[2].value === player && column3[0].value === column3[2].value
        // Check horizontal
        || column1[0].value === column2[0].value && column3[0].value === player && column1[0].value === column3[0].value
        || column1[1].value === column2[1].value && column3[1].value === player && column1[1].value === column3[1].value
        || column1[2].value === column2[2].value && column3[2].value === player && column1[2].value === column3[2].value
        // Check diagonal
        || column1[0].value === column2[1].value && column3[2].value === player && column1[0].value === column3[2].value
        || column3[0].value === column2[1].value && column1[2].value === player && column3[0].value === column1[2].value
    ) {
        result.winner = player;
    } else {
        // Find all empty squares and see if they are fewer or equal to 1
        let emptySquares = 0;
        for (let i in column1) {
            if (column1[i].value === '') emptySquares++;
        }
        for (let i in column2) {
            if (column2[i].value === '') emptySquares++;
        }
        for (let i in column3) {
            if (column3[i].value === '') emptySquares++;
        }
        if (emptySquares <= 1) {
            // Board is full
            result.draw = true;
        }
    }
    return result;
}
   