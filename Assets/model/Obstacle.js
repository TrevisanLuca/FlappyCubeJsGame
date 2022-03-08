export class Obstacle {
    constructor(fullSettings) {
        this.settings = fullSettings;
        this.remainingSpace = fullSettings.container.height - fullSettings.obstacles.spaceBetween - 2 * fullSettings.obstacles.minLength;
        this.borderWidth = Number.parseInt(fullSettings.container.border);
        this.firstObsEnd = fullSettings.obstacles.minLength + this.remainingSpace * Obstacle.random_0_100();
    }
    static initialize(newObstacle) {
        let result = document.createElement('div');
        let settings = newObstacle.settings.obstacles;
        let topmost = document.getElementById('container').getBoundingClientRect().top + 1;
        result.className = settings.name;
        result.style.backgroundColor = settings.backgroundColor;
        result.style.width = settings.width;
        result.style.height = newObstacle.firstObsEnd;
        result.style.position = 'absolute';
        result.style.top = topmost;
        result.style.left = Number.parseInt(container.style.right) - settings.width - newObstacle.borderWidth;
        return result;
    }
    static random_0_100() {
        return Math.floor(Math.random() * 101) / 100;
    }
}