export class Obstacle {
    constructor(settings, container, styleLeft, height, top) {
        this.settings = settings;
        this.container = container;
        this.styleLeft = styleLeft;
        this.height = height;
        this.top = top;
    }
    initialize() {
        let result = document.createElement('div');                
        result.className = this.settings.obstacles.name;
        result.style.backgroundColor = this.settings.obstacles.backgroundColor;
        result.style.width = this.settings.obstacles.width;
        result.style.height = this.height;
        result.style.position = 'absolute';
        result.style.top = this.top;
        result.style.left = this.styleLeft;
        return result;
    }
}