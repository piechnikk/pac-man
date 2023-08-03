import { Position, Direction } from "../interfaces";
import { GLOBAL_SPEED, GHOSTS_DIRECTIONS } from "../const";
import GameBoard from "./GameBoard";
import Pacman from "./Pacman";

export default class Ghost {
    DOMDiv: HTMLDivElement;
    board: GameBoard;
    name: string;
    offset: Position;
    position: Position;
    direction: Position;
    nextPosition: Position;
    nextDirection: Position | null;
    pacman: Pacman;
    target: Position;
    blinky: Ghost;
    div: HTMLDivElement
    animation: NodeJS.Timer;
    mode: string;
    scatterPosition: Position;
    slowMove: Boolean;
    i: number;
    level: number

    constructor(name: string, DOMDiv: HTMLDivElement, board: GameBoard, pacman: Pacman, level: number, blinky?: Ghost) {
        this.DOMDiv = DOMDiv;
        this.board = board;
        this.name = name;
        this.offset = { x: -4, y: -4 };
        if (this.name == "blinky") this.position = { x: 13, y: 11 };
        else if (this.name == "pinky") this.position = { x: 13, y: 14 };
        else if (this.name == "inky") this.position = { x: 11, y: 11 };
        else if (this.name == "clyde") this.position = { x: 15, y: 11 };
        this.direction = GHOSTS_DIRECTIONS[1]
        this.nextPosition = { x: this.position.x + this.direction.x, y: this.position.y + this.direction.y }
        this.pacman = pacman
        this.target = this.pacman.position
        this.mode = "scatter"
        if (this.name == "blinky") this.scatterPosition = { x: 25, y: -4 };
        else if (this.name == "pinky") this.scatterPosition = { x: 2, y: -4 };
        else if (this.name == "inky") this.scatterPosition = { x: 27, y: 31 };
        else if (this.name == "clyde") this.scatterPosition = { x: 0, y: 31 };
        this.slowMove = false
        this.i = 0
        this.level = level

        this.createGhost();
    }

    createGhost() {
        this.div = document.createElement("div");
        this.div.classList.add("ghost");
        this.div.classList.add(this.name);
        this.div.style.top = (this.position.y * 8) + this.offset.y + "px";
        this.div.style.left = (this.position.x * 8) + this.offset.x + "px";
        this.div.style.backgroundPositionX = "0px"
        this.div.style.backgroundPositionY = "-16px"
        this.DOMDiv.appendChild(this.div);
        this.startAnimation();
        this.setModes();
    }

    deleteGhost() {
        this.DOMDiv.removeChild(this.div);
        this.stopAnimation();
    }

    setModes() {
        if (this.level == 1) {
            let delay = 12 * 1000
            setTimeout(() => {
                if (this.mode != "frightened" && this.mode != "eaten" && this.mode != "points") this.setMode("chase")
            }, delay);

            delay += 20 * 1000
            setTimeout(() => {
                if (this.mode != "frightened" && this.mode != "eaten" && this.mode != "points") this.setMode("scatter")
            }, delay);

            delay += 7 * 1000
            setTimeout(() => {
                if (this.mode != "frightened" && this.mode != "eaten" && this.mode != "points") this.setMode("chase")
            }, delay);

            delay += 20 * 1000
            setTimeout(() => {
                if (this.mode != "frightened" && this.mode != "eaten" && this.mode != "points") this.setMode("scatter")
            }, delay);

            delay += 5 * 1000
            setTimeout(() => {
                if (this.mode != "frightened" && this.mode != "eaten" && this.mode != "points") this.setMode("chase")
            }, delay);

            delay += 20 * 1000
            setTimeout(() => {
                if (this.mode != "frightened" && this.mode != "eaten" && this.mode != "points") this.setMode("scatter")
            }, delay);

            delay += 5 * 1000
            setTimeout(() => {
                if (this.mode != "frightened" && this.mode != "eaten" && this.mode != "points") this.setMode("chase")
            }, delay);
        } else if (this.level >= 2 && this.level <= 4) {
            let delay = 12 * 1000
            setTimeout(() => {
                if (this.mode != "frightened" && this.mode != "eaten" && this.mode != "points") this.setMode("chase")
            }, delay);

            delay += 20 * 1000
            setTimeout(() => {
                if (this.mode != "frightened" && this.mode != "eaten" && this.mode != "points") this.setMode("scatter")
            }, delay);

            delay += 7 * 1000
            setTimeout(() => {
                if (this.mode != "frightened" && this.mode != "eaten" && this.mode != "points") this.setMode("chase")
            }, delay);

            delay += 20 * 1000
            setTimeout(() => {
                if (this.mode != "frightened" && this.mode != "eaten" && this.mode != "points") this.setMode("scatter")
            }, delay);

            delay += 5 * 1000
            setTimeout(() => {
                if (this.mode != "frightened" && this.mode != "eaten" && this.mode != "points") this.setMode("chase")
            }, delay);

            delay += (17 * 60000) + (13 * 1000) + 14
            setTimeout(() => {
                if (this.mode != "frightened" && this.mode != "eaten" && this.mode != "points") this.setMode("scatter")
            }, delay);

            delay += 1
            setTimeout(() => {
                if (this.mode != "frightened" && this.mode != "eaten" && this.mode != "points") this.setMode("chase")
            }, delay);
        } else {
            let delay = 10 * 1000
            setTimeout(() => {
                if (this.mode != "frightened" && this.mode != "eaten" && this.mode != "points") this.setMode("chase")
            }, delay);

            delay += 20 * 1000
            setTimeout(() => {
                if (this.mode != "frightened" && this.mode != "eaten" && this.mode != "points") this.setMode("scatter")
            }, delay);

            delay += 5 * 1000
            setTimeout(() => {
                if (this.mode != "frightened" && this.mode != "eaten" && this.mode != "points") this.setMode("chase")
            }, delay);

            delay += 20 * 1000
            setTimeout(() => {
                if (this.mode != "frightened" && this.mode != "eaten" && this.mode != "points") this.setMode("scatter")
            }, delay);

            delay += 5 * 1000
            setTimeout(() => {
                if (this.mode != "frightened" && this.mode != "eaten" && this.mode != "points") this.setMode("chase")
            }, delay);

            delay += (17 * 60000) + (17 * 1000) + 14
            setTimeout(() => {
                if (this.mode != "frightened" && this.mode != "eaten" && this.mode != "points") this.setMode("scatter")
            }, delay);

            delay += 1
            setTimeout(() => {
                if (this.mode != "frightened" && this.mode != "eaten" && this.mode != "points") this.setMode("chase")
            }, delay);
        }
    }

    setMode(mode: string) {
        this.mode = mode
        // if (mode == "chase" || mode == "scatter" || mode == "frightened") {
        //     //turn back

        //     // this.direction.x = this.direction.x * -1
        //     // this.direction.y = this.direction.y * -1
        // }
    }

    startAnimation() {
        this.animation = setInterval(() => {
            if (this.mode != "eaten") {
                let actualX = parseInt(this.div.style.backgroundPositionX.substring(0, this.div.style.backgroundPositionX.length - 2));
                if (actualX <= -16) actualX = 16;
                this.div.style.backgroundPositionX = actualX - 16 + "px";
            } else {
                this.div.style.backgroundPositionX = "-32px";
            }
        }, GLOBAL_SPEED * 4);
    }

    stopAnimation() {
        clearInterval(this.animation)
    }

    move() {
        if (this.mode != "points") {
            this.i = 0

            //step
            this.div.style.top = (this.nextPosition.y * 8) + this.offset.y + "px";
            this.div.style.left = (this.nextPosition.x * 8) + this.offset.x + "px";

            this.position = JSON.parse(JSON.stringify(this.nextPosition))
            this.nextPosition = { x: this.position.x + this.direction.x, y: this.position.y + this.direction.y };

            this.setTarget()
            this.setDirection()
            if (this.nextPosition.x < 0) this.nextPosition.x = 27
            else if (this.nextPosition.x > 27) this.nextPosition.x = 0
        }

    }

    setTarget() {
        let x: number = 13;
        let y: number = 11;
        let tempX, tempY: number;
        if (!this.board.divs[this.position.y][this.position.x].classList.contains("lair")) {
            if (this.mode == "scatter") {
                x = this.scatterPosition.x
                y = this.scatterPosition.y
            } else if (this.mode == "chase") {
                if (this.name == "blinky") {
                    x = this.pacman.position.x
                    y = this.pacman.position.y
                } else if (this.name == "pinky") {
                    if (this.pacman.direction.movement.y == -1) {
                        x = this.pacman.position.x + (4 * this.pacman.direction.movement.y)
                        y = this.pacman.position.y + (4 * this.pacman.direction.movement.y)
                    } else {
                        x = this.pacman.position.x + (4 * this.pacman.direction.movement.x)
                        y = this.pacman.position.y + (4 * this.pacman.direction.movement.y)
                    }
                } else if (this.name == "inky") {
                    if (this.pacman.direction.movement.y == -1) {
                        tempX = this.pacman.position.x + (2 * this.pacman.direction.movement.y)
                        tempY = this.pacman.position.y + (2 * this.pacman.direction.movement.y)
                    } else {
                        tempX = this.pacman.position.x + (2 * this.pacman.direction.movement.x)
                        tempY = this.pacman.position.y + (2 * this.pacman.direction.movement.y)
                    }
                    if (this.blinky) {
                        x = tempX + (tempX - this.blinky.position.x)
                        y = tempY + (tempY - this.blinky.position.y)
                    }
                } else if (this.name == "clyde") {
                    let vectorToPacman = { x: Math.abs(this.position.x - this.pacman.position.x), y: Math.abs(this.position.y - this.pacman.position.y) }
                    let distanceToPacman = Math.sqrt(Math.pow(vectorToPacman.x, 2) + Math.pow(vectorToPacman.y, 2))

                    if (distanceToPacman < 8) {
                        x = this.scatterPosition.x
                        y = this.scatterPosition.y
                    } else {
                        x = this.pacman.position.x
                        y = this.pacman.position.y
                    }
                }
            } else if (this.mode == "eaten") {
                x = 13
                y = 11
                if (this.position.x == 13 && this.position.y == 11) {
                    this.setMode("chase")
                }
            }
        }
        this.target = { x: x, y: y }
    }

    setDirection() {
        let distance!: number;
        let nextDirection!: Position;
        let nextPosition!: Position;

        if (this.mode == "frightened") {
            let tempPosition!: Position;
            do {
                nextDirection = GHOSTS_DIRECTIONS[Math.floor(Math.random() * 4)]
                tempPosition = { x: this.position.x + nextDirection.x, y: this.position.y + nextDirection.y }
                if (tempPosition.x < 0) tempPosition.x = 27
                else if (tempPosition.x > 27) tempPosition.x = 0
            } while (!this.noWallCollision(tempPosition) || !this.noTurnBack(nextDirection) || !this.noGoUp(nextDirection))
            nextPosition = tempPosition
            this.div.style.backgroundPositionY = "-64px"
        } else {
            GHOSTS_DIRECTIONS.forEach((direction, i) => {
                let tempPosition = { x: this.position.x + direction.x, y: this.position.y + direction.y }

                if (tempPosition.x < 0) tempPosition.x = 27
                else if (tempPosition.x > 27) tempPosition.x = 0

                let x = Math.abs(this.target.x - tempPosition.x)
                let y = Math.abs(this.target.y - tempPosition.y)

                let tempDistance = Math.pow(x, 2) + Math.pow(y, 2)
                if ((!distance || tempDistance < distance) && this.noWallCollision(tempPosition) && this.noTurnBack(direction) && this.noGoUp(direction)) {
                    distance = tempDistance
                    nextDirection = direction
                    nextPosition = tempPosition

                    //rotation
                    this.div.style.backgroundPositionY = -16 * i + "px"
                }
            });
        }
        this.nextPosition = nextPosition
        this.direction = nextDirection
    }

    noWallCollision(position: Position): Boolean {
        return !this.board.checkCollision(position, "wall") || !this.board.checkCollision(position, "wall")
    }

    noTurnBack(direction: Position): Boolean {
        return (this.direction.x == -1 && direction.x != 1) || (this.direction.x == 1 && direction.x != -1) || (this.direction.y == -1 && direction.y != 1) || (this.direction.y == 1 && direction.y != -1)
    }
    noGoUp(direction: Position): Boolean {
        if ((this.position.y == 11 || this.position.y == 23) && this.position.x >= 11 && this.position.x <= 16) {
            if (direction.y == 0) return true
            else return false
        } else {
            return true
        }
    }

    checkPacManCollision(): Boolean {
        return (this.position.x == this.pacman.position.x && this.position.y == this.pacman.position.y)
    }

    dead() {
        this.setMode("eaten")
    }

    step() {
        if (this.mode != "points") {
            if (this.mode == "frightened") {
                this.div.style.top = (this.position.y * 8) + ((this.direction.y * this.i) / 2) + this.offset.y + "px";
                this.div.style.left = (this.position.x * 8) + ((this.direction.x * this.i) / 2) + this.offset.x + "px";
                if (this.i >= 15) this.i = -1
            } else {
                this.div.style.top = (this.position.y * 8) + (this.direction.y * this.i) + this.offset.y + "px";
                this.div.style.left = (this.position.x * 8) + (this.direction.x * this.i) + this.offset.x + "px";
                if (this.i >= 7) this.i = -1

            }
            this.i++
        }
        // console.log(this.position, this.direction, this.i,);

    }
    startFrightenedAnim() {
        let i = false
        let x = setInterval(() => {
            if (i) this.div.style.backgroundPositionY = "-64px"
            else this.div.style.backgroundPositionY = "-80px"
        }, 500)
        setTimeout(() => {
            clearInterval(x)
        }, 3000);
    }

}
