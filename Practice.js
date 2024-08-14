const gameBoardSquares = document.querySelectorAll(".gameBoard div")
const p1Btn = document.querySelector(".p1Set button")
const p2Btn = document.querySelector(".p2Set button")
const menu = document.querySelector(".menu")
const startGame = document.querySelector(".menu h2")
const playerTurnCon = document.querySelector(".menu .turn")
const playerTurnX = document.querySelector(".menu .turn .X")
const playerTurnO = document.querySelector(".menu .turn .O")
const menuStart = document.querySelector(".menu button")
const startMenu = document.querySelector(".startMenu")
const startBtn = document.querySelector(".startBtn")
const restart = document.querySelector(".restart")
const exit = document.querySelector(".exit")
const options = document.querySelector(".options")
const midGame = document.querySelector(".midGameMenu")
const s = gameBoardSquares

sa = 0;
domm = 0
clickStart = 0
click = 0
clickX = 0
gameWon = false;
gamedraw = false;
turn = "";

const winningPosiblities = [
    [s[0] ,s[1] ,s[2]],
    [s[0] ,s[3] ,s[6]],
    [s[0] ,s[4] ,s[8]],
    [s[1] ,s[4] ,s[7]],
    [s[2] ,s[5] ,s[8]],
    [s[2] ,s[4] ,s[6]],
    [s[3] ,s[4] ,s[5]],
    [s[6] ,s[7] ,s[8]],
]
const wp = winningPosiblities

function clink(event) {
    [p1Btn.textContent,p2Btn.textContent] = [p2Btn.textContent,p1Btn.textContent]
    p1Btn.textContent === "X" ? p1Btn.style.backgroundColor = "#03a9f4" : p1Btn.style.backgroundColor = "#e91e63"
    p2Btn.textContent === "O" ? p2Btn.style.backgroundColor = "#e91e63" : p2Btn.style.backgroundColor = "#03a9f4"
}

p1Btn.addEventListener("click" , clink)
p2Btn.addEventListener("click" , clink)

startBtn.addEventListener("click" , function () {
    if (p1Btn.textContent === "X") {playerTurnO.style.display = "none"}
    else if (p1Btn.textContent === "O") {playerTurnX.style.display = "none"}
})

function hover(event) {
    if (p1Btn.textContent == "X") {
        if (clickX % 2 === 0) {event.currentTarget.style.backgroundColor = "#03a9f4"}
        else {event.currentTarget.style.backgroundColor = "#e91e63";}
    }
    else if (p1Btn.textContent == "O") {
        if (clickX % 2 === 0) {event.currentTarget.style.backgroundColor = "#e91e63";}
        else {event.currentTarget.style.backgroundColor = "#03a9f4"}
    }
}
function unhover(event) {
    if (!gameWon || !gamedraw) {
        event.currentTarget.style.backgroundColor = ""
    }
}


function addEventListeners() {
    gameBoardSquares.forEach(square => {
        square.addEventListener("mouseover", hover);
        square.addEventListener("mouseout" , unhover)
        square.addEventListener("click", clickHandler);
    });
}
function removeEventListeners() {
    gameBoardSquares.forEach(square => {
        square.removeEventListener("mouseover", hover);
        square.removeEventListener("mouseout" , unhover)
        square.removeEventListener("click", clickHandler);
    });
}
function remove2() {
    gameBoardSquares.forEach(square => {
        square.removeEventListener("mouseover", hover);
    });
}
function checkk() {
    if (p1Btn.textContent == "X") {
        if (clickX % 2 === 0) {
            XO.textContent = "X";
            playerTurnO.style.display = "flex"
            playerTurnX.style.display = "none"
        }
        else {
            XO.textContent = "O";
            playerTurnX.style.display = "flex"
            playerTurnO.style.display = "none"
        }
    }
    else if (p1Btn.textContent == "O") {
        if (clickX % 2 === 0) {
            XO.textContent = "O";
            playerTurnX.style.display = "flex"
            playerTurnO.style.display = "none"
        }
        else {
            XO.textContent = "X";
            playerTurnO.style.display = "flex"
            playerTurnX.style.display = "none"
        }
    } 
}

function clickHandler(event) {
    if (gameWon || gamedraw) return "";
    square = event.currentTarget
    
    if (square.textContent !== "") return

    XO = document.createElement("p")
    square.appendChild(XO)

    checkk()

    clickX++
    gamedraw = true;

    for (i = 0;i <= 7;i++) {
        const wpT1 = wp[i][0].textContent
        const wpT2 = wp[i][1].textContent
        const wpT3 = wp[i][2].textContent
        if (wpT1 == wpT2 && wpT1 == wpT3 && wpT1 != "") {
            if (wpT1 === "X") {
                wp[i][0].style.backgroundColor = "#03a9f4"
                wp[i][1].style.backgroundColor = "#03a9f4"
                wp[i][2].style.backgroundColor = "#03a9f4"
                playerTurnCon.textContent = "Player (X) Won"
                playerTurnCon.style.color = "#03a9f4"
            }
            else if (wpT1 === "O") {
                wp[i][0].style.backgroundColor = "#e91e63"
                wp[i][1].style.backgroundColor = "#e91e63"
                wp[i][2].style.backgroundColor = "#e91e63"
                playerTurnCon.textContent = "Player (O) Won"
                playerTurnCon.style.color = "#e91e63"
            }
            gameWon = true
            removeEventListeners()
            return;
        }
    }

    if (!gameWon) {
        gameBoardSquares.forEach(square => {
            if (square.textContent === "") {
                gamedraw = false;
            }
        });
    }
    if (gameWon) {
        removeEventListeners()
    }
    if (gamedraw) {
        remove2()
        gameWon = true;
        playerTurnCon.textContent = "It's A Draw"
        playerTurnCon.style.color = "#fff"
    }
} 

function reset() {
    sa++
    gameBoardSquares.forEach(square => {
        square.textContent = ""
        square.style.backgroundColor = ""
        click = 0
        if (domm % 2 == 0) {
            clickX = 0
        }
        else {
            clickX = 1
        }
        gameWon = false
        gamedraw = false
        square.addEventListener("click" , function () {
            
        })
    });
}

startBtn.addEventListener("click" , function () {
    playerTurnCon.style.display = "flex"
    menuStart.style.display = "none"
    midGame.style.display = "flex"
    startGame.style.display = "flex"
    startMenu.style.display = "none"
    options.style.display = "none"
    
    setTimeout(function() {
        startGame.style.display = "none"
    },1500)
    clickStart++;
    addEventListeners()
})
restart.addEventListener("click" , function () {
    domm++
    reset()
    addEventListeners()
})
menuStart.addEventListener("click" , function () {
    startMenu.style.display = "grid"
})