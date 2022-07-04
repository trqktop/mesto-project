
import { addNewPhotoSubmitButton, popupArr, validatorConfig } from "./constants.js"
import { disableSubmitButton, resetError } from "./validate.js"



function showInputValueAfterOpenPopup(profileJobInput, profileUserJob, profileNameInput, profileUserName) {
    profileJobInput.value = profileUserJob.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
    profileNameInput.value = profileUserName.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
}


function openPopup(popupElement) {
    popupElement.classList.add('popup_opened')
    listenersEventClosePopup(popupArr)

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
















function listenersEventClosePopup(popupArr) {

    document.addEventListener('keydown', function closePopupOnEscape(event) {
        if (event.key === 'Escape') {
            closePopup(popupElement)
            console.log('tut oshibka')
        }
    }, { once: true })


    popupArr.forEach((popupElem) => {
        popupElem.addEventListener('mousedown', function closePopupOnClick(evt) {
            if (evt.target === popupElem)
                closePopup(popupElem)
            //  removeEventListener(popupElem, 'mousedown', closePopupOnClick)
        }, { once: true })
    })

}

//function removeEventListener(listenerItem, evt, handler) {
//    listenerItem.removeEventListener(evt, handler)
//}










export { clearInputsValue, openPopup, closePopup, saveChange, submitListener, showInputValueAfterOpenPopup }
