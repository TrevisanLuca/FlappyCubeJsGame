import { newGame } from "../js/main.js";

export const STARTBUTTON = (function () {
    let result;
    return class StartButton {
        constructor(settings, buttonContainer) {
            this.settings = settings;
            this.buttonContainer = buttonContainer;
            this.gm = newGame;
            this.initialize();
        }
        initialize() {
            result = document.createElement('button');
            result.id = 'startButton';
            result.innerText = 'Start!';
            result.style.zIndex = 1;
            result.style.width = 76;
            result.style.height = 40;
            result.onclick = this.start;
            result.settings = this.settings;
            result.obj = this;
            this.buttonContainer.appendChild(result);
        }
        start() {
            let myDiv = document.getElementById(this.settings.cube.id);
            let container = document.getElementById(this.settings.container.id);
            let pointSpan = document.getElementById('points');
            let buttonContainer = document.getElementById('buttonContainer');
            let startButton = document.getElementById('startButton');
            this.hidden = true;
            buttonContainer.hidden = true;
            newGame.startGame(this.settings, myDiv, container, pointSpan, buttonContainer, startButton);
        }
        end() {
            newGame.setup(false);
        }
    }
}())