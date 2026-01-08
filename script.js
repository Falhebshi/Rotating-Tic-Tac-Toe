let btn;
let buttonSound = new Audio('audios/Button_Plate.mp3');
let pop1 = new Audio('audios/pop1.mp3');
let pop2 = new Audio('audios/pop2.mp3');
function welcome() {
    btn = document.createElement("button");
    btn.setAttribute("id", "startBtn");
    btn.innerHTML = "<img src='images/start-normal.png' alt=''>";
    btn.onmousedown = function(){
    btn.querySelector("img").src = "images/start-pressed.png";
    buttonSound.currentTime = 0.2;
    buttonSound.play();
    
    }
    btn.onmouseup = function(){
    btn.querySelector("img").src = "images/start-normal.png";
    startGame();
    }
    //--------------------------------
    let footer = document.getElementById("footer");
    document.body.insertBefore(btn, footer);

}

function startGame() {
    document.getElementById("explanation").remove();
    let btn = document.querySelector("button");
    btn.remove();
    document.getElementById("board").style.display = "grid";
    gameLogic();
    resetBtn = document.createElement("button");
    resetBtn.setAttribute("class","goldButton");
    resetBtn.innerHTML = "<img src='images/normal-btn.png' alt=''>";
    document.body.insertBefore(resetBtn, footer);
    //resetBtn.onclick = resetGame;
    resetBtn.onmousedown = function(){
    resetBtn.querySelector("img").src = "images/pressed-btn.png";
    buttonSound.currentTime = 0.2;
    buttonSound.play();
    resetGame();
    }
    resetBtn.onmouseup = function(){
    resetBtn.querySelector("img").src = "images/normal-btn.png";
    }

}



function resetGame() {
    const cells = document.querySelectorAll('.cell');
    for (let cell of cells) {
        cell.innerHTML = "";
    }
    playerX.length = 0;
    playerO.length = 0;
    Xturn = true;
    resetBtn.style.display = "Block";    
    
}


window.onload = welcome;

let playerX = [];
let playerO = [];
let Xturn = true;
let gameOver = false;

const winningCombinations = [
    ["0", "1", "2"], ["3", "4", "5"], ["6", "7", "8"], // Rows
    ["0", "3", "6"], ["1", "4", "7"], ["2", "5", "8"], // Columns
    ["0", "4", "8"], ["2", "4", "6"]                   // Diagonals
];

function checkWin(moves) {
    for (let i = 0; i < winningCombinations.length; i++) {
        let combo = winningCombinations[i];
        if (moves.includes(combo[0]) && moves.includes(combo[1]) && moves.includes(combo[2])) {
            return true;
        }
    }
    return false;
}

function winDisplay(player) {
    let footer = document.getElementById("footer");
    let win = document.createElement("h2");
    win.innerHTML = "Player " + player + " wins!";
    document.body.insertBefore(win, footer);
    let timeLeft = 20;
    let timerDisplay = document.createElement("h3");
    document.body.insertBefore(timerDisplay, footer)
    playAgainBtn = document.createElement("button");
    playAgainBtn.setAttribute("class","goldButton");
    playAgainBtn.innerHTML = "<img src='images/normal-playAgain.png' alt=''>";

    playAgainBtn.onmousedown = function(){
        playAgainBtn.querySelector("img").src = "images/pressed-playAgain.png";
        buttonSound.currentTime = 0.2;
        buttonSound.play();
    }
    playAgainBtn.onmouseup = function(){
        clearInterval(timer); // Clear the timer immediately
        resetGame();
        win.remove();
        timerDisplay.remove();
        playAgainBtn.remove();
        gameOver = false;
    }
    document.body.insertBefore(playAgainBtn, footer);

    let timer = setInterval(function () {
        timerDisplay.innerHTML = "<br>The board will reset in " + timeLeft-- + " seconds.";
        if (timeLeft < 0) {
            clearInterval(timer);
            resetGame();
            win.remove();
            timerDisplay.remove();
            playAgainBtn.remove();
            gameOver = false;
        }
    }, 1000);
    
    gameOver = true;
    return;
}

function gameLogic() {
    const cells = document.querySelectorAll('.cell');
    for (let cell of cells) { //main loop for cells in the board
        cell.onclick = function () { //if a cell is clicked
            if (gameOver) return;
            if (cell.innerHTML == "" && Xturn === true && playerX.length < 3) { //X turn - normal
                console.log(cell.getAttribute("data-index") + " is clicked");
                playerX.push(cell.getAttribute("data-index"));
                pop1.play();
                cell.innerHTML = "<img src='images/X-btn.png' alt=''>";
                console.log("Player X: " + playerX);
                if (checkWin(playerX)) {
                    winDisplay("X");
                    resetBtn.style.display = "None";    
                }
                Xturn = false;
            }
            else if (cell.innerHTML == "" && Xturn === false && playerO.length < 3) { //O turn - normal
                console.log(cell.getAttribute("data-index") + " is clicked");
                playerO.push(cell.getAttribute("data-index"));
                pop2.play();
                cell.innerHTML = "<img src='images/O-btn.png' alt=''>";
                console.log("Player O: " + playerO);
                if (checkWin(playerO)) {
                    winDisplay("O");
                    resetBtn.style.display = "None";    
                }
                Xturn = true;
            }
            else if (cell.innerHTML == "" && Xturn === true && playerX.length === 3) { //X turn - rotate
                let emptiedCell = playerX.shift();
                document.querySelector(`.cell[data-index="${emptiedCell}"]`).innerHTML = "";
                console.log(cell.getAttribute("data-index") + " is clicked");
                playerX.push(cell.getAttribute("data-index"));
                pop1.play();
                cell.innerHTML = "<img src='images/X-btn.png' alt=''>";
                console.log("Player X: " + playerX);
                if (checkWin(playerX)) {
                    winDisplay("X");
                    resetBtn.style.display = "None";    
                }
                Xturn = false;

            }
            else if (cell.innerHTML == "" && Xturn === false && playerO.length === 3) { //O turn - rotate
                let emptiedCell = playerO.shift();
                document.querySelector(`.cell[data-index="${emptiedCell}"]`).innerHTML = "";
                console.log(cell.getAttribute("data-index") + " is clicked");
                playerO.push(cell.getAttribute("data-index"));
                pop2.play();
                cell.innerHTML = "<img src='images/O-btn.png' alt=''>";
                console.log("Player O: " + playerO);
                if (checkWin(playerO)) {
                    winDisplay("O");
                    resetBtn.style.display = "None";    

                }
                Xturn = true;
            }

        }

    }
}