import { GameManager } from "./GameManager.js";
export let newGame;
document.addEventListener("DOMContentLoaded", () => {
    newGame = new GameManager();
    newGame.setup(true);
});