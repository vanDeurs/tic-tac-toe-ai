const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const mustacheExpress = require('mustache-express');

/* Init express */
const app = express();

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/client/views');

/* Here we setup the middlewares & configs */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Here we define the api routes */
app.use('/api', require('./api/router.js'));

// This tells Express out of which directory to serve static assets like CSS and images
app.use(express.static(__dirname + '/client'))

const board = {
    column1: [{value: 'X', index: 0}, {value: 'X', index: 1}, {value: 'O', index: 2}],
    column2: [{value: 'O', index: 3}, {value: 'O', index: 4}, {value: 'X', index: 5}],
    column3: [{value: 'X', index: 6}, {value: 'X', index: 7}, {value: 'X', index: 8}]
};

app.get('/', function (req, res) {
    console.log('Board: ', board);
    res.render('board', {board: board});
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}!`);
});

module.exports = app;