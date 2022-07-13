//0. импорт-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
import "../pages/index.css";//0.3 импорт для вебпака 
import {
    initLikeCount, renderLikeCount, checkCardOwn, cardDelete, insertCard, createCards
    , minusLikeCount, plusLikeCount
} from "./card.js";//0.1 импорт функций работы с карточками
import { putLikeOnServer, deleteLikeFromServer, patchProfileAvatar, checkLikeToggle, deleteFromServerLike, putOnServerLike, userId, checkCards, initLikes, setLikesCount, pushNewCard, pushProfileData, getUserProfileInfo, getInitialCards, checkResponse, likeStatus, setProfileAvatar } from "./api.js"
//0.2 импорт переменных

import {
    popupFullScreen, fullScreenCloseButton, popupArr, validatorConfig, urlImageInput, nameImageInput, popupAddNewPhoto, userTemplate, userTemplateLi, elementsGridContainer, profileJobInput, profileUserJob, profileNameInput, profileUserName, popupProfileEdit, popupSubmitProfileForm, openPopupProfileEditButton, popupNewPhotoCloseButton, profileAddCardButton, initialCards, formNewPhoto, closePopupProfileEdit, avatarEditPen, userAvatar,
    popupAvatar, popupAvatarCloseButton, popupAvatarForm, popupAvatarUrlInput
} from "./constants.js"
import { clearInputsValue, showInputValueAfterOpenPopup, openPopup, closePopup, saveChange, submitListener } from './modal.js'//0.2 импорт Работа модальных окон




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
    evt.target.querySelector('.popup__submit-button').textContent = 'Сохранение...'
    submitListener(popupProfileEdit);
    saveChange(profileJobInput, profileUserJob, profileNameInput, profileUserName)
    pushProfileData(profileUserName, profileUserJob)//5. Редактирование профиля
        .catch((err) => console.log(err))
        .finally(res => { evt.target.querySelector('.popup__submit-button').textContent = 'Сохранить' })
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
    evt.target.querySelector('.popup__submit-button').textContent = 'Сохранение...'
    insertCard(elementsGridContainer, createCards(urlImageInput.value, nameImageInput.value, userTemplateLi))
    pushNewCard(nameImageInput.value, urlImageInput.value)
        .finally(res => { evt.target.querySelector('.popup__submit-button').textContent = 'Сохранить' })
    closePopup(popupAddNewPhoto)
    clearInputsValue(popupAddNewPhoto);
    resetError(popupAddNewPhoto, validatorConfig)
})//функция добавления новой карточки отсылающая к ранее созданной функции с заменой аргументов 
//5. Лайк карточки - в модуле card.js
//6. Удаление карточки - в модуле card.js
//7. Открытие попапа с картинкой - в модуле card.js


fullScreenCloseButton.addEventListener('click', () => closePopup(popupFullScreen))//закрытие попапа фуллскрин 

//3. Загрузка информации о пользователе с сервера
getUserProfileInfo()
    .then(res => {
        profileUserName.textContent = res.name
        profileUserJob.textContent = res.about
    })
    .catch(err => console.log(err))


//4. Загрузка карточек с сервера



getInitialCards()
    .then(data => data.reverse())
    .then(data => {
        data.forEach(item => {
            insertCard(elementsGridContainer, createCards(item.link, item.name, userTemplateLi, item))
        })
        return data
    })
    .then(serverArr => { initLikeCount(serverArr) })
    .then(res => {
        userId()
            .then(userid => {
                checkCards()
                    .then(data => data)
                    .then(data => {
                        checkCardOwn(data, userid)
                        checkLikeOwn(data, userid)
                    })
            })
    })
    .then(res => {
        return checkCards()
            .then(data => {
                const arrayLikes = Array.from(document.querySelectorAll('.element__button'))
                arrayLikes.forEach((likeItem, index, arr) => {
                    likeItem.addEventListener('click', (evt) => {
                        if (evt.target.classList.contains('element__button_active')) {
                            plusLikeCount(likeItem, data)
                            putLikeOnServer((data[arr.indexOf(likeItem)])._id)
                        }
                        else {
                            minusLikeCount(likeItem)
                            deleteLikeFromServer((data[arr.indexOf(likeItem)])._id)
                        }
                    })
                })
            })
            .then(data => initLikeCount(data))
    })
    .catch(err => console.log(err))






















export const checkLikeOwn = (data, userid) => {
    const likesArr = Array.from(document.querySelectorAll('.element__button'))
    data.forEach((item, index) => {
        item.likes.forEach(like => {
            if (like._id === userid) {
                likesArr[index].classList.add('element__button_active')
            }
        })
    })
}





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



popupAvatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    userAvatar.src = popupAvatarUrlInput.value
    evt.target.querySelector('.popup__submit-button').textContent = 'Сохранение...'
    patchProfileAvatar(popupAvatarUrlInput.value, evt)
        .then(res => { closePopup(popupAvatar) })
        .finally(res => { evt.target.querySelector('.popup__submit-button').textContent = 'Сохранить' })
})



setProfileAvatar()
    .then(res => {
        userAvatar.src = res.avatar
    })