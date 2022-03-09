export const CUBE = (function () {
    let result;
    return class Cube {
        constructor(settings) {
            this.width = settings.cube.width;
            this.height = settings.cube.height;
            this.backgroundColor = settings.cube.backgroundColor;
            this.containerBorder = Number.parseInt(settings.container.border);
            this.settings = settings;
            this.container = container;
            this.initialize();
        }
        initialize() {
            result = document.createElement('div');
            result.id = this.settings.cube.id;
            result.style.position = 'absolute';
            result.style.width = this.width;
            result.style.height = this.height;
            result.style.backgroundColor = this.backgroundColor;
            result.settings = this.settings;
            result.containerBorder = this.containerBorder;
            result.move = this.move;
            let container = document.getElementById(this.settings.container.id);
            container.appendChild(result);
            let myDivPos = result.getBoundingClientRect();
            result.style.top = Math.floor(container.getBoundingClientRect().bottom / 2 - this.settings.cube.height / 2);
            result.style.left = myDivPos.left;
        }
        move(keyCode) {
            let topPos = this.style.top;
            let leftPos = this.style.left;
            let newPos = 0;
            let containerPos = document.getElementById(this.settings.container.id).getBoundingClientRect();
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
}())