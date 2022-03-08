import { startGame } from "../js/gamestates.js";
import getSettings from '../js/GameSettings.js';

export class StartButton {
    constructor(settings) {
        this.settings = settings;
    }
    static initialize(newButton) {
        let result = document.createElement('button');
        result.id = 'startButton';
        result.innerText = 'Start!';
        result.style.zIndex = 1;
        result.style.width = 76;
        result.style.height = 40;
        result.onclick = this.start;
        return result;
    }
    static start() {
        let myDiv = document.getElementById('myCube');
        let container = document.getElementById('container');
        let pointSpan = document.getElementById('points');
        let buttonContainer = document.getElementById('buttonContainer');
        let startButton = document.getElementById('startButton');
        let settings = getSettings();
        startButton.hidden = true;
        buttonContainer.hidden = true;
        startGame(settings, myDiv, container, pointSpan, buttonContainer, startButton);
    }
    static end() {

    }
}