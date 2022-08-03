import { Popup } from "./modal.js"

export class PopupWithForm extends Popup {
    constructor(selector, handler) {
        super(selector)
        this.form = selector
        this.handler = handler
    }
    listener() {//переименновать в setEventListeners()
        //seper.setEventListeners() перезаписываем родительский листенер
        //this._closePopup() 
        this.handler()

    }
    //   _closePopup() {
    //       //super.closePopup() перезаписываем родительский закрытие попап при закрытии попапа форма должна ещё и сбрасываться.
    //тут сбрасываем форму, через метод form.reset() 
   
    //   }
    //  

    _getInputValues() {
        //тут работаем с даннымыи всех полей формы.                
        //переносим с попап родителя метод сбор данных с полей 
    }
}