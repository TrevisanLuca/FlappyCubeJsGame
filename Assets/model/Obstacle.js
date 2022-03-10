import { Mover } from "./imovable.js";

export const OBSTACLE = (function () {
    let result;
    return class Obstacle {
        constructor(settings, container, styleLeft, height, top) {
            this.settings = settings;
            this.container = container;
            this.styleLeft = styleLeft;
            this.height = height;
            this.top = top;
            this.initialize();
            this.getLimits();
            this.mover = new Mover(result);
        }
        initialize() {
            result = document.createElement('div');
            result.className = this.settings.obstacles.name;
            result.style.backgroundColor = this.settings.obstacles.backgroundColor;
            result.style.width = this.settings.obstacles.width;
            result.style.height = this.height;
            result.style.position = 'absolute';
            result.style.top = this.top;
            result.style.left = this.styleLeft;
            result.obj = this;
            let container = document.getElementById(this.settings.container.id);
            container.appendChild(result);
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
        move(obstacle) {
            obstacle.style.left = Number.parseInt(obstacle.style.left) - this.settings.obstacles.moveSpeed;
        }
    }
}())