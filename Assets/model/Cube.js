import { Mover } from "./imovable.js";

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
            this.getLimits();
            result.mover = new Mover(result, settings.cube.moveSpeed);
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
        getLimits() {
            result.limits = {
                topmost: 0,
                leftmost: 0,
                bottommost: 0,
                rightmost: 0
            }
            let containerPos = document.getElementById(this.settings.container.id).getBoundingClientRect();
            result.limits.topmost = containerPos.top + this.containerBorder;
            result.limits.bottommost = containerPos.bottom - this.height - this.containerBorder;
            result.limits.leftmost = containerPos.left + this.containerBorder;
            result.limits.rightmost = containerPos.right - this.width - this.containerBorder;
        }
        move(keyCode) {
            switch (keyCode) {
                case 38:
                    //UP
                    this.mover.moveUp();
                    break;
                case 40:
                    //DOWN
                    this.mover.moveDown();
                    break;
                case 37:
                    //LEFT
                    this.mover.moveLeft();
                    break;
                case 39:
                    //RIGHT
                    this.mover.moveRight();
                    break;
                default:
            }
        }
    }
}())