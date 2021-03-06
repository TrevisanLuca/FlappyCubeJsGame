let myDiv = document.getElementById('myCube');
let myContainer = document.getElementById('container');
let myPointCounters = document.getElementById('points');

let myDivPos = myDiv.getBoundingClientRect();
myDiv.style.top = myDivPos.top;
myDiv.style.left = myDivPos.left;

let myContainerPos = myContainer.getBoundingClientRect();
myContainer.style.top = myContainerPos.top;
myContainer.style.bottom = myContainerPos.bottom;
myContainer.style.left = myContainerPos.left;
myContainer.style.right = myContainerPos.right;

let topmost = Number.parseInt(myContainer.style.top) + 1;
let bottommost = Number.parseInt(myContainer.style.bottom) - myDivPos.height - 1;
let leftmost = Number.parseInt(myContainer.style.left) + 1;
let rightmost = Number.parseInt(myContainer.style.right) - myDivPos.width - 1;

let pointsCounter = 0;

document.onkeydown = checkKey;
function random_0_100() {
    return Math.floor(Math.random() * 101) / 100;
}
function checkKey(e) {
    let topPos = myDiv.style.top;
    let leftPos = myDiv.style.left;
    let newPos = 0;
    switch (e.keyCode) {
        case 38:
            //UP
            newPos = Number.parseInt(topPos) - 10;
            myDiv.style.top = newPos < topmost ? topmost : newPos;
            break;
        case 40:
            //DOWN
            newPos = Number.parseInt(topPos) + 10;
            myDiv.style.top = newPos > bottommost ? bottommost : newPos;
            break;
        case 37:
            //LEFT
            newPos = Number.parseInt(leftPos) - 10;
            myDiv.style.left = newPos < leftmost ? leftmost : newPos;
            break;
        case 39:
            //RIGHT
            newPos = Number.parseInt(leftPos) + 10;
            myDiv.style.left = newPos > rightmost ? rightmost : newPos;
            break;
        //case 190:
        //    //DOT .
        //    moveObstacles();
        default:
    }
}


const obstaclesSpaceBetween = (myContainerPos.height * 0.25) < myDivPos.height ? myDivPos.height + 10 : (myContainerPos.height * 0.25);
const obstaclesWidth = (myContainerPos.width - 2) / 70; //2 is the border width
const obstaclesName = 'Obstacle';
const obstaclesMinLength = myDivPos.height / 2;
function generateObstacles() {
    let remainingSpace = myContainerPos.height - obstaclesSpaceBetween - 2 * obstaclesMinLength;

    let firstObsEnd = obstaclesMinLength + remainingSpace * random_0_100();
    let firstDiv = document.createElement('div');
    firstDiv.className = obstaclesName;
    firstDiv.style.backgroundColor = "green";
    firstDiv.style.width = obstaclesWidth;
    firstDiv.style.height = firstObsEnd;
    firstDiv.style.position = 'absolute';
    firstDiv.style.top = topmost;
    firstDiv.style.left = Number.parseInt(myContainer.style.right) - obstaclesWidth - 1;
    myContainer.appendChild(firstDiv);

    //returns start of second obstacle
    let secondDiv = document.createElement('div');
    secondDiv.className = obstaclesName;
    secondDiv.style.backgroundColor = "green";
    secondDiv.style.width = obstaclesWidth;
    secondDiv.style.height = myContainerPos.height - firstObsEnd - obstaclesSpaceBetween;
    secondDiv.style.position = 'absolute';
    secondDiv.style.top = topmost + Number.parseInt(firstDiv.style.height) + obstaclesSpaceBetween - 1;
    secondDiv.style.left = Number.parseInt(myContainer.style.right) - obstaclesWidth - 1;
    myContainer.appendChild(secondDiv);
}
generateObstacles();

function moveObstacles() {
    let obstaclesList = myContainer.getElementsByClassName(obstaclesName);
    let obsDeleteList = new Array();
    for (let obstacle of obstaclesList) {
        obstacle.style.left = Number.parseInt(obstacle.style.left) - obstaclesWidth;
        if (isTouching(obstacle, myDiv)) {
            window.clearInterval(gameTimer);
            alert("You lost");
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
    myPointCounters.innerText = pointsCounter.toString();
    if (pointsCounter === 350) { generateObstacles();}
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

let gameTimer = window.setInterval(moveObstacles, 100);
