import { BOARD_WIDTH, CELL_SIZE, CLASS_LIST } from "../const";
import { Level, Position } from "../interfaces";
import Pacman from "./Pacman";

export default class GameBoard {
    dotCount: number;
    divs: HTMLDivElement[][];
    DOMDiv: HTMLDivElement;
    fruitDiv: HTMLDivElement;
    constructor(DOMDiv: HTMLDivElement, level: Level) {
        this.dotCount = 0;
        this.divs = [];
        this.DOMDiv = DOMDiv;


        this.createBoard(level);
    }

    showGameStatus(gameWin: boolean) {
        const div = document.createElement("div");
        div.classList.add("game-status");
        div.innerHTML = `${gameWin ? "WIN" : "GAME OVER"}`;
        this.DOMDiv.appendChild(div);
    }

    createBoard(level: number[][]) {
        this.dotCount = 0;
        this.divs = [];
        this.DOMDiv.innerHTML = "";

        this.fruitDiv = document.createElement("div")
        this.fruitDiv.id = "fruit"
        this.fruitDiv.classList.add("hide")
        this.DOMDiv.appendChild(this.fruitDiv)
        console.log(this.fruitDiv);

        this.DOMDiv.style.gridTemplateColumns = "repeat(" + BOARD_WIDTH + ", " + CELL_SIZE + "px)";

        for (let y = 0; y < level.length; y++) {
            this.divs.push([]);
            for (let x = 0; x < level[y].length; x++) {
                const cellType = level[y][x];
                const div = document.createElement("div");
                div.classList.add("square", CLASS_LIST[cellType]);
                div.style.width = CELL_SIZE + "px";
                div.style.height = CELL_SIZE + "px";
                this.DOMDiv.appendChild(div);
                this.divs[y].push(div);

                // Add dots
                if (CLASS_LIST[cellType] == "dot") this.dotCount++;
            }
        }
    }

    checkCollision(position: Position, collider: string): Boolean {
        return this.divs[position.y][position.x].classList.contains(collider)
    }

    removeElement(pos: Position, classes: string[]) {
        this.divs[pos.y][pos.x].classList.remove(...classes);
    }
}