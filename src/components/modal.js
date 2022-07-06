
import { addNewPhotoSubmitButton, popupArr, validatorConfig } from "./constants.js"
import { disableSubmitButton, resetError } from "./validate.js"



function showInputValueAfterOpenPopup(profileJobInput, profileUserJob, profileNameInput, profileUserName) {
    profileJobInput.value = profileUserJob.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
    profileNameInput.value = profileUserName.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
}


function openPopup(popupElement) {//Функция открытия попапа
    popupElement.classList.add('popup_opened')
    document.addEventListener("keydown", closePopupEsc)//(c)'добавлять обработчик события в функции открытия попапов'
    document.addEventListener('click', closePopupOverlay)//(c)'добавлять обработчик события в функции открытия попапов'
}


function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened')
    document.removeEventListener("keydown", closePopupEsc)// (c)'удалять его при закрытии попапов.'
    document.removeEventListener('click', closePopupOverlay)// (c)'удалять его при закрытии попапов.'
}



function saveChange(profileJobInput, profileUserJob, profileNameInput, profileUserName) {
    profileUserJob.textContent = profileJobInput.value;
    profileUserName.textContent = profileNameInput.value;
}


function clearInputsValue(popupAddNewPhoto) {
    popupAddNewPhoto.querySelectorAll('input').forEach((inputElement) =>
        inputElement.value = ''

    )
    disableSubmitButton(addNewPhotoSubmitButton, validatorConfig.inactiveButtonClass)
}


function submitListener(popupElement) {
    closePopup(popupElement);
}


function closePopupEsc(evt) {
    const openedPopup = document.querySelector('.popup_opened')
    if (evt.key === 'Escape') {
        closePopup(openedPopup)
        resetError(openedPopup, validatorConfig)
        clearInputsValue(openedPopup)
    }
}

function closePopupOverlay(evt) {
    const openedPopup = document.querySelector('.popup_opened')
    if (evt.target === openedPopup) {
        closePopup(openedPopup)
        resetError(openedPopup, validatorConfig)
        clearInputsValue(openedPopup)
    }
}



export { clearInputsValue, openPopup, closePopup, saveChange, submitListener, showInputValueAfterOpenPopup }
