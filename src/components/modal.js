
import { errorList, popupArr } from "./constants.js"
import { disableSubmitButton } from "./validate.js"


function showInputValueAfterOpenPopup(profileJobInput, profileUserJob, profileNameInput, profileUserName) {
    profileJobInput.value = profileUserJob.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
    profileNameInput.value = profileUserName.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.

}


function openPopup(popupElement) {
    popupElement.classList.add('popup_opened')
    ListenersEventClosePopup(popupArr)

}


function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened')
    errorList.forEach((item) => {
        item.textContent = ''
    })//обнуляю при закрытия попапа массив ошибок 

}





function saveChange(profileJobInput, profileUserJob, profileNameInput, profileUserName) {
    profileUserJob.textContent = profileJobInput.value;
    profileUserName.textContent = profileNameInput.value;
}


function clearInputsValue(popupAddNewPhoto) {
    popupAddNewPhoto.querySelectorAll('input').forEach((inputElement) =>
        inputElement.value = ''

    )
    disableSubmitButton(popupAddNewPhoto.querySelector('.popup__submit-button'), 'popup__submit-button_disabled')
}

function submitListener(popupElement) {
    closePopup(popupElement);
}

function ListenersEventClosePopup(popupArr) {
    popupArr.forEach((popupElem) => {
        popupElem.addEventListener('mousedown', function closePopupOnClick(evt) {
            if (evt.target === popupElem)
                closePopup(popupElem)
            removeEventListener(popupElem, 'mousedown', closePopupOnClick)

        })
        document.addEventListener('keydown', function closePopupOnEscape(evt) {
            if (evt.key === 'Escape') {
                closePopup(popupElem)
                removeEventListener(document, 'keydown', closePopupOnEscape)

            }
        })//закрытие попапа при нажатие на ескейп

    }
    )
}

function removeEventListener(listenerObject, evt, handler) {
    listenerObject.removeEventListener(evt, handler)
}










export { clearInputsValue, openPopup, closePopup, saveChange, submitListener, showInputValueAfterOpenPopup }
