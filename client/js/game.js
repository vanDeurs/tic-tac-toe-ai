$(document).ready(function() {
    initialize();
    $(".box").click(function (e) {
        console.log(e.target);
        makePlayerMove(e.target.id, state.player, state.board);
    });
    $('#start-game-button').click(function () {
        startNewGame();
    });
});

function initialize () {
    state.template = $('#board-template').html();
    const board = {
        column1: [{value: '', index: 0}, {value: '', index: 1}, {value: '', index: 2}],
        column2: [{value: '', index: 3}, {value: '', index: 4}, {value: '', index: 5}],
        column3: [{value: '', index: 6}, {value: '', index: 7}, {value: '', index: 8}]
    };
    Mustache.parse(state.template);
    const html = Mustache.render(state.template, {
        board
    });
    $('#board-place').append(html);

    // Start the first game
    startNewGame();
}

const state = {
    ongoingGame: false,
    board: null,
    player: null,
    template: null
}

function startNewGame () {
    return axios.post('http://localhost:3000/api/game/start').then((data) => {
        console.log('DATA: ', data);
        state.board = data.data.board;
        state.ongoingGame = !state.ongoingGame;
        state.player = 'X';
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


function makePlayerMove (positionId, player, board) {
    console.log('Player: ', player);
    $(positionId).addClass('boxFull');
    axios.post('http://localhost:3000/api/game/', {positionId, player, board})
    .then((data) => {
        console.log('DATA: ', data);
        state.board = data.data.board;
        state.player = data.data.nextPlayer;
        state.ongoingGame = !data.data.isGameOver;
        updateBoard(state.board);
    }).then(() => {
        if (!state.ongoingGame) {
            state.player = 'X';
            alert('The game has been finished!');
        }
    });
}