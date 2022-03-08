import getSettings from './GameSettings.js';
import { Container } from '../model/container.js'
import { Cube } from "../model/cube.js";
import { StartButton } from "../model/StartButton.js";

export default function setup() {
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    let settings = getSettings();
        
    let container = Container.initialize(new Container(settings.container));
    document.body.appendChild(container);

    let myDiv = Cube.initialize(new Cube(settings.cube));
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
    buttonContainer.style.height = settings.container.height;
    let startButton = StartButton.initialize(new StartButton(settings));
    buttonContainer.appendChild(startButton);
    container.appendChild(buttonContainer);  
}