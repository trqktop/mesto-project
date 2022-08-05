

export class Section {
    constructor({ cards, renderer }, selector) {//Вам нужно удалить слово Selector из названий, если это не селекторы Это container
        this._renderer = renderer
        this.selector = selector
        this.cards = cards
    }
    renderer() {//по заданию в классе Section должен быть метод renderItems для отрисовки всего массива карточек
        this._renderer(/*[cards]*/)
    }//Для отрисовки массива карточек нужно немного изменить метод renderItems в классе Section, чтобы он теперь принимал в вызов этот массив renderItems(items) {

    addItem(card) {
        this.selector.prepend(card);
    }

}
