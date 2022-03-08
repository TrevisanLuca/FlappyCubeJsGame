import { Obstacle } from "../model/obstacle.js";

export function generateObstacles(settings) {
    let remainingSpace = settings.container.height - settings.obstacles.spaceBetween - 2 * settings.obstacles.minLength;
    let borderWidth = Number.parseInt(settings.container.border);
    let firstObsEnd = settings.obstacles.minLength + remainingSpace * random_0_100();
    let container = document.getElementById(settings.container.id);
    let topmost = container.getBoundingClientRect().top + 1;
    let styleLeft = Number.parseInt(container.style.right) - settings.obstacles.width - borderWidth;


    let secondObsHeight = settings.container.height - firstObsEnd - settings.obstacles.spaceBetween;
    let secondObsTop = topmost + firstObsEnd + settings.obstacles.spaceBetween - borderWidth;

    let firstObstacle = (new Obstacle(settings, container, styleLeft, firstObsEnd, topmost)).initialize();
    let secondObstacle = (new Obstacle(settings, container, styleLeft, secondObsHeight, secondObsTop)).initialize();

    container.appendChild(firstObstacle);
    container.appendChild(secondObstacle);

    function random_0_100() {
        return Math.floor(Math.random() * 101) / 100;
    }
}