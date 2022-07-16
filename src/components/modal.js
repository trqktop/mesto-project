
import { addNewPhotoSubmitButton, popupArr, validatorConfig } from "./constants.js"
import { disableSubmitButton } from "./validate.js"









function showInputValueAfterOpenPopup(profileJobInput, profileUserJob, profileNameInput, profileUserName) {
    profileJobInput.value = profileUserJob.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
    profileNameInput.value = profileUserName.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
}


function openPopup(popupElement) {//Функция открытия попапа
    popupElement.classList.add('popup_opened')
    document.addEventListener("keydown", closePopupEsc)//(c)'добавлять обработчик события в функции открытия попапов'
    document.addEventListener('mousedown', closePopupOverlay)//(c)'добавлять обработчик события в функции открытия попапов'
}


function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened')
    document.removeEventListener("keydown", closePopupEsc)// (c)'удалять его при закрытии попапов.'
    document.removeEventListener('mousedown', closePopupOverlay)// (c)'удалять его при закрытии попапов.'
}



function saveChange(profileJobInput, profileUserJob, profileNameInput, profileUserName) {
    profileUserJob.textContent = profileJobInput.value;
    profileUserName.textContent = profileNameInput.value;
}


function clearInputsValue(popupAddNewPhoto) {
    popupAddNewPhoto.querySelector('form').reset()
    disableSubmitButton(addNewPhotoSubmitButton, validatorConfig.inactiveButtonClass)
}





function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup)
    }
}

function closePopupOverlay(evt) {
    if (evt.target.classList.contains('popup'))
        closePopup(evt.target)
}





export const toggleSubmitButtonTextContent = (submitButtonEditProfile, value) => {
    submitButtonEditProfile.textContent = value
}//меняю текст контент кнопок субмит 







export { clearInputsValue, openPopup, closePopup, saveChange, showInputValueAfterOpenPopup }
