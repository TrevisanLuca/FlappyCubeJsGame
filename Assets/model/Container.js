export class Container {
    constructor(containerSettings) {
        this.width = containerSettings.width;
        this.height = containerSettings.height;
        this.backgroundColor = containerSettings.backgroundColor;
        this.border = containerSettings.border;
    }
    static initialize(newContainer) {
        let result = document.createElement('div');
        result.id = 'container';
        result.position = 'relative';
        result.style.width = newContainer.width;
        result.style.height = newContainer.height;
        result.style.backgroundColor = newContainer.backgroundColor;
        result.style.border = newContainer.border;
        return result;
    }
    moveObstacles() {

    }
}