import { validator } from "./validate.js"
export const popupFunctions = (() => {
    const openPopupProfileEditButton = document.querySelector('.profile__edit-button')
    const popupSubmitProfileForm = document.querySelector('.popup__edit-form')
    const popupProfileEdit = document.querySelector('#popupEditProfile')//по-пап редактировать профиль 
    const closePopupProfileEdit = popupProfileEdit.querySelector('.popup__close-button')
    const profile = document.querySelector('.profile')//секция профиль
    const profileJobInput = popupProfileEdit.querySelector('#profileJobInput')//input профиль профессия
    const profileUserJob = profile.querySelector('.profile__user-about');//профиль профессия
    const profileNameInput = popupProfileEdit.querySelector('#profileNameInput');//input профиль имя
    const profileUserName = profile.querySelector('.profile__user-name');//профиль имя
    return {
        data: {
            popupProfileEdit,
            openPopupProfileEditButton,
            popupSubmitProfileForm,
            closePopupProfileEdit
        },
        render: {
            openPopup: (popupElement) => {
                validator()
                profileJobInput.value = profileUserJob.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
                profileNameInput.value = profileUserName.textContent;//«Имя» и «О себе»  заполнены теми значениями, которые отображаются на странице.
                popupElement.classList.add('popup_opened')
            },
            closePopup: (popupElement) => {
                popupElement.classList.remove('popup_opened')
            },
            saveChange: () => {
                profileUserJob.textContent = profileJobInput.value;
                profileUserName.textContent = profileNameInput.value;
            },
            submitListener: () => {
                popupFunctions.render.saveChange();
                popupFunctions.render.closePopup(popupProfileEdit);
            }
        }
    }
})()

