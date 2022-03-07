export default function getSettings() {
    let settings = {
        containerSettings: {
            Width: 700,
            Height: 350,
            BackgroundColor: 'lightgray',
            Border: '1px solid black'
        },
        cubeSettings: {
            Width: 50,
            Height: 50,
            BackgroundColor: 'red'
        }
    }
    settings.obstaclesSettings = {
        SpaceBetween: (settings.containerSettings.Height * 0.25) < settings.cubeSettings.Height ? settings.cubeSettings.Height + 10 : (settings.containerSettings.Height * 0.25),
        Width: settings.containerSettings.Width / 70,
        Name: 'Obstacle',
        MinLength: settings.cubeSettings.Height / 2,
        BackgroundColor: 'green'
    }
    return settings;
}