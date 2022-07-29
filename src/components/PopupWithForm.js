import { Popup } from "./modal.js"

export class PopupWithForm extends Popup {
    constructor(selector, handler) {
        super(selector)
        this.form = selector
        this.handler = handler
    }
    listener() {
        this.handler()
    }
    _getInputValues() {
        //тут работаем с даннымыи всех полей формы.                
    }
}