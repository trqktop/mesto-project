

export class Section {
    constructor({ items, renderer }, container) {//Вам нужно удалить слово Selector из названий, если это не селекторы Это container
        this._renderer = renderer
        this.container = container
        this.items = items
    }
    //  renderItems(items) {
    //      console.log(items)
    //      items.forEach(item => {
    //          addItem(item)
    //      });
    //  }
    renderItems(items) {
        items.forEach(item => {
            this._renderer(item)
        });
    }

    renderer(item) {//Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
        this._renderer(item)
    }//Для отрисовки массива карточек нужно немного изменить метод renderItems в классе Section, чтобы он теперь принимал в вызов этот массив renderItems(items) {

    addItem(card) {
        this.container.prepend(card);
    }

}
