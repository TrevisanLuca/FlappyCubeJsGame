export class Container {
    constructor(containerSettings) {
        this.width = containerSettings.width;
        this.height = containerSettings.height;
        this.backgroundColor = containerSettings.backgroundColor;
        this.border = containerSettings.border;
        this.id = containerSettings.id;
    }
    initialize() {
        let result = document.createElement('div');
        result.id = this.id;
        result.position = 'relative';
        result.style.width = this.width;
        result.style.height = this.height;
        result.style.backgroundColor = this.backgroundColor;
        result.style.border = this.border;
        return result;
    }
    moveObstacles() {

    }
}