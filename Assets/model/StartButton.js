import { GameStates } from "../js/gamestates.js";
import setup from "../js/setup.js";

export const STARTBUTTON = (function () {
    let result;
    return class StartButton {
        constructor(settings) {
            this.settings = settings;
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
        }
        start() {
            let myDiv = document.getElementById(this.settings.cube.id);
            let container = document.getElementById(this.settings.container.id);
            let pointSpan = document.getElementById('points');
            let buttonContainer = document.getElementById('buttonContainer');
            let startButton = document.getElementById('startButton');
            this.hidden = true;
            buttonContainer.hidden = true;
            GameStates.startGame(this.settings, myDiv, container, pointSpan, buttonContainer, startButton);
        }
        end() {
            setup(false);
        }
    }
}())
//export class StartButton {
//    constructor(settings) {
//        this.settings = settings;
//    }
//    initialize() {
//        let result = document.createElement('button');
//        result.id = 'startButton';
//        result.innerText = 'Start!';
//        result.style.zIndex = 1;
//        result.style.width = 76;
//        result.style.height = 40;
//        result.onclick = this.start;
//        result.settings = this.settings;
//        result.obj = this;
//        return result;
//    }
//    start() {
//        let myDiv = document.getElementById(this.settings.cube.id);
//        let container = document.getElementById(this.settings.container.id);
//        let pointSpan = document.getElementById('points');
//        let buttonContainer = document.getElementById('buttonContainer');
//        let startButton = document.getElementById('startButton');
//        this.hidden = true;
//        buttonContainer.hidden = true;
//        GameStates.startGame(this.settings, myDiv, container, pointSpan, buttonContainer, startButton);
//    }
//    end() {
//        setup(false);
//    }
//}