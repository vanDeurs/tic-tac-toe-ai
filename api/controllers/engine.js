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

   