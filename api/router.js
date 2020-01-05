const router = require('express').Router();
const game = require('./routes/game.js');

router.use('/game', game);

module.exports = router;