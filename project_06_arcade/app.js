const gamePlayers= document.querySelector('#player_mode');
const selectedGameMode = document.querySelector('#difficulty');
const boardCells = document.querySelectorAll('[data-cell]');
const ticTacToeBoard = document.querySelector('#ticTacToe_board');

gamePlayers.addEventListener('change', function(){
    if (gamePlayers.selectedIndex === 1) {
        ticTacToe.setGameMode();
    } else if(gamePlayers.selectedIndex === 2) {
        ticTacToe.setNumPlayers();
    } else {
        const lable = document.querySelector('#mode_lable');
        lable.style.display = "none";
        selectedGameMode.style.display = "none";
    }
});

let player1 = {
    token: "X",
    win: 0
    // lose: 0 
    // username: "",
}

let player2 = {
    token: "O",
    win: 0
    // lose: 0 
    // username: "",
}

let computer = {
    token: "O",
    win: 0
    // lose: 0
    // username: "computer",
}


let ticTacToe= {
    gameMode: 0, //1= easy, 2 = medium, 3 = hard.

    numPlayer: 0, //1 = 1 player 2 = 2 player.

    playerTurn: 0,

    firstToGo: "Player 1",

    gameHasWinner: false,

    gameStarted: false,

    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ],

    setGameMode: function() {
        this.numPlayer = 1;
        const setDifficulty = document.querySelector('#mode_lable');
        setDifficulty.style.display = "flex";

        selectedGameMode.addEventListener('change', function(){
            if(selectedGameMode.selectedIndex > 0) {
                this.gameMode = selectedGameMode.selectedIndex;
                ticTacToe.playerMove();
            }
        })
    },

    setNumPlayers: function() {
        //setting num of players variable 
        this.numPlayer = 2;

        //attaching the players id to a vaiable and changing its display to none.
        const pickPlayersDisplay = document.querySelector('#players');
        pickPlayersDisplay.style.display = "none";

        //added in case user hits 1 player then chages it to two player.
        const setDifficulty = document.querySelector('#mode_lable');
        setDifficulty.style.display = "none";

        //attching the player_tokens id to a vari and cahnging its display to flex.
        const playerTokens = document.querySelector('#player_tokens');
        playerTokens.style.display = "flex";

        //Setting player tokens.
        const player1Token = document.querySelector('#player1_token');

        player1Token.addEventListener('change', function(){
            if (ticTacToe.gameStarted === false) {
                if(player1Token.selectedIndex === 1) {
                    //setting player tokens for the game
                    player1.token = "X";
                    player2.token = "O";
    
                    //changing HTML to display player 2 token
                    const player2Token = document.querySelector('#two_token');
                    player2Token.innerHTML = player2.token;
                } 
                if (player1Token.selectedIndex === 2) {
                    //setting player tokens for the game
                    player1.token = "O";
                    player2.token = "X";
    
                    //changing HTML to display player 2 token
                    const player2Token = document.querySelector('#two_token');
                    player2Token.innerHTML = player2.token;
                }
    
                if(player1Token.selectedIndex > 0) {
                    ticTacToe.playerMove();
                }
            }
        });
        
    },

    currentToken: function() {
        if (this.numPlayer === 2) {
            if(this.playerTurn % 2 === 0) {
                return player1.token;
            } else {
                return player2.token;
            }
        }
        if (this.numPlayer === 1) {
            if(this.playerTurn % 2 === 0) {
                return player1.token;
            } else {
                return computer.token;
            }
        }

    },

    playerMove: function() {
            boardCells.forEach(function(cell) {
                cell.addEventListener('click', playerMove)
            })
            
            function playerMove(e) {
                let cell = e.target;
                let boardRowIndex = cell.parentElement.id;

                if(ticTacToe.gameHasWinner === false && cell.innerHTML === "") {
                    ticTacToe.gameStarted = true;
                    let token = ticTacToe.currentToken(); 
                    cell.innerHTML = token;
    
                    if(boardRowIndex === "row_0") {
                        ticTacToe.board[0][cell.cellIndex] = token;
                    } else if (boardRowIndex === "row_1") {
                        ticTacToe.board[1][cell.cellIndex] = token;
                    } else {
                        ticTacToe.board[2][cell.cellIndex] = token;
                    }
                    //check for win 
                    winChecker.checkWin();
                    ticTacToe.playerTurn += 1;

                    if(ticTacToe.numPlayer === 1 && ticTacToe.gameHasWinner === false) {
                        ticTacToe.computerMove();
                    }
                }
            }
    }, 

    computerMove: function() {
        let counter = 0;
        let token = ticTacToe.currentToken();

        switch (this.gameMode) {
            case 0:
                while(counter === 0) {
                    let row = Math.floor(Math.random() * 3);
                    let column = Math.floor(Math.random() * 3);

                    if (this.board[row][column] === null) {
                        counter += 1
                        this.board[row][column] = token;
                        ticTacToeBoard.rows[row].cells[column].innerHTML = token;
                        this.playerTurn += 1;
                    }
                }
                winChecker.checkWin();
                break;
            case 1:
                while(counter === 0) {
                    let row = Math.floor(Math.random() * 3);
                    let column = Math.floor(Math.random() * 3);

                    if (this.board[row][column] === null) {
                        counter += 1
                        this.board[row][column] = token;
                        ticTacToeBoard.rows[row].cells[column].innerHTML = token;
                        this.playerTurn += 1;
                    }
                }
                winChecker.checkWin();
                break;
            case 2:
                while(counter === 0) {
                    let row = Math.floor(Math.random() * 3);
                    let column = Math.floor(Math.random() * 3);

                    if (this.board[row][column] === null) {
                        counter += 1
                        this.board[row][column] = token;
                        ticTacToeBoard.rows[row].cells[column].innerHTML = token;
                        this.playerTurn += 1;
                    }
                }
                winChecker.checkWin();
                break;
        }
    },

    newGame: function() {
        //reseting game has winner 
        this.gameHasWinner = false;

        //changing winning message.
        const displayWin = document.querySelector('#display_winner');
        //checking for game mode
        if(this.numPlayer === 2) {
            //Displaying new game message
            if (this.firstToGo === "Player 1") {
                this.firstToGo = "Player 2"
                this.playerTurn = 1;
            } else {
                this.firstToGo = "Player 1"
                this.playerTurn = 0;
            }
            displayWin.innerHTML = `${this.firstToGo} goes first now!!`
        } else {
            displayWin.innerHTML = "Make a move to play again or hit reset to end game."
            this.playerTurn = 0;
        }
        
        //resetting the game board and board array.
        for(let i = 0; i < 3; i++) {
            for(let j =0; j < 3; j++) {
                ticTacToeBoard.rows[i].cells[j].innerHTML = "";
                this.board[i][j] = null;
            }
        }
    },

    resetBoard: function() {
        location.reload(true);
        // //reseting game has winner and game has started
        // this.gameHasWinner = false;
        // this.gameStarted = false; 

        // //reseting other game values
        // this.gameMode = 0;
        // this.numPlayer = 0; //1 = 1 player 2 = 2 player.
        // this.playerTurn = 0;
        // this.firstToGo = "Player 1";

        // //changing winning message.
        // const displayWin = document.querySelector('#display_winner');
        // displayWin.innerHTML = "";

        // //resetting the game board and board array.
        // for(let i = 0; i < 3; i++) {
        //     for(let j =0; j < 3; j++) {
        //         ticTacToeBoard.rows[i].cells[j].innerHTML = "";
        //         this.board[i][j] = null;
        //     }
        // }

        // //reseting player object values
        // player1.win = 0;
        // player1.token = "X";
        // player2.win = 0;
        // player2.token = "O";
        // computer.win = 0; //computer token stays the same 

        // //reseting scores 
        // const score1 = document.querySelector('#score_1');
        // const score2 = document.querySelector('#score_2');
        // score1.innerHTML = "0";
        // score2.innerHTML = "0";

        // //reseting num and mode options dispaly
        // const lable = document.querySelector('#mode_lable');
        // lable.style.display = "none";

        // const playerTokens = document.querySelector('#player_tokens');
        // playerTokens.style.display = "none";

        // const players = document.querySelector('#players');
        // players.style.display = "flex";
    }

}

let winChecker = {

    /*
    Testing the rows of the 2D array for a win 
    if there is a win the winning token and the index of 
    the winning row are returned. 
    */
    checkRows: function() {
        let returnArray = [];
        for(let i = 0; i < 3; i++) {
            let counterX = 0;
            let counterO = 0;
            for(let j = 0; j < 3; j++) {
                if(ticTacToe.board[i][j] === "X") {
                    counterX += 1;
                }
                if(ticTacToe.board[i][j] === "O") {
                    counterO += 1;
                }
            }
            if(counterX === 3) {
                returnArray.push("X");
                returnArray.push(i);
                return returnArray;
            }
            if(counterO === 3) {
                returnArray.push("O");
                returnArray.push(i);
                return returnArray;
            }
        }
        return "NW";
    }, 

    /*
    Testing the columns of the 2D array for a win 
    if there is a win the winning token and the index of 
    the winning column are returned. 
    */
    checkColumn: function() {
        let returnArray = [];
        for(let i = 0; i < 3; i++) {
            let counterX = 0;
            let counterO = 0;
            for(let j = 0; j < 3; j++) {
                if(ticTacToe.board[j][i] === "X") {
                    counterX += 1;
                }
                if(ticTacToe.board[j][i] === "O") {
                    counterO += 1;
                }
            }
            if(counterX === 3) {
                returnArray.push("X");
                returnArray.push(i);
                return returnArray;
            }
            if(counterO === 3) {
                returnArray.push("O");
                returnArray.push(i);
                return returnArray;
            }
        }
        return "NW";
    },

    /*
    Testing the rows of the 2D array for a win 
    if there is a win the winning and the index of 
    the winning row are returned. 
    */
    checkDiagonal: function() {
        //Testing diagonal index 0 
        let returnArray = [];
        let counterX = 0;
        let counterO = 0;
        for (let i = 0; i < 3; i++) {
            if(ticTacToe.board[i][i] === "X") {
                counterX += 1;
            }
            if(ticTacToe.board[i][i] === "O") {
                counterO += 1;
            }
        }
        if(counterX === 3) {
            returnArray.push("X");
            returnArray.push(0);
            return returnArray;
        }
        if(counterO === 3) {
            returnArray.push("O");
            returnArray.push(0);
            return returnArray;
        }
        
        //Testing Diagonal index 2
        returnArray = [];
        counterX = 0;
        counterO = 0;
        for (let i=0, j=2; i < 3, j > -1; i++, j--) {
            if(ticTacToe.board[i][j] === "X") {
                counterX += 1;
            }
            if(ticTacToe.board[i][j] === "O") {
                counterO += 1;
            }
        }
        if(counterX === 3) {
            returnArray.push("X");
            returnArray.push(2);
            return returnArray;
        }
        if(counterO === 3) {
            returnArray.push("O");
            returnArray.push(2);
            return returnArray;
        }
        return "NW";
    },

    checkWin: function () {
        const displayWin = document.querySelector('#display_winner');
        const score1 = document.querySelector('#score_1');
        const score2 = document.querySelector('#score_2');

        let diagonalWin = this.checkDiagonal();
        let columnWin = this.checkColumn();
        let rowWin = this.checkRows();

        if(diagonalWin !== "NW") {
            ticTacToe.gameHasWinner = true;
            if(ticTacToe.numPlayer === 1) {
                if(diagonalWin[0] === player1.token) {
                    //display winner 
                    displayWin.innerHTML = "Player 1 Wins!!!";
                    //add 1 to player 1's win total
                    player1.win += 1;
                    //change score 1 inner HTML
                    score1.innerHTML = player1.win;

                } else {
                    //display winner 
                    displayWin.innerHTML = "YOU LOST!!!";
                    //add 1 to comp win total
                    computer.win += 1;
                    //change score 2 inner html to new total 
                    score2.innerHTML = computer.win;
                }
            } else {
                if(diagonalWin[0] === player1.token) {
                    //display winner 
                    displayWin.innerHTML = "Player 1 Wins!!!";
                    //add 1 to player 1's win total
                    player1.win += 1;
                    //change score 1 inner HTML
                    score1.innerHTML = player1.win;
                } else {
                    //display winner 
                    displayWin.innerHTML = "Player 2 Wins!!!";
                    //add 1 to player 1's win total
                    player2.win += 1;
                    //create vari for score 1 and change inner HTML
                    score2.innerHTML = player2.win;
                }
            }
        }

        if(columnWin !== "NW") {
            ticTacToe.gameHasWinner = true;
            if(ticTacToe.numPlayer === 1) {
                if(columnWin[0] === player1.token) {
                    //display winner 
                    displayWin.innerHTML = "Player 1 Wins!!!";
                    //add 1 to player 1's win total
                    player1.win += 1;
                    //change score 1 inner HTML
                    score1.innerHTML = player1.win;
                } else {
                //display winner 
                displayWin.innerHTML = "YOU LOST!!!";
                //add 1 to comp win total
                computer.win += 1;
                //change score 2 inner html to new total 
                score2.innerHTML = computer.win;
                }
            } else {
                if(columnWin[0] === player1.token) {
                    //display winner 
                    displayWin.innerHTML = "Player 1 Wins!!!";
                    //add 1 to player 1's win total
                    player1.win += 1;
                    //change score 1 inner HTML
                    score1.innerHTML = player1.win;
                } else {
                    //display winner 
                    displayWin.innerHTML = "Player 2 Wins!!!";
                    //add 1 to player 1's win total
                    player2.win += 1;
                    //create vari for score 1 and change inner HTML
                    score2.innerHTML = player2.win;
                }
            }
        }

        if(rowWin !== "NW") {
            ticTacToe.gameHasWinner = true;
            if(ticTacToe.numPlayer === 1) {
                if(rowWin[0] === player1.token) {
                    //display winner 
                    displayWin.innerHTML = "Player 1 Wins!!!";
                    //add 1 to player 1's win total
                    player1.win += 1;
                    //change score 1 inner HTML
                    score1.innerHTML = player1.win;
                } else {
                     //display winner 
                     displayWin.innerHTML = "YOU LOST!!!";
                     //add 1 to comp win total
                     computer.win += 1;
                     //change score 2 inner html to new total 
                     score2.innerHTML = computer.win;
                }
            } else {
                if(rowWin[0] === player1.token) {
                    //display winner 
                    displayWin.innerHTML = "Player 1 Wins!!!";
                    //add 1 to player 1's win total
                    player1.win += 1;
                    //change score 1 inner HTML
                    score1.innerHTML = player1.win;
                } else {
                    //display winner 
                    displayWin.innerHTML = "Player 2 Wins!!!";
                    //add 1 to player 1's win total
                    player2.win += 1;
                    //create vari for score 1 and change inner HTML
                    score2.innerHTML = player2.win;
                }
            }
        }

    }
}




