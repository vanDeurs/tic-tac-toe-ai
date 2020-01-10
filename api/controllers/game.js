const asyncWrapper = require('../middleware/async-wrapper');
const {
    generateBoard,
    makePlayerMove,
    decideTurn,
    isGameOver
} = require('./engine');

exports.makePlayerMove = asyncWrapper(async (req, res) => {
    const {positionId, player, board, scoreboard} = req.body;
    
    const updatedBoard = makePlayerMove(positionId, board, player, scoreboard);
    const nextPlayer = decideTurn(player);
    const results = isGameOver(board, player, scoreboard);

    res.status(201).send({
        message: 'A move has been made.',
        board: updatedBoard,
        scoreboard: results.scoreboard,
        result: results.result,
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