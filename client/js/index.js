$(document).ready(function() {
    console.log('Hy:');
    $(".box").click(function (e) {
        console.log(e.target);
    });
});

function simulateClick (e) {
    console.log('Hey');
}