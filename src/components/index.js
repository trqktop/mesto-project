//0. импорт-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
import "../pages/index.css";//0.3 импорт для вебпака 
import {
    initLikeCount, renderLikeCount, checkCardOwn, cardDelete, insertCard, createCards, likeButtonListener, renderActiveLikes, deleteCardButtonListener

} from "./card.js";//0.1 импорт функций работы с карточками
import { putLikeOnServer, deleteLikeFromServer, patchProfileAvatar, checkLikeToggle, deleteFromServerLike, putOnServerLike, getUserId, checkCards, initLikes, setLikesCount, pushNewCard, pushProfileData, getUserProfileInfo, getInitialCards, checkResponse, likeStatus, setProfileAvatar, getCards, requestToDeleteFromTheServer } from "./api.js"
//0.2 импорт переменных

import {
    popupFullScreen, fullScreenCloseButton, popupArr, validatorConfig, urlImageInput, nameImageInput, popupAddNewPhoto, userTemplate, userTemplateLi, elementsGridContainer, profileJobInput, profileUserJob, profileNameInput, profileUserName, popupProfileEdit, popupSubmitProfileForm, openPopupProfileEditButton, popupNewPhotoCloseButton, profileAddCardButton, initialCards, formNewPhoto, closePopupProfileEdit, avatarEditPen, userAvatar,
    popupAvatar, popupAvatarCloseButton, popupAvatarForm, popupAvatarUrlInput, addNewPhotoSubmitButton, submitButtonEditProfile
} from "./constants.js"
import { clearInputsValue, showInputValueAfterOpenPopup, openPopup, closePopup, saveChange, toggleSubmitButtonTextContent } from './modal.js'//0.2 импорт Работа модальных окон

import { enableValidation, resetError } from './validate.js'
let userId;

enableValidation(validatorConfig)//включил валидацию


//1. Работа модальных окон
//слушатели-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
closePopupProfileEdit.addEventListener('click', () => {
    closePopup(popupProfileEdit)
    resetError(popupProfileEdit, validatorConfig)
})//слушатель событий кнопки закрыть по-пап редактирования профиля


openPopupProfileEditButton.addEventListener('click', () => {
    openPopup(popupProfileEdit);
    showInputValueAfterOpenPopup(profileJobInput, profileUserJob, profileNameInput, profileUserName)
})//слушатель событий кнопки открыть по-пап редактирования профиля


popupSubmitProfileForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    toggleSubmitButtonTextContent(submitButtonEditProfile, 'Сохранение...')//меняю текстконтент кнопки пока идет загрузка с сервера
    pushProfileData(profileUserName, profileUserJob)//5. Редактирование профиля
        .then(res => saveChange(profileJobInput, profileUserJob, profileNameInput, profileUserName))//сохраняю на странице изменения
        .then(res => closePopup(popupProfileEdit))//закрываю попап
        .catch((err) => console.log(err))//в случае ошибки вывожу ее в консоль
        .finally(res => toggleSubmitButtonTextContent(submitButtonEditProfile, 'Сохранить'))//возвращаю текст контент кнопке
})//слушатель событий сохранить изменения в профиль


//2. Шесть карточек «из коробки»
//слушатели-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//initialCards.forEach(item => insertCard(elementsGridContainer, createCards(item.link, item.name, userTemplateLi)))
//перебираем массив и вызываем функцию к каждому элементу массива 


//3. Форма добавления карточки
//слушатели-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
popupNewPhotoCloseButton.addEventListener('click', () => {
    closePopup(popupAddNewPhoto);
})










profileAddCardButton.addEventListener('click', () => {
    openPopup(popupAddNewPhoto)
    clearInputsValue(popupAddNewPhoto);
    resetError(popupAddNewPhoto, validatorConfig)
})





//4. Добавление карточки
//слушатели-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
formNewPhoto.addEventListener('submit', (evt) => {
    evt.preventDefault()//отменяем дефолтный субмит
    toggleSubmitButtonTextContent(addNewPhotoSubmitButton, 'Сохранение...')//меняем тексконтент кнопки , пока идет запрос на сервер
    pushNewCard(nameImageInput.value, urlImageInput.value)//пушим карточку на сервер 
        .then(newCard => newCard)
        .then(newCard => {
            insertCard(elementsGridContainer, createCards(urlImageInput.value, nameImageInput.value, userTemplateLi), newCard)
            return newCard
        })//Вставляем карточку на страницу
        .then(newCard => {
            const deleteArrayButton = document.querySelectorAll('.element__delete-button')
            deleteArrayButton[0].addEventListener('click', () => {//вешаю листенер на трешайкон 
                requestToDeleteFromTheServer(newCard._id)//удалить карточку с сервера запрос
            })
            return newCard
        })
        .then(newCard => {
            closePopup(popupAddNewPhoto)
            return newCard
        })//закрываем попап 
        .catch(err => console.log(err))//выводим в консоль ошибку в случае возвращения с сервера ошибки
        .finally(res => toggleSubmitButtonTextContent(addNewPhotoSubmitButton, 'Сохранить'))//возвращаем текст контент кнопки сохранить
})//функция добавления новой карточки отсылающая к ранее созданной функции с заменой аргументов 
//5. Лайк карточки - в модуле card.js
//6. Удаление карточки - в модуле card.js
//7. Открытие попапа с картинкой - в модуле card.js


fullScreenCloseButton.addEventListener('click', () => closePopup(popupFullScreen))//закрытие попапа фуллскрин 







//3. Загрузка информации о пользователе с сервера
getUserProfileInfo()//при загрузке подтягиваем имя и профессию с сервера
    .then(user => {
        profileUserName.textContent = user.name
        profileUserJob.textContent = user.about
    })
    .catch(err => console.log(err))


//4. Загрузка карточек с сервера






Promise.all([getUserId(), getInitialCards()])
    .then(([userData, cards]) => {
        userId = userData._id
        cards.reverse().forEach((card, index) => {
            const cardElement = createCards(card.link, card.name, userTemplateLi, card)
            insertCard(elementsGridContainer, cardElement, card)
            checkCardOwn(card, cards, userId, index, card.owner._id, cardElement)
            renderActiveLikes(cards, userId, card, cardElement)

        })
    })
    .catch(err => {
        console.log(err)
    })


userAvatar.addEventListener('mouseover', () => {
    showPen()
})

userAvatar.addEventListener('mouseout', () => {
    hidePen()
})


export const showPen = () => {
    avatarEditPen.style.display = "block"
}

export const hidePen = () => {
    avatarEditPen.style.display = "none"
}

userAvatar.addEventListener('click', () => {
    openPopup(popupAvatar)
})

popupAvatarCloseButton.addEventListener('click', () => {
    closePopup(popupAvatar)
})


setProfileAvatar()
    .then(res => {
        userAvatar.src = res.avatar
    })
    .then(res => {
        popupAvatarForm.addEventListener('submit', (evt) => {
            evt.preventDefault()
            evt.target.querySelector('.popup__submit-button').textContent = 'Сохранение...'
            patchProfileAvatar(popupAvatarUrlInput.value, evt)
                .then(res => res.json())
                .then(res => {
                    userAvatar.src = res.avatar
                })
                .then(res => { closePopup(popupAvatar) })
                .finally(res => { evt.target.querySelector('.popup__submit-button').textContent = 'Сохранить' })
        })
    })












