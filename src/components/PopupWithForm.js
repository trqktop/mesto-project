import { Popup } from "./Popup.js"

export class PopupWithForm extends Popup {
    constructor({ selector, handler }) {
        super(selector)
        //this.closePopup = super.closePopup
        this.popupElement = selector
        this.handler = handler.bind(this)
        this.inputList = Array.from(this.form.querySelectorAll('.popup__input'))
        //  this.inputNameImage = this.form.querySelector('#nameImageInput')
        //  this.inputUrlImage = this.form.querySelector('#urlImageInput')
        //  this.inputNameProfile = this.form.querySelector('#profileNameInput')
        //  this.inputJobProfile = this.form.querySelector('#profileJobInput')
        //  this.inputUrlAvatar = this.form.querySelector('#urlNewAvatar')
    }
    //seper.setEventListeners() перезаписываем родительский листенер
    //this._closePopup() 

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
        return this.inputList.map(input => {
            return input.value
        });
        //тут работаем с даннымыи всех полей формы.                
        //переносим с попап родителя метод сбор данных с полей
        // this.input.textContent =
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
