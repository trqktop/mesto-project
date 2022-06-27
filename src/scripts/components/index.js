import { openPopup, closePopup, saveChange, popupProfileEdit, popupFormSubmitProfile, closeButtonPopup, openButtonPopup } from './modal.js';
import { createCards, initialCards, insertCard } from './card.js';


initialCards.forEach(item => {
    insertCard(createCards(item.link, item.name))
})

closeButtonPopup.addEventListener('click', () => {
    closePopup(popupProfileEdit)
})

openButtonPopup.addEventListener('click', () => {
    openPopup(popupProfileEdit);
})//слушатель событий кнопки открыть по-пап редактирования профиля

popupFormSubmitProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    saveChange();
    closePopup(popupProfileEdit); //слушатель событий сохранить изменения в профиль
})




const profileAddCardButton = profile.querySelector('.profile__add-button')
const popupAddNewPhoto = document.querySelector('#popupMesto')
const popupNewPhotoCloseButton = popupAddNewPhoto.querySelector('#mestoCloseButton')



//функции-----------------------------------------------------------------------------------------------------------------------------------

popupNewPhotoCloseButton.addEventListener('click', () => closePopup(popupAddNewPhoto))


profileAddCardButton.addEventListener('click', () => openPopup(popupAddNewPhoto))


// включение валидации вызовом enableValidation
// все настройки передаются при вызове




/*
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });*/