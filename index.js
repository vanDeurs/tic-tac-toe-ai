const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const checkPreflight = require('./api/middleware/preflight').check;

/* Init express */
const app = express();

/* Here we setup the middlewares & configs */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// This tells Express out of which directory to serve static assets like CSS and images
app.use(express.static(__dirname + '/client'))

app.use('/api', checkPreflight, require('./api/router.js'));

app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/client/views/board.html');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}!`);
});

module.exports = app;