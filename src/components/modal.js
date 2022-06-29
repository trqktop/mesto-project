import { validator } from "./validate.js"
import { popupArr } from "./constants.js"



function showInputValueAfterOpenPopup(profileJobInput, profileUserJob, profileNameInput, profileUserName) {
    profileJobInput.value = profileUserJob.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
    profileNameInput.value = profileUserName.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.

}


function openPopup(popupElement) {
    /*validator()*/
    popupElement.classList.add('popup_opened')
    ListenersEventClosePopup(popupArr)

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

export { openPopup, closePopup, saveChange, submitListener, showInputValueAfterOpenPopup }
