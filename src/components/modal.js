

export class Popup {
    constructor(selector) {
        this.popupElement = selector
        this.closePopupEscHandle = this._closePopupEsc.bind(this)
        this.closePopupOverlay = this._closePopupOverlay.bind(this)
    }

    showInputValueAfterOpenPopup(profileJobInput, profileUserJob, profileNameInput, profileUserName) {
        profileJobInput.value = profileUserJob.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
        profileNameInput.value = profileUserName.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
    }

    openPopup() {//Функция открытия попапа
        this.setEventListeners()
        this.popupElement.classList.add('popup_opened')
        document.addEventListener("keydown", this.closePopupEscHandle)//(c)'добавлять обработчик события в функции открытия попапов'        })
        document.addEventListener('mousedown', this.closePopupOverlay)//(c)'добавлять обработчик события в функции открытия попапов' и { once: true } - удаляет
    }

    closePopup() {
        this.popupElement.classList.remove('popup_opened')
        this.removeEventListener()
    }

    removeEventListener() {
        document.removeEventListener("keydown", this.closePopupEscHandle)// (c)'удалять его при закрытии попапов.'
        document.removeEventListener('mousedown', this.closePopupOverlay) // (c)'удалять его при закрытии попапов.'
    }


    saveChange(profileJobInput, profileUserJob, profileNameInput, profileUserName) {
        profileUserJob.textContent = profileJobInput.value;
        profileUserName.textContent = profileNameInput.value;
    }

    clearInputsValue() {
        this.popupElement.querySelector('form').reset()
    }

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

    toggleSubmitButtonTextContent(submitButtonEditProfile, value) {
        submitButtonEditProfile.textContent = value
    }//меняю текст контент кнопок субмит 



    setEventListeners() {
        const button = this.popupElement.querySelector('.popup__close-button')
        button.addEventListener('click', () => {
            this.closePopup()
        });//закрытие всех попапов слушатель
    }
}









