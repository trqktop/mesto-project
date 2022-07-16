//0. импорт-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
import "../pages/index.css";//0.3 импорт для вебпака 
import { insertCard, createCards } from "./card.js";//0.1 импорт функций работы с карточками
import { patchProfileAvatar, getUserId, pushNewCard, pushProfileData, getInitialCards } from "./api.js"
//0.2 импорт переменных
import {
    popupFullScreen, fullScreenCloseButton, validatorConfig, urlImageInput, nameImageInput, popupAddNewPhoto, userTemplateLi, elementsGridContainer, profileJobInput, profileUserJob, profileNameInput, profileUserName, popupProfileEdit, popupSubmitProfileForm, openPopupProfileEditButton, profileAddCardButton, formNewPhoto, avatarEditPen, userAvatar,
    popupAvatar, popupAvatarForm, popupAvatarUrlInput, addNewPhotoSubmitButton, submitButtonEditProfile, closeButtons
} from "./constants.js"
import { clearInputsValue, showInputValueAfterOpenPopup, openPopup, closePopup, saveChange, toggleSubmitButtonTextContent } from './modal.js'//0.2 импорт Работа модальных окон
import { enableValidation } from './validate.js'
let userId;
enableValidation(validatorConfig);//включил валидацию





closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});//закрытие всех попапов слушатель

openPopupProfileEditButton.addEventListener('click', () => {
    openPopup(popupProfileEdit);
    showInputValueAfterOpenPopup(profileJobInput, profileUserJob, profileNameInput, profileUserName)
})//слушатель событий кнопки открыть по-пап редактирования профиля





popupSubmitProfileForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    toggleSubmitButtonTextContent(submitButtonEditProfile, 'Сохранение...')//меняю текстконтент кнопки пока идет загрузка с сервера
    pushProfileData(profileNameInput, profileJobInput)//5. Редактирование профиля
        .then(res => saveChange(profileJobInput, profileUserJob, profileNameInput, profileUserName))
        .then(res => closePopup(popupProfileEdit))//закрываю попап
        .catch((err) => console.log(err))//в случае ошибки вывожу ее в консоль
        .finally(res => toggleSubmitButtonTextContent(submitButtonEditProfile, 'Сохранить'))//возвращаю текст контент кнопке
})//слушатель событий сохранить изменения в профиль


profileAddCardButton.addEventListener('click', () => {
    openPopup(popupAddNewPhoto)
    clearInputsValue(popupAddNewPhoto)
})

//4. Добавление карточки
//слушатели-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
formNewPhoto.addEventListener('submit', (evt) => {
    evt.preventDefault()//отменяем дефолтный субмит
    toggleSubmitButtonTextContent(addNewPhotoSubmitButton, 'Сохранение...')//меняем тексконтент кнопки , пока идет запрос на сервер
    pushNewCard(nameImageInput.value, urlImageInput.value)//пушим карточку на сервер 
        .then(newCard => {
            insertCard(elementsGridContainer, createCards(urlImageInput.value, nameImageInput.value, userTemplateLi, newCard, newCard.owner._id))
            return newCard
        })//Вставляем карточку на страницу
        .then(newCard => {
            closePopup(popupAddNewPhoto)
        })//закрываем попап 
        .catch(err => console.log(err))//выводим в консоль ошибку в случае возвращения с сервера ошибки
        .finally(res => toggleSubmitButtonTextContent(addNewPhotoSubmitButton, 'Сохранить'))//возвращаем текст контент кнопки сохранить
})//функция добавления новой карточки отсылающая к ранее созданной функции с заменой аргументов 











//3. Загрузка информации о пользователе с сервера





Promise.all([getUserId(), getInitialCards()])
    .then(([userData, cards]) => {
        userId = userData._id
        userAvatar.src = userData.avatar
        profileUserName.textContent = userData.name
        profileUserJob.textContent = userData.about
        cards.reverse().forEach((card, index) => {
            const cardElement = createCards(card.link, card.name, userTemplateLi, card, userId)
            insertCard(elementsGridContainer, cardElement, card)
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


popupAvatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const submitButton = evt.submitter
    submitButton.textContent = 'Сохранение...'
    patchProfileAvatar(popupAvatarUrlInput.value)
        .then(res => {
            userAvatar.src = res.avatar
            closePopup(popupAvatar)
        })
        .catch(err => console.log(err))
        .finally(res => submitButton.textContent = 'Сохранить')
})













