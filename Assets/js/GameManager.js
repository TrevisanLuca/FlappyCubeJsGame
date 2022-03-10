import { Mover } from "../model/imovable.js";
import getSettings from './GameSettings.js';
import { CONTAINER } from '../model/container.js'
import { CUBE } from "../model/cube.js";
import { STARTBUTTON } from "../model/StartButton.js";
import { generateObstacles } from "./ObstaclesGenerator.js";
import { newGame } from "./main.js";

export class GameManager {    
    setup(firstGame) {
        while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
        let settings = getSettings();

        new CONTAINER(settings.container);

        new Mover(new CUBE(settings));

        let pointSpan = document.createElement('span');
        pointSpan.id = 'points';
        pointSpan.innerText = '0 Points';
        document.body.appendChild(pointSpan);

        let buttonContainer = document.createElement('div');
        buttonContainer.id = 'buttonContainer';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'center';
        buttonContainer.style.alignItems = 'center';
        buttonContainer.style.margin = 0;
        buttonContainer.style.height = settings.container.height;

        new STARTBUTTON(settings, buttonContainer);

        document.getElementById(settings.container.id).appendChild(buttonContainer);

        if (!firstGame) { startButton.click() };//JS magic
    }
    startGame(settings, cube, container, scoreboard, buttonContainer, startButton) {
        //let cycles = 0;
        let leftmost = container.getBoundingClientRect().left + 1;

        let pointsCounter = 0;

        document.onkeydown = checkKey;

        generateObstacles(settings);
        requestAnimationFrame(moveObstacles);

        function checkKey(e) { cube.move(e.keyCode); }
        function moveObstacles() {
            let obstaclesList = container.getElementsByClassName(settings.obstacles.name);
            let obsDeleteList = new Array();
            let continueGame = true;
            for (let obstacle of obstaclesList) {
                obstacle.move
                //obstacle.obj.move(obstacle);
                //obstacle.style.left = Number.parseInt(obstacle.style.left) - 1;//settings.obstacles.width;
                if (isTouching(obstacle, cube)) {
                    newGame.endGame(buttonContainer, startButton);
                    continueGame = false;
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
            if (continueGame) {
                //cycles++; //todo
                pointsCounter += 2;//pointsCounter += settings.obstacles.moveSpeed;//todo
                scoreboard.innerText = `${pointsCounter.toString()} Points`;
                if (pointsCounter % 300 === 0) { generateObstacles(settings); }//if (cycles % 100 === 0) { generateObstacles(settings); }//todo
                if (pointsCounter % 300 === 0) { settings.obstacles.moveSpeed += 1 }//if ((cycles / settings.obstacles.moveSpeed) % 200 === 0) { settings.obstacles.moveSpeed += 1 }//todo
                requestAnimationFrame(moveObstacles);
            }
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
    endGame(buttonContainer, startButton) {
        document.onkeydown = undefined;
        buttonContainer.hidden = false;
        startButton.innerText = `You lost!
                             Restart?`;
        startButton.onclick = startButton.obj.end;
        startButton.hidden = false;
    }
}