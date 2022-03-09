import { generateObstacles } from "./ObstaclesGenerator.js";

export class GameStates {
    static startGame(settings, cube, container, scoreboard, buttonContainer, startButton) {
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
                obstacle.obj.move(obstacle);
                obstacle.style.left = Number.parseInt(obstacle.style.left) - 1;//settings.obstacles.width;
                if (isTouching(obstacle, cube)) {
                    GameStates.endGame(buttonContainer, startButton);
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

    static endGame(buttonContainer, startButton) {
        document.onkeydown = undefined;
        buttonContainer.hidden = false;
        startButton.innerText = `You lost!
                             Restart?`;
        startButton.onclick = startButton.obj.end;
        startButton.hidden = false;
    }
}