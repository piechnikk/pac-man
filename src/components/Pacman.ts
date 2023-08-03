import { Position, Keyboard, Direction } from "../interfaces";
import { GLOBAL_SPEED, DIRECTIONS } from "../const";
import GameBoard from "./GameBoard";

export default class Pacman {
    DOMDiv: HTMLDivElement;
    board: GameBoard;
    offset: Position;
    position: Position;
    direction: Direction;
    nextPosition: Position;
    nextDirection: Direction | null;
    powerPill: Boolean;
    stop: Boolean;
    div: HTMLDivElement
    animation: NodeJS.Timer;

    constructor(DOMDiv: HTMLDivElement, board: GameBoard) {
        this.DOMDiv = DOMDiv;
        this.board = board;
        this.offset = { x: -4, y: -4 };
        this.position = { x: 13, y: 23 };
        this.direction = DIRECTIONS.ArrowLeft
        this.nextPosition = { x: this.position.x + this.direction.movement.x, y: this.position.y + this.direction.movement.y }
        this.powerPill = false
        this.stop = false

        this.createPacman();
        this.addKeyboard();
    }

    createPacman() {
        this.div = document.createElement("div");
        this.div.classList.add("pacman");
        this.div.style.top = (this.position.y * 8) + this.offset.y + "px";
        this.div.style.left = (this.position.x * 8) + this.offset.x + "px";
        this.div.style.backgroundPositionX = "0px"
        this.DOMDiv.appendChild(this.div);
        this.startAnimation();
    }

    startAnimation() {
        this.animation = setInterval(() => {
            let actualX = parseInt(this.div.style.backgroundPositionX.substring(0, this.div.style.backgroundPositionX.length - 2));
            if (actualX <= -48) actualX = 16;
            this.div.style.backgroundPositionX = actualX - 16 + "px";
        }, GLOBAL_SPEED * 2);
    }

    stopAnimation() {
        clearInterval(this.animation)
    }

    addKeyboard() {
        document.addEventListener("keydown", (e) => {
            this.handleKeyInput(e)
        })
    }

    handleKeyInput(e: KeyboardEvent) {
        if (e.keyCode >= 37 && e.keyCode <= 40 && !this.stop) {
            this.nextDirection = DIRECTIONS[e.key as keyof Keyboard];
            let tempNextPos = { x: this.position.x + this.nextDirection.movement.x, y: this.position.y + this.nextDirection.movement.y };
            if (!this.board.checkCollision(tempNextPos, "wall")) {
                this.direction = JSON.parse(JSON.stringify(this.nextDirection));
                this.nextPosition = JSON.parse(JSON.stringify(tempNextPos));
                this.div.style.transform = "rotate(" + this.direction.rotation + "deg)"
            }
        }
    }

    move() {
        if (!this.stop) {
            //turn
            this.div.style.transform = "rotate(" + this.direction.rotation + "deg)"

            //step
            this.div.style.top = (this.nextPosition.y * 8) + this.offset.y + "px";
            this.div.style.left = (this.nextPosition.x * 8) + this.offset.x + "px";

            this.position = JSON.parse(JSON.stringify(this.nextPosition))
            this.nextPosition = { x: this.position.x + this.direction.movement.x, y: this.position.y + this.direction.movement.y };

            if (this.nextPosition.x < 0) this.nextPosition.x = 27
            else if (this.nextPosition.x > 27) this.nextPosition.x = 0
        }
    }

    noWallCollision(): Boolean {
        let tempNextPos: Position;
        if (this.nextDirection) {
            tempNextPos = { x: this.position.x + this.nextDirection.movement.x, y: this.position.y + this.nextDirection.movement.y };
            if (tempNextPos.x < 0) tempNextPos.x = 27
            else if (tempNextPos.x > 27) tempNextPos.x = 0

            if (!this.board.checkCollision(tempNextPos, "wall")) {
                this.nextPosition = JSON.parse(JSON.stringify(tempNextPos))
                this.direction = JSON.parse(JSON.stringify(this.nextDirection))
                this.nextDirection = null
                return true;
            } else if (!this.board.checkCollision(this.nextPosition, "wall")) {
                return true;
            } else {
                return false;
            }
        } else if (!this.board.checkCollision(this.nextPosition, "wall")) {
            return true;

        } else {
            return false;
        }
    }
    startDeadAnimation() {
        let i = 0
        this.div.style.backgroundPositionX = "-64px";
        this.animation = setInterval(() => {
            let actualX = parseInt(this.div.style.backgroundPositionX.substring(0, this.div.style.backgroundPositionX.length - 2));
            this.div.style.backgroundPositionX = actualX - 16 + "px";
            if (actualX <= -224) {
                this.stopAnimation()
                this.div.classList.add("hide")
            }
        }, GLOBAL_SPEED * 8)
    }

    dead() {
        this.stopAnimation()
        // this.deadAnimation()
        this.position = { x: 13, y: 23 };
        this.direction = DIRECTIONS.ArrowLeft
        this.nextPosition = { x: this.position.x + this.direction.movement.x, y: this.position.y + this.direction.movement.y }
        // this.move()
        this.stop = true
        this.startDeadAnimation()
    }

    resurection() {
        this.startAnimation()
        this.div.style.top = (this.position.y * 8) + this.offset.y + "px";
        this.div.style.left = (this.position.x * 8) + this.offset.x + "px";
        this.stop = false
        this.div.classList.remove("hide")
    }

    step(i: number) {
        this.div.style.transform = "rotate(" + this.direction.rotation + "deg)"
        this.div.style.top = (this.position.y * 8) + (this.direction.movement.y * i) + this.offset.y + "px";
        this.div.style.left = (this.position.x * 8) + (this.direction.movement.x * i) + this.offset.x + "px";
    }
}
