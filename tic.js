//set global variables
var full = 0;
var currentPlayer = "x";
var xWins = 0;
var oWins = 0;
var draws = 0;
//initiate the first empty game board
var locs = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
var Move = /** @class */ (function () {
    function Move(player, loc) {
        this.player = player;
        this.loc = loc;
    }
    return Move;
}());
$(function () {
    $('#result').text("X wins: " + xWins + " | O wins: " + oWins + " | Draws: " + draws);
    drawBoard();
    playerNotice();
    $('.loc').on("click", function () {
        var loc = this.className.match(/\d+/g);
        if (loc != null && loc.length == 2) {
            var moveToAdd = new Move(currentPlayer, [+loc[0], +loc[1]]);
            //add move to the board
            if ($(this).has("img").length == 0) {
                $(this).append('<img src="' + currentPlayer + '.svg"></img>');
                locs[+loc[0]][+loc[1]] = currentPlayer;
                full += 1;
                if (checkWin(moveToAdd) == "Next") {
                    //change current player
                    if (currentPlayer == "x") {
                        currentPlayer = "o";
                    }
                    else {
                        currentPlayer = "x";
                    }
                    playerNotice();
                }
                if (checkWin(moveToAdd) == "Win") {
                    $('#board').css("opacity", "0.2");
                    $('#notes').text(currentPlayer.toUpperCase() + " wins!");
                    if (currentPlayer == "x") {
                        xWins += 1;
                        $('#result').text("X wins: " + xWins + " | O wins: " + oWins + " | Draws: " + draws);
                    }
                    else {
                        oWins += 1;
                        $('#result').text("X wins: " + xWins + " | O wins: " + oWins + " | Draws: " + draws);
                    }
                    $('#noticeText').text(currentPlayer.toUpperCase() + " wins!");
                    showResult();
                }
                if (checkWin(moveToAdd) == "Draw") {
                    draws += 1;
                    $('#board').css("opacity", "0.2");
                    $('#notes').text("Draws! No one wins!");
                    $('#result').text("X wins: " + xWins + " | O wins: " + oWins + " | Draws: " + draws);
                    $('#noticeText').text("Draws!");
                    showResult();
                }
                //change current player
                // if(currentPlayer=="x"){
                //     currentPlayer="o";
                // }else{
                //     currentPlayer="x";
                // }
                $();
            }
        }
    });
    //restart another game
    $('#restartBtn').on("click", function () {
        console.log("restart a game!");
        restart();
    });
});
function drawBoard() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            $('#board').append('<div class="loc row-' + i + ' col-' + j + '"></div>');
        }
    }
}
function playerNotice() {
    $('#notes').text(currentPlayer.toUpperCase() + "'s Turn Now");
}
function checkWin(move) {
    //takes in moves to check whether the game ends
    //Wins situation
    //check whether a move caused a win on vertical line
    if (locs[1][move.loc[1]] == locs[0][move.loc[1]] && locs[1][move.loc[1]] == locs[2][move.loc[1]] && locs[move.loc[0]][move.loc[1]] != " ") {
        return "Win";
    }
    //check whether a move caused a win on horizontal line
    if (locs[move.loc[0]][1] == locs[move.loc[0]][0] && locs[move.loc[0]][1] == locs[move.loc[0]][2] && locs[move.loc[0]][move.loc[1]] != " ") {
        return "Win";
    }
    //check whether a move caused a win on diagonals
    if (move.loc[0] == move.loc[1] && locs[0][0] == locs[1][1] && locs[1][1] == locs[2][2] && locs[move.loc[0]][move.loc[1]] != " ") {
        return "Win";
    }
    if (move.loc[0] + move.loc[1] == 2 && locs[0][2] == locs[1][1] && locs[1][1] == locs[2][0] && locs[move.loc[0]][move.loc[1]] != " ") {
        return "Win";
    }
    //Draws situation
    if (full == 9) {
        return "Draw";
    }
    ;
    //Otherwise, we can have another move
    return "Next";
}
function showResult() {
    $('#notice').css("width", "100%");
    $('#notice').css("height", "100px");
}
function restart() {
    locs = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
    full = 0;
    $('.loc').empty();
    $('#board').css("opacity", "1");
    playerNotice();
    $('#notice').css("width", "0px");
    $('#notice').css("height", "0px");
}
