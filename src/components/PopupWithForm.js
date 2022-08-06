
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

        //  this.inputNameImage = this.form.querySelector('#nameImageInput')
        //  this.inputUrlImage = this.form.querySelector('#urlImageInput')
        //  this.inputNameProfile = this.form.querySelector('#profileNameInput')
        //  this.inputJobProfile = this.form.querySelector('#profileJobInput')
        //  this.inputUrlAvatar = this.form.querySelector('#urlNewAvatar')
    }
    //  //seper.setEventListeners() перезаписываем родительский листенер
    //  //this._closePopup() 
    toggleSubmitButtonTextContent(value) {//по заданию попап содержит 3 публичных метода.
        //это скорее всего перенести в попап витх форм
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
        // this.button = super.button
        // super.setEventListeners()
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

// ЭТОТ МЕТОД ПЕРЕНОСИТСЯ В ПОПАП ВИТХ ФОРМ
    //saveChange(profileJobInput, profileUserJob, profileNameInput, profileUserName) {
    //    profileUserJob.textContent = profileJobInput.value;
    //    profileUserName.textContent = profileNameInput.value;
    //}


        // ЭТОТ МЕТОД ПЕРЕНОСИТСЯ В ПОПАП ВИТХ ФОРМ
    //showInputValueAfterOpenPopup(profileJobInput, profileUserJob, profileNameInput, profileUserName) {
    //    profileJobInput.value = profileUserJob.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
    //    profileNameInput.value = profileUserName.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
    //}
