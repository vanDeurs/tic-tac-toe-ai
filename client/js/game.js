$(document).ready(function() {
    initialize();
    $(".box").click(function (e) {
        makePlayerMove(e.target.id, state.player, state.board);
    });
    $('#start-button').click(function () {
        startNewGame();
    });
});

function initialize () {
    const template = $('#board-template').html();
    const board = {
        column1: [{value: '', index: 0}, {value: '', index: 1}, {value: '', index: 2}],
        column2: [{value: '', index: 3}, {value: '', index: 4}, {value: '', index: 5}],
        column3: [{value: '', index: 6}, {value: '', index: 7}, {value: '', index: 8}]
    };
    Mustache.parse(template);
    const html = Mustache.render(template, {
        board
    });
    $('#board-place').append(html);

    // Start the first game
    startNewGame();
}

const state = {
    ongoingGame: false,
    board: null,
    player: null
}

function startNewGame () {
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

function removeClass (className) {
    for (let i = 0; i < 9; i++) {
        document.getElementById(i).classList.remove(className);
    }
}

function makePlayerMove (positionId, player, board) {
    const element = document.getElementById(positionId);
    if (element.classList.contains('active')) return;

    element.classList.add('active');
    axios.post('http://localhost:3000/api/game/', {positionId, player, board})
    .then((data) => {
        console.log('Data: ', data);
        state.board = data.data.board;
        updateBoard(state.board);
        if (data.data.result.draw || data.data.result.winner) {
            state.ongoingGame = false;
            let content = data.data.result.draw ? 'The game is a draw.' : `Player ${state.player} won the game!`
            document.getElementById('result').innerHTML = content;
            state.player = 'X';
        } else {
            state.player = data.data.nextPlayer;
        }
    }).catch(err => console.log('Err: ', err));
}