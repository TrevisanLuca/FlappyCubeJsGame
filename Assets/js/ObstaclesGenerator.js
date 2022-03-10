import { OBSTACLE } from "../model/obstacle.js";

export function generateObstacles(settings) {
    let remainingSpace = settings.container.height - settings.obstacles.spaceBetween - 2 * settings.obstacles.minLength;
    let borderWidth = Number.parseInt(settings.container.border);
    let firstObsEnd = settings.obstacles.minLength + remainingSpace * random_0_100();
    let container = document.getElementById(settings.container.id);
    let topmost = container.getBoundingClientRect().top + borderWidth
    let styleLeft = Number.parseInt(container.style.right) - settings.obstacles.width - borderWidth;


    let secondObsHeight = settings.container.height - firstObsEnd - settings.obstacles.spaceBetween + borderWidth;
    let secondObsTop = topmost + firstObsEnd + settings.obstacles.spaceBetween - borderWidth;

    new OBSTACLE(settings, container, styleLeft, firstObsEnd, topmost); //upperObs
    new OBSTACLE(settings, container, styleLeft, secondObsHeight, secondObsTop); //lowerObs

    function random_0_100() {
        return Math.floor(Math.random() * 101) / 100;
    }
}