import { startGame } from "../js/gamestates.js";
import setup from "../js/setup.js";

export class StartButton {
    constructor(settings) {
        this.settings = settings;
    }
    initialize() {
        let result = document.createElement('button');
        result.id = 'startButton';
        result.innerText = 'Start!';
        result.style.zIndex = 1;
        result.style.width = 76;
        result.style.height = 40;
        result.onclick = this.start;
        result.settings = this.settings;
        return result;
    }
    start() {
        let myDiv = document.getElementById('myCube');
        let container = document.getElementById('container');
        let pointSpan = document.getElementById('points');
        let buttonContainer = document.getElementById('buttonContainer');
        let startButton = document.getElementById('startButton');
        this.hidden = true;
        buttonContainer.hidden = true;
        startGame(this.settings, myDiv, container, pointSpan, buttonContainer, startButton);
    }
}