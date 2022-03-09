export const CONTAINER = (function () {
    let result;
    return class Container {
        constructor(containerSettings) {
            this.width = containerSettings.width;
            this.height = containerSettings.height;
            this.backgroundColor = containerSettings.backgroundColor;
            this.border = containerSettings.border;
            this.id = containerSettings.id;
            this.initialize();
        }
        initialize() {
            result = document.createElement('div');
            result.id = this.id;
            result.position = 'relative';
            result.style.width = this.width;
            result.style.height = this.height;
            result.style.backgroundColor = this.backgroundColor;
            result.style.border = this.border;
            document.body.appendChild(result);
            let containerPos = container.getBoundingClientRect();
            container.style.top = containerPos.top;
            container.style.bottom = containerPos.bottom;
            container.style.left = containerPos.left;
            container.style.right = containerPos.right;
        }
    }
}())