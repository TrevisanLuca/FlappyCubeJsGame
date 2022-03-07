import startGame from './GameStates.js';
import getSettings from './Settings.js';

export default function setup() {
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    let settings = getSettings();
    let container = document.createElement('div');
    container.id = 'container';
    container.position = 'relative';
    container.style.width = settings.containerSettings.Width;
    container.style.height = settings.containerSettings.Height;
    container.style.backgroundColor = settings.containerSettings.BackgroundColor;
    container.style.border = settings.containerSettings.Border;
    document.body.appendChild(container);

    let myDiv = document.createElement('div');
    myDiv.id = 'myCube';
    myDiv.style.width = settings.cubeSettings.Width;
    myDiv.style.height = settings.cubeSettings.Height;
    myDiv.style.backgroundColor = settings.cubeSettings.BackgroundColor;
    myDiv.style.position = 'absolute';
    container.appendChild(myDiv);

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
    buttonContainer.style.height = settings.containerSettings.Height;
    let startButton = document.createElement('button');
    startButton.id = 'startButton';
    startButton.innerText = 'Start!';
    startButton.style.width = 76;
    startButton.style.height = 40;
    startButton.onclick = start;
    buttonContainer.appendChild(startButton);
    container.appendChild(buttonContainer);

    function start() {
        startButton.hidden = true;
        buttonContainer.hidden = true;
        startGame(settings, myDiv, container, pointSpan, buttonContainer, startButton);
    }
}
