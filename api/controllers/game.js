const asyncWrapper = require('../middleware/async-wrapper');

exports.move = asyncWrapper(async (req, res) => {
    res.status(201).send({
        message: 'A move has been made.'
    });
});