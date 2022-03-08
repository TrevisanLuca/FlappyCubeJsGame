export default function getSettings() {
    let settings = {
        container: {
            width: 700,
            height: 350,
            backgroundColor: 'lightgray',
            border: '1px solid black'
        },
        cube: {
            width: 50,
            height: 50,
            backgroundColor: 'red'
        }
    }
    settings.obstacles = {
        spaceBetween: (settings.container.height * 0.25) < settings.cube.height ? settings.cube.height + 10 : (settings.container.height * 0.25),
        width: settings.container.width / 70,
        name: 'Obstacle',
        minLength: settings.cube.height / 2,
        backgroundColor: 'green'
    }
    return settings;
}