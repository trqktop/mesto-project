

export class Section {
    constructor({ cards, renderer }, selector) {
        this._renderer = renderer
        this.selector = selector
        this.cards = cards
    }
    renderer() {
        this._renderer()
    }

    addItem(card) {
        this.selector.prepend(card);
    }

}
