//0. импорт-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

import { insertCard, createCards } from "./card.js";//0.1 импорт функций работы с карточками

//0.2 импорт переменных

import { popupFullScreen, fullScreenCloseButton, popupArr, validatorConfig, urlImageInput, nameImageInput, popupAddNewPhoto, userTemplate, userTemplateLi, elementsGridContainer, profileJobInput, profileUserJob, profileNameInput, profileUserName, popupProfileEdit, popupSubmitProfileForm, openPopupProfileEditButton, popupNewPhotoCloseButton, profileAddCardButton, initialCards, formNewPhoto, closePopupProfileEdit } from "./constants.js"
import { clearInputsValue, showInputValueAfterOpenPopup, openPopup, closePopup, saveChange, submitListener } from './modal.js'//0.2 импорт Работа модальных окон


import "../pages/index.css";//0.3 импорт для вебпака 

import { enableValidation, resetError } from './validate.js'

enableValidation(validatorConfig)


//1. Работа модальных окон
//слушатели-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
closePopupProfileEdit.addEventListener('click', () => {
    closePopup(popupProfileEdit)
    resetError(popupProfileEdit, validatorConfig)
})//слушатель событий кнопки закрыть по-пап редактирования профиля

//слушатель событий кнопки открыть по-пап редактирования профиля
openPopupProfileEditButton.addEventListener('click', () => {
    openPopup(popupProfileEdit);
    showInputValueAfterOpenPopup(profileJobInput, profileUserJob, profileNameInput, profileUserName)
})


popupSubmitProfileForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    submitListener(popupProfileEdit);
    saveChange(profileJobInput, profileUserJob, profileNameInput, profileUserName)
})//слушатель событий сохранить изменения в профиль


//2. Шесть карточек «из коробки»
//слушатели-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//initialCards.forEach(item => insertCard(elementsGridContainer, createCards(item.link, item.name, userTemplateLi)))
//перебираем массив и вызываем функцию к каждому элементу массива 


//3. Форма добавления карточки
//слушатели-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
popupNewPhotoCloseButton.addEventListener('click', () => {
    closePopup(popupAddNewPhoto);
    clearInputsValue(popupAddNewPhoto);
    resetError(popupAddNewPhoto, validatorConfig)
})


profileAddCardButton.addEventListener('click', () => openPopup(popupAddNewPhoto))


//4. Добавление карточки
//слушатели-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
formNewPhoto.addEventListener('submit', (evt) => {
    evt.preventDefault()
    insertCard(elementsGridContainer, createCards(urlImageInput.value, nameImageInput.value, userTemplateLi))
    closePopup(popupAddNewPhoto)
    clearInputsValue(popupAddNewPhoto);
    resetError(popupAddNewPhoto, validatorConfig)
})//функция добавления новой карточки отсылающая к ранее созданной функции с заменой аргументов 
//5. Лайк карточки - в модуле card.js
//6. Удаление карточки - в модуле card.js
//7. Открытие попапа с картинкой - в модуле card.js


fullScreenCloseButton.addEventListener('click', () => closePopup(popupFullScreen))//закрытие попапа фуллскрин 



//3. Загрузка информации о пользователе с сервера
const profileAvatar = document.querySelector('.profile__avatar')
function renderUserProfile(dataJson) {
    profileUserName.textContent = dataJson.name
    profileUserJob.textContent = dataJson.about
    profileAvatar.src = dataJson.avatar
}

fetch('https://nomoreparties.co/v1/plus-cohort-13/users/me', {
    headers: {
        authorization: 'ea0e92d7-6e32-47de-8e34-53809a54f560'
    }
})
    .then(res => res.json())
    .then((data) => {
        renderUserProfile(data)
    })

//  4. Загрузка карточек с сервера

function renderCard(item) {
    insertCard(elementsGridContainer, createCards(item.link, item.name, userTemplateLi))
}
fetch('https://nomoreparties.co/v1/plus-cohort-13/cards', {
    headers: {
        authorization: 'ea0e92d7-6e32-47de-8e34-53809a54f560'
    }
})
    .then(res => res.json())
    .then(data => data.forEach((item) => renderCard(item)))



//5. Редактирование профиля
/*
fetch('https://nomoreparties.co/v1/plus-cohort-13/users/me', {
    method: 'PATCH',
    headers: {
        authorization: 'ea0e92d7-6e32-47de-8e34-53809a54f560',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'Кусто',
        about: 'Плывун :c'
    })
})
    .then(res => res.json())
    .then(data => renderUserProfileInfo(data))


function renderUserProfileInfo(data) {
    document.querySelector('form').addEventListener('submit', () => {
        data.name = profileUserName.textContent
        data.about = profileUserJob.textContent
        console.log(data)
    })
}
*/