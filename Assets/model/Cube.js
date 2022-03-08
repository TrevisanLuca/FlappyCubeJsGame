export class Cube {
    constructor(cubeSettings) {
        this.width = cubeSettings.width;
        this.height = cubeSettings.height;
        this.backgroundColor = cubeSettings.backgroundColor;
    }
    static initialize(newCube) {
        let result = document.createElement('div');
        result.id = 'myCube';
        result.style.position = 'absolute';
        result.style.width = newCube.width;
        result.style.height = newCube.height;
        result.style.backgroundColor = newCube.backgroundColor;
        return result;
    }
    //moveObstacles() {}
}