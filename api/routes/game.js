const router = require('express').Router();
const game = require('../controllers/game.js');
const {
    move
} = game;

// Make a move
router.post('/', move);

module.exports = router;