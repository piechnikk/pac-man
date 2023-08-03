export interface Position {
    x: number;
    y: number;
}

export interface Direction {
    code: number;
    movement: Position;
    rotation: number;
}

export interface Keyboard {
    ArrowLeft: Direction;
    ArrowUp: Direction;
    ArrowRight: Direction;
    ArrowDown: Direction;
}

export interface NumberList extends Array<number> {
    [index: number]: number
}

export interface Level extends Array<NumberList> {
    [index: number]: NumberList
}

// export interface Character {
//     pos: Position;
//     speed: string;
//     dir: HTMLDivElement;
//     timer: Function;
//     shouldMove: () => boolean;
//     getNextMove: () => void;
//     makeMove: () => void;
//     setNewPos: (nextMovePos: Position) => void;
// }