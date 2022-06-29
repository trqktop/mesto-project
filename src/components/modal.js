import { validator } from "./validate.js"

function showInputValueAfterOpenPopup(profileJobInput, profileUserJob, profileNameInput, profileUserName) {
    profileJobInput.value = profileUserJob.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
    profileNameInput.value = profileUserName.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.

}


function openPopup(popupElement) {
    /*validator()*/
    popupElement.classList.add('popup_opened')

}
function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened')
}
function saveChange(profileJobInput, profileUserJob, profileNameInput, profileUserName) {
    profileUserJob.textContent = profileJobInput.value;
    profileUserName.textContent = profileNameInput.value;
}
function submitListener(popupElement) {
    closePopup(popupElement);
}

export { openPopup, closePopup, saveChange, submitListener, showInputValueAfterOpenPopup }
