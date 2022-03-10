export class Mover {
    constructor(object, moveSpeed) {
        this.obj = object;
        this.speed = moveSpeed;
        }    
    //these return true: has moved, or false: can't move/delete
    //elses could be removed; kept for readability
    moveLeft() {
        let newPos = Number.parseInt(this.obj.style.left) - this.speed;
        if (newPos < this.obj.limits.leftmost) {
            this.obj.style.left = this.obj.limits.leftmost;
            return false;
        }
        else {
            this.obj.style.left = newPos;
            return true;
        }
    }
    moveRight() {
        let newPos = Number.parseInt(this.obj.style.left) + this.speed;
        if (newPos > this.obj.limits.rightmost) {
            this.obj.style.left = this.obj.limits.rightmost;
            return false;
        }
        else {
            this.obj.style.left = newPos;
            return true;
        }
    }
    moveUp() {
        let newPos = Number.parseInt(this.obj.style.top) - this.speed;
        if (newPos < this.obj.limits.topmost) {
            this.obj.style.top = this.obj.limits.topmost;
            return false;
        }
        else {
            this.obj.style.top = newPos;
            return true;
        }
    }
    moveDown() {
        let newPos = Number.parseInt(this.obj.style.top) + this.speed;
        if (newPos > this.obj.limits.bottommost) {
            this.obj.style.top = this.obj.limits.bottommost;
            return false;
        }
        else {
            this.obj.style.top = newPos;
            return true;
        }
    }
}