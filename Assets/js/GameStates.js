import setup from './Setup.js';
import { Obstacle } from "../model/obstacle.js";

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
    generateObstacles();
    let gameTimer = window.setInterval(moveObstacles, 100);
    function random_0_100() {
        return Math.floor(Math.random() * 101) / 100;
    }
    function checkKey(e) {
        let topPos = cube.style.top;
        let leftPos = cube.style.left;
        let newPos = 0;
        switch (e.keyCode) {
            case 38:
                //UP
                newPos = Number.parseInt(topPos) - 10;
                cube.style.top = newPos < topmost ? topmost : newPos;
                break;
            case 40:
                //DOWN
                newPos = Number.parseInt(topPos) + 10;
                cube.style.top = newPos > bottommost ? bottommost : newPos;
                break;
            case 37:
                //LEFT
                newPos = Number.parseInt(leftPos) - 10;
                cube.style.left = newPos < leftmost ? leftmost : newPos;
                break;
            case 39:
                //RIGHT
                newPos = Number.parseInt(leftPos) + 10;
                cube.style.left = newPos > rightmost ? rightmost : newPos;
                break;
            case 190:
                //DOT .
                moveObstacles();
            default:
        }
    }
    function generateObstacles() {
        let remainingSpace = settings.container.height - settings.obstacles.spaceBetween - 2 * settings.obstacles.minLength;
        let borderWidth = Number.parseInt(settings.container.border);
        let firstObsEnd = settings.obstacles.minLength + remainingSpace * random_0_100();
        let firstDiv = Obstacle.initialize(new Obstacle(settings));
        //let firstDiv = document.createElement('div');
        //firstDiv.className = settings.obstacles.name;
        //firstDiv.style.backgroundColor = settings.obstacles.backgroundColor;
        //firstDiv.style.width = settings.obstacles.width;
        //firstDiv.style.height = firstObsEnd;
        //firstDiv.style.position = 'absolute';
        //firstDiv.style.top = topmost;
        //firstDiv.style.left = Number.parseInt(container.style.right) - settings.obstacles.width - borderWidth;
        container.appendChild(firstDiv);

        //returns start of second obstacle
        let secondDiv = document.createElement('div');
        secondDiv.className = settings.obstacles.name;
        secondDiv.style.backgroundColor = settings.obstacles.backgroundColor;
        secondDiv.style.width = settings.obstacles.width;
        secondDiv.style.height = containerPos.height - firstDiv.firstObsEnd - settings.obstacles.spaceBetween;
        secondDiv.style.position = 'absolute';
        secondDiv.style.top = topmost + Number.parseInt(firstDiv.style.height) + settings.obstacles.spaceBetween - borderWidth;
        secondDiv.style.left = Number.parseInt(container.style.right) - settings.obstacles.width - borderWidth;
        container.appendChild(secondDiv);
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
            generateObstacles();
        }
        pointsCounter += 10;
        scoreboard.innerText = `${pointsCounter.toString()} Points`;
        if (pointsCounter === 350) { generateObstacles(); }
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