

export class Section {
    constructor({ renderer }, container) {
        this._renderer = renderer
        this.container = container
    }

    renderItems(items) {
        items.forEach(item => {
            this._renderer(item)
        });
    }

    renderer(item) {
        this._renderer(item)
    }

    addItem(card) {
        this.container.prepend(card);
    }

}
