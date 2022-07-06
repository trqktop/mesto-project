
import { addNewPhotoSubmitButton, popupArr, validatorConfig } from "./constants.js"
import { disableSubmitButton, resetError } from "./validate.js"



function showInputValueAfterOpenPopup(profileJobInput, profileUserJob, profileNameInput, profileUserName) {
    profileJobInput.value = profileUserJob.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
    profileNameInput.value = profileUserName.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
}


function openPopup(popupElement) {
    popupElement.classList.add('popup_opened')

}


function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened')
    resetError(popupElement, validatorConfig)
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
















export { clearInputsValue, openPopup, closePopup, saveChange, submitListener, showInputValueAfterOpenPopup }
