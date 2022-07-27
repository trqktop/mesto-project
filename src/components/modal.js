
import { addNewPhotoSubmitButton, popupArr, validatorConfig } from "./constants.js"
//import { disableSubmitButton } from "./validate.js"

import { FormValidator } from './validate.js';

const valid = new FormValidator(validatorConfig)

export class Popup {
    constructor(selector) {
        this.popupElement = selector
    }

    showInputValueAfterOpenPopup(profileJobInput, profileUserJob, profileNameInput, profileUserName) {
        profileJobInput.value = profileUserJob.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
        profileNameInput.value = profileUserName.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
    }

    openPopup() {//Функция открытия попапа
        this.popupElement.classList.add('popup_opened')
        document.addEventListener("keydown", this._closePopupEsc)//(c)'добавлять обработчик события в функции открытия попапов'
        document.addEventListener('mousedown', this._closePopupOverlay)//(c)'добавлять обработчик события в функции открытия попапов'
    }

    closePopup() {
        this.popupElement.classList.remove('popup_opened')
        document.removeEventListener("keydown", this._closePopupEsc)// (c)'удалять его при закрытии попапов.'
        document.removeEventListener('mousedown', this._closePopupOverlay)// (c)'удалять его при закрытии попапов.'
    }

    saveChange(profileJobInput, profileUserJob, profileNameInput, profileUserName) {
        profileUserJob.textContent = profileJobInput.value;
        profileUserName.textContent = profileNameInput.value;
    }

    _clearInputsValue(popupAddNewPhoto) {
        popupAddNewPhoto.querySelector('form').reset()
        valid.disableSubmitButton(addNewPhotoSubmitButton, validatorConfig.inactiveButtonClass)
    }

//   _closePopupEsc(evt) {
//       if (evt.key === 'Escape') {
//           const openedPopup = document.querySelector('.popup_opened')
//           this.closePopup(openedPopup)
//       }
//   }
//
//   _closePopupOverlay(evt) {
//       if (evt.target.classList.contains('popup'))
//           this.closePopup(evt.target)
//   }

    toggleSubmitButtonTextContent(submitButtonEditProfile, value) {
        submitButtonEditProfile.textContent = value
    }//меняю текст контент кнопок субмит 


    setEventListener(openPopupProfileEditButton, profileJobInput, profileUserJob, profileNameInput, profileUserName) {
        openPopupProfileEditButton.addEventListener('click', () => {
            this.openPopup(this.popupElement);
            this.showInputValueAfterOpenPopup(profileJobInput, profileUserJob, profileNameInput, profileUserName)
            valid.resetError(this.popupElement, validatorConfig)
        })//слушатель событий кнопки открыть по-пап редактирования профиля
    }

    closePopupButtonListener(closeButtons) {
        closeButtons.forEach((button) => {
            const popup = button.closest('.popup');
            button.addEventListener('click', () => this.closePopup(popup));
        });//закрытие всех попапов слушатель
    }

    // profileAddCardButton.addEventListener('click', () => {
//     openPopup(popupAddNewPhoto)
//     clearInputsValue(popupAddNewPhoto)
//     resetError(popupAddNewPhoto, validatorConfig)
// })
}









