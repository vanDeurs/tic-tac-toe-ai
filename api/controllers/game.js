const asyncWrapper = require('../middleware/async-wrapper');
const {
    generateBoard,
    makePlayerMove,
    decideTurn,
    isGameOver
} = require('./engine');

exports.makePlayerMove = asyncWrapper(async (req, res) => {
    const {positionId, player, board} = req.body;
    
    const updatedBoard = makePlayerMove(positionId, board, player);
    const gameOver = isGameOver(board, player);
    const nextPlayer = decideTurn(player);

    res.status(201).send({
        message: 'A move has been made.',
        board: updatedBoard,
        isGameOver: gameOver,
        nextPlayer
    });
});

exports.startNewGame = asyncWrapper(async (req, res) => {
    const board = generateBoard();

    res.status(201).send({
        message: 'A new game has started.',
        board
    });
});