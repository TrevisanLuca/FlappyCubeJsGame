export class Cube {
    constructor(settings) {
        this.width = settings.cube.width;
        this.height = settings.cube.height;
        this.backgroundColor = settings.cube.backgroundColor;
        this.containerBorder = Number.parseInt(settings.container.border);
        this.settings = settings;
    }
    initialize() {
        let result = document.createElement('div');
        result.id = 'myCube';
        result.style.position = 'absolute';
        result.style.width = this.width;
        result.style.height = this.height;
        result.style.backgroundColor = this.backgroundColor;
        result.settings = this.settings;
        result.containerBorder = this.containerBorder;
        result.move = this.move;
        return result;
    }
    move(keyCode, containerPos) {
        let topPos = this.style.top;
        let leftPos = this.style.left;
        let newPos = 0;
        switch (keyCode) {
            case 38:
                //UP
                let topmost = containerPos.top + this.containerBorder;
                newPos = Number.parseInt(topPos) - this.settings.cube.moveSpeed;
                this.style.top = newPos < topmost ? topmost : newPos;
                break;
            case 40:
                //DOWN
                let bottommost = containerPos.bottom - this.height - this.containerBorder;
                newPos = Number.parseInt(topPos) + this.settings.cube.moveSpeed;
                this.style.top = newPos > bottommost ? bottommost : newPos;
                break;
            case 37:
                //LEFT
                let leftmost = containerPos.left + this.containerBorder;
                newPos = Number.parseInt(leftPos) - this.settings.cube.moveSpeed;
                this.style.left = newPos < leftmost ? leftmost : newPos;
                break;
            case 39:
                //RIGHT
                let rightmost = containerPos.right - this.width - this.containerBorder;
                newPos = Number.parseInt(leftPos) + this.settings.cube.moveSpeed;
                this.style.left = newPos > rightmost ? rightmost : newPos;
                break;
            default:
        }
    }
}