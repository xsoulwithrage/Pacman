const scoreDisplay = document.getElementById('score')
const mobileUpBtn = document.getElementById('mobile-up-btn')
const mobileDownBtn = document.getElementById('mobile-down-btn')
const mobileLeftBtn = document.getElementById('mobile-left-btn')
const mobileRightBtn = document.getElementById('mobile-right-btn')

const width = 28
const grid = document.querySelector('.grid')
const squares = [];
const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,1,1,1,1,1,1,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 349, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 350, 500)
]

let pacmanCurrentIndex = 490;

let score = 0;

createBoard();
squares[pacmanCurrentIndex].classList.add('pacman', "pacman-right")
document.addEventListener("keydown", control);
startBtn.addEventListener("click", startGame);
mobileUpBtn.addEventListener("mousedown", mobileUp);
mobileDownBtn.addEventListener("mousedown", mobileDown);
mobileLeftBtn.addEventListener("mousedown", mobileLeft);
mobileRightBtn.addEventListener("mousedown", mobileRight);



function startGame() {

    createBoard();

    resetGame();

    hideStartScreen();
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add("ghost")
    });

    ghosts.forEach(ghost => moveGhost(ghost))

}

function hideStartScreen() {
    const startScreen = document.getElementById("startScreen");
    startScreen.style.display = "none";
}

function checkForGameOver() {
    const currentPos = squares[pacmanCurrentIndex];

    if(currentPos.classList.contains("ghost") && !currentPos.classList.contains("scared-ghost")) {

        ghosts.forEach(ghost => clearInterval(ghost.timerId))

        document.removeEventListener("keyup", control);

        const startScreen = document.getElementById("startScreen");
        const endGameMsg = document.getElementById("startTitle");
        const msg = `¡Fin del juego! 
                    Puntos: ${score}`
        endGameMsg.textContent = msg;
        startScreen.style.display = "block";
        startBtn.textContent = "Jugar de nuevo";

        
        
    }
    
    
}

function createBoard() {


   
    for( let i = 0; i < layout.length; i++) {

        const square = document.createElement("div");

        grid.appendChild(square);

        squares.push(square);

        if(layout[i] === 0) {
            squares[i].classList.add("pac-dot");
        }else if(layout[i] === 1) {
            squares[i].classList.add("wall");
        }else if(layout[i] === 2) {
            squares[i].classList.add("ghost-lair");
        }else if(layout[i] === 3) {
            squares[i].classList.add("power-pellet");
        }else if(layout[i] === 4) {
            squares[i].classList.add("empty");
        }
    }
}

function control(e) {

    switch(e.key) {
        case "ArrowUp":
        moveUp();
        eatPacDot();
        eatPowerPellet()
        eatGhost();
        checkForGameOver();
        break;

        case "ArrowDown":
        moveDown();
        eatPacDot();
        eatPowerPellet()
        eatGhost();
        checkForGameOver();
        break;

        case "ArrowLeft":
        moveToLeft();
        eatPacDot();
        eatPowerPellet()
        eatGhost();
        checkForGameOver();
        break;

        case "ArrowRight":
        moveToRight();
        eatPacDot();
        eatPowerPellet()
        eatGhost();
        checkForGameOver();
        break;
    }
}

function mobileUp() {
    moveUp();
    eatPacDot();
    eatPowerPellet()
    checkForGameOver();
}

function mobileDown() {
    moveDown();
    eatPacDot();
    eatPowerPellet()
    checkForGameOver();
}

function mobileLeft() {
    moveToLeft();
    eatPacDot();
    eatPowerPellet()
    checkForGameOver();
}

function mobileRight() {
    moveToRight();
    eatPacDot();
    eatPowerPellet()
    checkForGameOver();
}

function moveUp() {
    const nextIndex = pacmanCurrentIndex - width;
   
    if(nextIndex >= 0 && !squares[nextIndex].classList.contains("wall")) {
        
        squares[pacmanCurrentIndex].classList.remove("pacman-left", "pacman-right", "pacman-up", "pacman-down", "pacman");
        pacmanCurrentIndex = nextIndex;
        squares[pacmanCurrentIndex].classList.add("pacman-up", "pacman");
    }
}

function moveDown() {

    const nextIndex = pacmanCurrentIndex + width;
    const nextPos = squares[nextIndex];
    const lastIndex = width * width;

    if(nextIndex < lastIndex) {

        if(nextPos.classList.contains("wall")){
            console.log("HIT A WALL")

        }else if(nextPos.classList.contains("ghost-lair")){
            console.log("GHOST_LAIR");
        }else {

            squares[pacmanCurrentIndex].classList.remove("pacman-left", "pacman-right", "pacman-up", "pacman-down", "pacman");
             pacmanCurrentIndex = nextIndex;
             squares[pacmanCurrentIndex].classList.add("pacman-down", "pacman");
        }
    }
}

function moveToLeft() {

    const lastIndex = pacmanCurrentIndex % width;
    const nextIndex = pacmanCurrentIndex - 1;
    

    if(lastIndex !== 0 && !squares[nextIndex].classList.contains("wall")) {

        squares[pacmanCurrentIndex].classList.remove("pacman-left", "pacman-right", "pacman-up", "pacman-down", "pacman");
        pacmanCurrentIndex = nextIndex;
        squares[pacmanCurrentIndex].classList.add("pacman-left", "pacman");

        if(pacmanCurrentIndex === 364) {

            squares[pacmanCurrentIndex].classList.remove("pacman-left", "pacman-right", "pacman-up", "pacman-down", "pacman");
            pacmanCurrentIndex = 391;
            squares[pacmanCurrentIndex].classList.add("pacman-left", "pacman");
    }
}


    
    
}

function moveToRight() {

    const nextIndex = pacmanCurrentIndex + 1;
    const lastIndex = pacmanCurrentIndex % width;

    

    if(lastIndex < width - 1 && !squares[nextIndex].classList.contains("wall")) {

        squares[pacmanCurrentIndex].classList.remove("pacman-left", "pacman-right", "pacman-up", "pacman-down", "pacman");
        pacmanCurrentIndex = nextIndex;
        squares[pacmanCurrentIndex].classList.add("pacman-right", "pacman");

        if(pacmanCurrentIndex === 391) {
            
            squares[pacmanCurrentIndex].classList.remove("pacman-left", "pacman-right", "pacman-up", "pacman-down", "pacman");
            pacmanCurrentIndex = 364;
            squares[pacmanCurrentIndex].classList.add("pacman-right", "pacman");
        }
    }
}

function eatPacDot() {
    const currentPos = squares[pacmanCurrentIndex];

    if(currentPos.classList.contains("pac-dot")) {
        currentPos.classList.remove("pac-dot");
        score ++;
        scoreDisplay.textContent = score;
    }
}

function eatPowerPellet() {
    let currentPos = squares[pacmanCurrentIndex];

    if(currentPos.classList.contains("power-pellet")) {
        currentPos.classList.remove("power-pellet");
        score += 10;
        scoreDisplay.textContent = score;
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhosts, 10000);
    }
}

function eatGhost() {
    if(squares[pacmanCurrentIndex].classList.contains("scare-ghost")) {
        squares[ghost.currentIndex].classList.remove('scared-ghost', 'ghost', ghost.className)
        score += 100;
        scoreDisplay.textContent = score;
        ghost.currentIndex = ghost.startIndex;
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
    }
}

function moveGhost(ghost) {
    const directions = [ -1, +1, -width, +width ]
    let len = directions.length;
    let randDirection = Math.floor(Math.random() * len)
    let direction = directions[randDirection];

    ghost.timerId = setInterval(function() {
        let nextIndex = ghost.currentIndex + direction;
        let nextPos = squares[nextIndex];
        if(!nextPos.classList.contains("wall") && !nextPos.classList.contains("ghost")){

            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost")

            ghost.currentIndex += direction

            squares[ghost.currentIndex].classList.add(ghost.className)
            squares[ghost.currentIndex].classList.add("ghost")
        }else {
            randDirection = Math.floor(Math.random() * len)
            direction = directions[randDirection]
        }

        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
            if(squares[ghost.currentIndex].classList.contains("pacman")) {
                squares[ghost.currentIndex].classList.remove('scared-ghost', 'ghost', ghost.className)
                score += 100;
                scoreDisplay.textContent = score;
                ghost.currentIndex = ghost.startIndex;
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
            }
        }
        checkForGameOver();
    }, ghost.speed )
}

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false);
}

function resetGame() {

    score = 0;
    scoreDisplay.textContent = 0;
    squares[pacmanCurrentIndex].classList.remove("pacman-left", "pacman-right", "pacman-up", "pacman-down", "pacman");
    pacmanCurrentIndex = 490;
    squares[pacmanCurrentIndex].classList.add("pacman-right", "pacman");

    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove("ghost")
    });

    ghosts.forEach(ghost => {
        ghost.currentIndex = ghost.startIndex;
    })
}















