import { LEVEL, GLOBAL_SPEED, POWER_PILL_TIME } from "./const";
import GameBoard from "./components/GameBoard";
import Ghost from "./components/Ghost";
import Pacman from "./components/Pacman";


// let soundDot = require("./assets/munch.wav")
// let soundPill = require("./assets/pill.wav")
// let soundGameStart = require("./assets/aah.mp3")
// let soundGameOver = require("./assets/death.wav")
// let soundGhost = require("./assets/eat_ghost.wav")
import soundDotAudio from './assets/sounds/munch.wav';
import soundPillAudio from './assets/sounds/pill.wav';
import soundGameStartAudio from './assets/sounds/game_start.wav';
import mainAudio from './assets/sounds/main.wav';
import soundGameOverAudio from './assets/sounds/death.wav';
import soundGhostAudio from './assets/sounds/eat_ghost.wav';
import eatenGhostAudio from './assets/sounds/eaten.wav';
import fruitEatAudio from './assets/sounds/fruitEatAudio.wav';

const soundGameStart = new Audio(soundGameStartAudio);
const main = new Audio(mainAudio);
main.loop = true
const soundPill = new Audio(soundPillAudio);
soundPill.loop = true
const soundGameOver = new Audio(soundGameOverAudio);
const soundGhost = new Audio(soundGhostAudio);
const eatenGhost = new Audio(eatenGhostAudio);
const fruitEat = new Audio(fruitEatAudio);

const gameDiv = <HTMLDivElement>document.getElementById("game");
const scoreDiv = <HTMLDivElement>document.getElementById("score");
const highscoreDiv = <HTMLDivElement>document.getElementById("highscore");
// let board.fruitDiv = <HTMLDivElement>document.getElementById("fruit");

//zmienne
let score = 0;
let gameWin = false;
let powerPillTimer: NodeJS.Timer;
let interval: NodeJS.Timer;
let i = 0;
let lives = 3;
let level = 1
let eatenGhosts = 0
let fruits = 0
let fruitsBoolean = false
let fruitsTimeout: NodeJS.Timeout;


let board: GameBoard;
let pacman: Pacman;
let ghosts: Ghost[] = [];

let startGameButton = document.getElementById("startGame")
if(startGameButton){
    startGameButton.addEventListener("click", ()=> {
        document.getElementById("scoreDiv")?.classList.remove("hide")
        document.getElementById("liveContainer")?.classList.remove("hide")
        startGameButton?.classList.add("hide")
        startGame()
    })
}


document.addEventListener("keydown", (e) => {
    if (gameWin && e.keyCode == 17) {
        nextLevel()
    }
})

function playDotAudio() {

    const soundDot = new Audio(soundDotAudio);
    soundDot.play();
}

function nextLevel() {
    level++
    gameWin = false;
    for (const ghost of ghosts) {
        ghost.deleteGhost()
    }
    ghosts = []
    board = new GameBoard(gameDiv, LEVEL)
    pacman = new Pacman(gameDiv, board)
    ghosts.push(new Ghost("blinky", gameDiv, board, pacman, level))
    ghosts.push(new Ghost("pinky", gameDiv, board, pacman, level))
    ghosts.push(new Ghost("inky", gameDiv, board, pacman, level, ghosts[0]))
    ghosts.push(new Ghost("clyde", gameDiv, board, pacman, level))

    board.fruitDiv = <HTMLDivElement>document.getElementById("fruit")
    fruitsTimeout = setTimeout(() => {
        board.fruitDiv.classList.remove("hide")
        if (fruits < 12) board.fruitDiv.style.backgroundPositionX = fruits * (-16) + "px"
        else board.fruitDiv.style.backgroundPositionX = "192px"
        fruitsBoolean = true
        fruitsTimeout = setTimeout(() => {
            board.fruitDiv.classList.add("hide")
            fruitsBoolean = false
        }, 10000);
    }, 15000);

    soundGameStart.play()

    // Gameloop
    setTimeout(() => {
        main.play()
        interval = setInterval(() => gameLoop(), GLOBAL_SPEED);
    }, 5000);
}

function gameOver() {
    clearTimeout(fruitsTimeout)
    board.fruitDiv.classList.add("hide")
    fruitsBoolean = false
    board.showGameStatus(gameWin);
    main.pause()
    soundPill.pause()
    soundGhost.pause()
    eatenGhost.pause()

    clearInterval(interval);
}

function pacmanDead() {

    // if (fruitsTimeout)
    clearTimeout(fruitsTimeout)
    // if (!board.fruitDiv.classList.contains("hide"))
    board.fruitDiv.classList.add("hide")
    fruitsBoolean = false

    pacman.dead()
    for (const ghost of ghosts) {
        ghost.deleteGhost()
    }
    ghosts = []
    main.pause()
    soundPill.pause()
    soundGameOver.play()
    clearInterval(interval);
    lives--
    let x = <HTMLDivElement>document.getElementById("lives")
    if (lives == 2) {
        x.style.backgroundPositionY = "-64px"
    } else {
        x.classList.add("hide")
    }
    if (lives <= 0) {
        gameOver()
    } else {
        setTimeout(() => {
            ghosts.push(new Ghost("blinky", gameDiv, board, pacman, level))
            ghosts.push(new Ghost("pinky", gameDiv, board, pacman, level))
            ghosts.push(new Ghost("inky", gameDiv, board, pacman, level, ghosts[0]))
            ghosts.push(new Ghost("clyde", gameDiv, board, pacman, level))

            fruitsTimeout = setTimeout(() => {
                board.fruitDiv.classList.remove("hide")
                if (fruits < 12) board.fruitDiv.style.backgroundPositionX = fruits * (-16) + "px"
                else board.fruitDiv.style.backgroundPositionX = "192px"
                fruitsBoolean = true
                fruitsTimeout = setTimeout(() => {
                    board.fruitDiv.classList.add("hide")
                    fruitsBoolean = false
                }, 10000);
            }, 15000);

            soundGameStart.play()
            pacman.resurection()

            // Gameloop
            setTimeout(() => {
                main.play()
                interval = setInterval(() => gameLoop(), GLOBAL_SPEED);
            }, 5000);
        }, 2000);
    }
}
//----------------------------------------------------------------------------------------------------------
// clearTimeout(fruitsTimeout)
// board.fruitDiv.classList.add("hide")
// fruitsBoolean = false
//----------------------------------------------------------------------------------------------------------

function startGame() {
    score = 0;
    gameWin = false;

    board = new GameBoard(gameDiv, LEVEL)
    pacman = new Pacman(gameDiv, board)
    ghosts.push(new Ghost("blinky", gameDiv, board, pacman, level))
    ghosts.push(new Ghost("pinky", gameDiv, board, pacman, level))
    ghosts.push(new Ghost("inky", gameDiv, board, pacman, level, ghosts[0]))
    ghosts.push(new Ghost("clyde", gameDiv, board, pacman, level))

    fruitsTimeout = setTimeout(() => {
        console.log("showww", board.fruitDiv);

        board.fruitDiv.classList.remove("hide")
        if (fruits < 12) board.fruitDiv.style.backgroundPositionX = fruits * (-16) + "px"
        else board.fruitDiv.style.backgroundPositionX = "192px"
        fruitsBoolean = true
        fruitsTimeout = setTimeout(() => {
            board.fruitDiv.classList.add("hide")
            fruitsBoolean = false
        }, 10000);
    }, 15000);

    soundGameStart.play()

    // Gameloop
    setTimeout(() => {
        main.play()
        interval = setInterval(() => gameLoop(), GLOBAL_SPEED);
    }, 5000);
}


function gameLoop() {
    if (pacman.noWallCollision()) {
        pacman.step(i)
    }


    ghosts.forEach(ghost => ghost.step());
    if (i == 8) {
        i = 0
        // Move Pacman
        if (pacman.noWallCollision()) {
            pacman.move()
        }

        //Move ghosts and check collision with pac-man
        ghosts.forEach(ghost => {
            if (ghost.mode == "frightened") {
                if (ghost.checkPacManCollision()) {
                    ghost.stopAnimation()
                    ghost.setMode("points")
                    ghost.div.classList.add("points")
                    console.log(eatenGhosts);

                    ghost.div.style.backgroundPositionX = - 16 * eatenGhosts + "px";
                    eatenGhosts++
                    score += 200 * eatenGhosts
                    setTimeout(() => {
                        ghost.startAnimation()
                        ghost.dead()
                        ghost.div.classList.remove("points")
                    }, 1000);
                    soundGhost.play()
                    eatenGhost.play()
                }

                if (ghost.slowMove) { ghost.move() }
                ghost.slowMove = !ghost.slowMove

                if (ghost.checkPacManCollision() && ghost.mode == "frightened") {
                    ghost.stopAnimation()
                    ghost.setMode("points")
                    ghost.div.classList.add("points")
                    console.log(eatenGhosts);

                    ghost.div.style.backgroundPositionX = - 16 * eatenGhosts + "px";
                    eatenGhosts++
                    score += 200 * eatenGhosts
                    setTimeout(() => {
                        ghost.startAnimation()
                        ghost.dead()
                        ghost.div.classList.remove("points")
                    }, 1000);
                    soundGhost.play()
                    eatenGhost.play()
                }
            } else if (ghost.mode == "chase" || ghost.mode == "scatter") {
                if (ghost.checkPacManCollision() && ghost.name != "blinky") { pacmanDead() }

                ghost.move()

                if (ghost.checkPacManCollision() && ghost.name != "blinky") { pacmanDead() }
            } else {
                ghost.move()
            }
        });

        // Check if pacman eats a dot
        if (board.checkCollision(pacman.position, "dot")) {
            playDotAudio()
            board.removeElement(pacman.position, ["dot"]);
            board.dotCount--;
            score += 10;
        }

        // Check if pacman eats a power pill
        if (board.checkCollision(pacman.position, "pill")) {
            soundPill.play()
            board.removeElement(pacman.position, ["pill"]);
            pacman.powerPill = true;
            score += 50;
            main.pause()

            ghosts.forEach(ghost => {
                if (ghost.mode != "eaten") {
                    eatenGhosts = 0
                    ghost.setMode("frightened")
                }
            });

            setTimeout(() => {
                ghosts.forEach(ghost => {
                    if (ghost.mode == "frightened") {
                        ghost.startFrightenedAnim()
                    }
                });
            }, POWER_PILL_TIME - 3000);

            clearTimeout(powerPillTimer);
            powerPillTimer = setTimeout(() => {
                pacman.powerPill = false
                ghosts.forEach(ghost => {
                    if (ghost.mode != "eaten") ghost.setMode("chase")
                    main.play()
                });
                soundPill.pause()
            }, POWER_PILL_TIME);
        }

        // Check if pacman eat fruit
        if (((pacman.position.x == 13 && pacman.position.y == 17) || (pacman.position.x == 14 && pacman.position.y == 17)) && fruitsBoolean) {
            console.log(fruits * (-16) + "px");

            if (fruits < 12) board.fruitDiv.style.backgroundPositionX = fruits * (-16) + "px"
            else board.fruitDiv.style.backgroundPositionX = "192px"
            score += 100 + (200 * fruits)
            fruits++
            board.fruitDiv.classList.add("points1")
            fruitsBoolean = false
            setTimeout(() => {
                if (fruits < 12) board.fruitDiv.style.backgroundPositionX = fruits * (-16) + "px"
                else board.fruitDiv.style.backgroundPositionX = "192px"
                clearTimeout(fruitsTimeout)
                board.fruitDiv.classList.add("hide")
                board.fruitDiv.classList.remove("points1")
            }, 1000);

            fruitEat.play()
        }

        // Check if all dots have been eaten
        if (board.dotCount == 0) {
            gameWin = true;
            gameOver();
        }

        // Show new score
        scoreDiv.innerText = "" + score
        highscoreDiv.innerText = "" + score
    }
    i++
}