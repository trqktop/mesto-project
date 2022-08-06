
import { Popup } from "./Popup.js"

export class PopupWithForm extends Popup {
    constructor({ popupElement, handler }) {
        super(popupElement)
        //this.closePopup = super.closePopup
        this.popupElement = popupElement
        this.form = this.popupElement.querySelector('form')
        this.submitButton = this.popupElement.querySelector('.popup__submit-button')
        this.handler = handler.bind(this)
        this.inputList = Array.from(this.form.querySelectorAll('.popup__input'))


    }

    toggleSubmitButtonTextContent(value) {
        this.submitButton.textContent = value
    }//меняю текст контент кнопок субмит 

    close() {
        super.closePopup()
        this.form.reset()
    }

    setEventListeners() {
        super.setEventListeners()
        this.form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this.handler(this._getInputValues())
        })
    }

    _getInputValues() {
        this._formValues = {};
        // добавляем в этот объект значения всех полей
        this.inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        // возвращаем объект значений
        return this._formValues;


    }
}

