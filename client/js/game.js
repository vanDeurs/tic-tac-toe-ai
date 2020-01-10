$(document).ready(function() {
    initialize();
    $(".box").click(function (e) {
        makePlayerMove(e.target.id, state.player, state.board, state.scoreboard);
    });
    $('#start-button').click(function () {
        startNewGame();
    });
});

function initialize () {
    // Create board
    const templateBoard = $('#board-template').html();
    const board = {
        column1: [{value: '', index: 0}, {value: '', index: 1}, {value: '', index: 2}],
        column2: [{value: '', index: 3}, {value: '', index: 4}, {value: '', index: 5}],
        column3: [{value: '', index: 6}, {value: '', index: 7}, {value: '', index: 8}]
    };
    Mustache.parse(templateBoard);
    const htmlBoard = Mustache.render(templateBoard, {
        board
    });
    $('#board-place').append(htmlBoard);

    // Create scoreboard
    const templateScoreboard = $('#scoreboard-template').html();
    const scoreboard = {
        player1: {
            name: 'Player 1',
            side: 'X',
            score: 0
        },
        tie: {
            name: 'Tie',
            score: 0
        },
        player2: {
            name: 'Player 2',
            side: 'O',
            score: 0
        }
    }
    state.scoreboard = scoreboard;
    Mustache.parse(templateScoreboard);
    const htmlScoreboard = Mustache.render(templateScoreboard, {
        scoreboard
    });
    $('#scoreboard-place').append(htmlScoreboard);

    // Start the first game
    startNewGame('O', null);
}

const state = {
    ongoingGame: false,
    board: null,
    player: null,
    ai: null,
    scoreboard: null
}

function startNewGame (player2, ai) {
    removeClass('active');
    document.getElementById('result').innerHTML = '';
    return axios.post('http://localhost:3000/api/game/start').then((data) => {
        console.log('DATA: ', data);
        state.ongoingGame = !state.ongoingGame;
        state.player = 'X';
        state.board = data.data.board;
        updateBoard(data.data.board);
    });
}

function updateBoard (board) {
    for (let key in board) {
        for (let i in board[key]) {
            if (key === 'column1') {
                document.getElementById(board[key][i].index).innerHTML = board[key][i].value; 
            } else if (key === 'column2') {
                document.getElementById(board[key][i].index).innerHTML = board[key][i].value; 
            } else {
                document.getElementById(board[key][i].index).innerHTML = board[key][i].value; 
            }
        }
}}

function updateScoreboard (scoreboard) {
    document.getElementById('player1-score').innerHTML = scoreboard.player1.score;
    document.getElementById('player2-score').innerHTML = scoreboard.player2.score;
    document.getElementById('tie-score').innerHTML = scoreboard.tie.score;
}

function removeClass (className) {
    for (let i = 0; i < 9; i++) {
        document.getElementById(i).classList.remove(className);
    }
}

function makePlayerMove (positionId, player, board, scoreboard) {
    const element = document.getElementById(positionId);
    if (element.classList.contains('active')) return;

    element.classList.add('active');
    axios.post('http://localhost:3000/api/game/', {positionId, player, board, scoreboard})
    .then((data) => {
        console.log('Data: ', data);
        state.board = data.data.board;
        updateBoard(state.board);
        if (data.data.result.tie || data.data.result.winner) {
            state.scoreboard = data.data.scoreboard;
            updateScoreboard(state.scoreboard);
            state.ongoingGame = false;
            let content = data.data.result.tie ? 'The game is a tie.' : `Player ${state.player} won the game!`
            document.getElementById('result').innerHTML = content;
            state.player = 'X';
        } else {
            state.player = data.data.nextPlayer;
        }
    }).catch(err => console.log('Err: ', err));
}