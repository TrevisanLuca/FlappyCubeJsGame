export default function getSettings() {
    let settings = {
        container: {
            width: 700,
            height: 350,
            backgroundColor: 'lightgray',
            border: '1px solid black',
            id: 'container'
        },
        cube: {
            width: 50,
            height: 50,
            backgroundColor: 'red',
            moveSpeed: 15,
            id: 'myCube'
        },
        scoreboard: {
            id: 'points'
        }
    };
    settings.obstacles = {
        spaceBetween: (settings.container.height * 0.25) < settings.cube.height ? settings.cube.height + 10 : (settings.container.height * 0.25),
        width: settings.container.width / 70,
        name: 'Obstacle',
        minLength: settings.cube.height / 2,
        backgroundColor: 'green',
        moveSpeed: 2
    };
    settings.game = {
        //round to nearest multiple of obstacles.moveSpeed
        //genObsEvery: Math.round(settings.container.width / settings.obstacles.moveSpeed / settings.obstacles.moveSpeed) * settings.obstacles.moveSpeed,
        genObsEvery: function () {
            return Math.round(settings.container.width / settings.obstacles.moveSpeed);
        } // settings.obstacles.moveSpeed) * settings.obstacles.moveSpeed; }
    };
    return settings;
}