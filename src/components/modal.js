
import { addNewPhotoSubmitButton, popupArr, validatorConfig } from "./constants.js"
//import { disableSubmitButton } from "./validate.js"

import { FormValidator } from './validate.js';

const valid = new FormValidator(validatorConfig)

export class Popup {
    constructor(selector) {
        this.popupElement = selector
    }

    //  _showInputValueAfterOpenPopup(profileJobInput, profileUserJob, profileNameInput, profileUserName) {
    //      profileJobInput.value = profileUserJob.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
    //      profileNameInput.value = profileUserName.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
    //  }

    openPopup() {//Функция открытия попапа
        this.popupElement.classList.add('popup_opened')
        document.addEventListener("keydown", (evt) => { this._closePopupEsc(evt) }, { once: true })//(c)'добавлять обработчик события в функции открытия попапов'
        document.addEventListener('mousedown', (evt) => { this._closePopupOverlay(evt) }, { once: true })//(c)'добавлять обработчик события в функции открытия попапов' и { once: true } - удаляет
    }

    closePopup() {
        this.popupElement.classList.remove('popup_opened')

        // document.removeEventListener("keydown", this._closePopupEsc)// (c)'удалять его при закрытии попапов.'
        //document.removeEventListener('mousedown', this._closePopupOverlay) // (c)'удалять его при закрытии попапов.'
    }

    //  _saveChange(profileJobInput, profileUserJob, profileNameInput, profileUserName) {
    //      profileUserJob.textContent = profileJobInput.value;
    //      profileUserName.textContent = profileNameInput.value;
    //  }

    // _clearInputsValue(popupAddNewPhoto) {
    //     popupAddNewPhoto.querySelector('form').reset()
    //     valid.disableSubmitButton(addNewPhotoSubmitButton, validatorConfig.inactiveButtonClass)
    // }

    _closePopupEsc(evt) {
        if (evt.key === 'Escape') {
            this.closePopup()
        }
    }

    _closePopupOverlay(evt) {
        if (evt.target.classList.contains('popup')) {
            this.closePopup()
        }
    }
    //
    //  _toggleSubmitButtonTextContent(submitButtonEditProfile, value) {
    //      submitButtonEditProfile.textContent = value
    //  }//меняю текст контент кнопок субмит 
    //
    //
    //
    setEventListeners(closeButtons) {
        closeButtons.forEach((button) => {
            const popup = button.closest('.popup');
            button.addEventListener('click', () => this.closePopup(popup));
        });//закрытие всех попапов слушатель
    }
}









