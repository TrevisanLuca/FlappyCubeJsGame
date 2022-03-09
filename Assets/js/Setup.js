import getSettings from './GameSettings.js';
import { CONTAINER } from '../model/container.js'
import { CUBE } from "../model/cube.js";
import { StartButton } from "../model/StartButton.js";

export default function setup(firstGame) {
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    let settings = getSettings();

    new CONTAINER(settings.container);

    new CUBE(settings);

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
    let startButton = (new StartButton(settings)).initialize();
    buttonContainer.appendChild(startButton);
    document.getElementById(settings.container.id).appendChild(buttonContainer);

    if (!firstGame) { startButton.click() };
}