import setup from './Setup.js';
import { generateObstacles } from "./ObstaclesGenerator.js";

export function startGame(settings, cube, container, scoreboard, buttonContainer, startButton) {

    let cubePos = cube.getBoundingClientRect();
    cube.style.top = cubePos.top;
    cube.style.left = cubePos.left;

    let containerPos = container.getBoundingClientRect();
    container.style.top = containerPos.top;
    container.style.bottom = containerPos.bottom;
    container.style.left = containerPos.left;
    container.style.right = containerPos.right;

    let topmost = containerPos.top + 1;
    let bottommost = containerPos.bottom - cubePos.height - 1;
    let leftmost = containerPos.left + 1;
    let rightmost = containerPos.right - cubePos.width - 1;

    let pointsCounter = 0;

    document.onkeydown = checkKey;

    generateObstacles(settings);

    let gameTimer = window.setInterval(moveObstacles, 100);

    function checkKey(e) {
        cube.move(e.keyCode, containerPos);
    }
    function moveObstacles() {
        let obstaclesList = container.getElementsByClassName(settings.obstacles.name);
        let obsDeleteList = new Array();
        for (let obstacle of obstaclesList) {
            obstacle.style.left = Number.parseInt(obstacle.style.left) - settings.obstacles.width;
            if (isTouching(obstacle, cube)) {
                endGame(gameTimer, buttonContainer, startButton);
            }
            if (Number.parseInt(obstacle.style.left) <= leftmost - 1) {
                //can't delete obstacles during for cycle, has to put it into a secondary list
                obsDeleteList.push(obstacle);
            }
        }
        if (obsDeleteList.length > 0) {
            for (let obstacleToDelete of obsDeleteList) {
                obstacleToDelete.parentNode.removeChild(obstacleToDelete);
            }
        }
        pointsCounter += 10;
        scoreboard.innerText = `${pointsCounter.toString()} Points`;
        if (pointsCounter % settings.game.genObsEvery === 0) { generateObstacles(settings); }
    }

    function isTouching(obstacle, myDiv) {
        let myDivPos = myDiv.getBoundingClientRect();
        let myObstaclePos = obstacle.getBoundingClientRect();
        if ((myObstaclePos.left > myDivPos.left && myObstaclePos.left < myDivPos.right)
            || (myObstaclePos.right > myDivPos.left && myObstaclePos.right < myDivPos.right)) {
            if ((myDivPos.top < myObstaclePos.bottom && myDivPos.top >= myObstaclePos.top)
                || (myDivPos.bottom <= myObstaclePos.bottom && myDivPos.bottom > myObstaclePos.top)) {
                return true;
            }
        }
        return false;
    }
}
function endGame(timer, buttonContainer, startButton) {
    window.clearInterval(timer);
    document.onkeydown = undefined;
    buttonContainer.hidden = false;
    startButton.innerText = `You lost!
                             Restart?`;
    startButton.onclick = setup;
    startButton.hidden = false;
}