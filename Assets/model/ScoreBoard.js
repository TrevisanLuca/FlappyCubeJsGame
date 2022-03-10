export const SCOREBOARD = (function () {
    let result;
    return class Scoreboard {
        constructor(settings, startingPoints = 0) {
            this.settings = settings;            
            this.score = startingPoints;
            this.initialize();
            result.update(startingPoints);
        }
        initialize() {
            result = document.createElement('span');
            result.id = this.settings.scoreboard.id;            
            result.update = this.update;
            result.score = this.score;
            document.body.appendChild(result);
        }
        update(points) {
            this.score += points;
            this.innerText = `${this.score.toString()} Points`;
        }
    }
}())