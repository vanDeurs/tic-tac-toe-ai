const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const http = require('http');

/* Init express */
const app = express();
const server = http.createServer(app);

/* Here we setup the middlewares & configs */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Here we define the api routes */
app.use('/api', require('./api/router.js'));

// This tells Express out of which directory to serve static assets like CSS and images
app.use(express.static(__dirname + '/client'))

app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/client/html/index.html');
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}!`);
});

module.exports = app;