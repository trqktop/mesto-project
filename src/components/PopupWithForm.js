import { Popup } from "./modal.js"

export class PopupWithForm extends Popup {
    constructor(selector, handler) {
        super(selector)
        this.form = selector
        this.handler = handler
        this.inputList = Array.from(this.form.querySelectorAll('.popup__input'))
        //  this.inputNameImage = this.form.querySelector('#nameImageInput')
        //  this.inputUrlImage = this.form.querySelector('#urlImageInput')
        //  this.inputNameProfile = this.form.querySelector('#profileNameInput')
        //  this.inputJobProfile = this.form.querySelector('#profileJobInput')
        //  this.inputUrlAvatar = this.form.querySelector('#urlNewAvatar')
    }

    //seper.setEventListeners() перезаписываем родительский листенер
    //this._closePopup() 

    closePopup() {
        super.closePopup()
        this.form.reset()
    }
    
    setEventListeners() {
        // this.button = super.button
        // super.setEventListeners()
        this.handler()
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
