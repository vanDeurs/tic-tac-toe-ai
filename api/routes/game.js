const router = require('express').Router();
const game = require('../controllers/game.js');
const {
    makePlayerMove,
    startNewGame
} = game;

// Make a move
router.post('/', makePlayerMove);
router.post('/start', startNewGame);

module.exports = router;