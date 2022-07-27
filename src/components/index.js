// //0. импорт-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
import "../pages/index.css";//0.3 импорт для вебпака 
import { Card } from "./card.js";//0.1 импорт функций работы с карточками
import { Api } from "./api.js"
import { Section } from "./section.js"



// //0.2 импорт переменных
import {
    popupFullScreen, fullScreenCloseButton, validatorConfig, urlImageInput, nameImageInput, popupAddNewPhoto, userTemplateLi, elementsGridContainer, profileJobInput, profileUserJob, profileNameInput, profileUserName, popupProfileEdit, popupSubmitProfileForm, openPopupProfileEditButton, profileAddCardButton, formNewPhoto, avatarEditPen, userAvatar,
    popupAvatar, popupAvatarForm, popupAvatarUrlInput, addNewPhotoSubmitButton, submitButtonEditProfile, closeButtons, options
} from "./constants.js"
import { Popup } from './modal.js'//0.2 импорт Работа модальных окон
import { FormValidator } from './validate.js'
// let userId;


const formValidator = new FormValidator(validatorConfig)
formValidator.enableValidation()



//enableValidation(validatorConfig);//включил валидацию




const api = new Api(options)//вызвал конструктор . передал конфиг и записал в константу





const popup = new Popup(popupProfileEdit)
popup.closePopupButtonListener(closeButtons)

openPopupProfileEditButton.addEventListener('click', () => {
    popup.openPopup();
    popup.showInputValueAfterOpenPopup(profileJobInput, profileUserJob, profileNameInput, profileUserName)
    formValidator.resetError(popupElement, validatorConfig)
})//слушатель событий кнопки открыть по-пап редактирования профиля





popupSubmitProfileForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    popup.toggleSubmitButtonTextContent(submitButtonEditProfile, 'Сохранение...')//меняю текстконтент кнопки пока идет загрузка с сервера
    api.pushProfileData({ profileNameInput, profileJobInput })//5. Редактирование профиля
        .then(res => popup.saveChange(profileJobInput, profileUserJob, profileNameInput, profileUserName))
        .then(res => popup.closePopup(popupProfileEdit))//закрываю попап
        .catch((err) => console.log(err))//в случае ошибки вывожу ее в консоль
        .finally(res => popup.toggleSubmitButtonTextContent(submitButtonEditProfile, 'Сохранить'))//возвращаю текст контент кнопке
})//слушатель событий сохранить изменения в профиль






//     // //4. Добавление карточки
//     // //слушатели-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
//     formNewPhoto.addEventListener('submit', (evt) => {
//         evt.preventDefault()//отменяем дефолтный субмит
//         toggleSubmitButtonTextContent(addNewPhotoSubmitButton, 'Сохранение...')//меняем тексконтент кнопки , пока идет запрос на сервер
//         pushNewCard(nameImageInput.value, urlImageInput.value)//пушим карточку на сервер
//             .then(newCard => {

//                 insertCard(elementsGridContainer, createCards(urlImageInput.value, nameImageInput.value, userTemplateLi, newCard, newCard.owner._id))
//                 return newCard
//             })//Вставляем карточку на страницу
//             .then(newCard => {
//                 closePopup(popupAddNewPhoto)
//             })//закрываем попап
//             .catch(err => console.log(err))//выводим в консоль ошибку в случае возвращения с сервера ошибки
//             .finally(res => toggleSubmitButtonTextContent(addNewPhotoSubmitButton, 'Сохранить'))//возвращаем текст контент кнопки сохранить
// // })//функция добавления новой карточки отсылающая к ранее созданной функции с заменой аргументов



// //const elements = document.forms.myForm.elements;



// //3. Загрузка информации о пользователе с сервера



// const initCard = new Card()
// constructor(srcValue, titleValue, userTemplateLi, cardFromServer, userId)
// // //getInitialCards()






Promise.all([api.getUserId(), api.getInitialCards()])//добавил api.
    .then(([userData, cards]) => {
        const { name, about, avatar, _id: userId, cohort } = userData//деконструировал объект  userData в константы
        userAvatar.src = avatar
        profileUserName.textContent = name
        profileUserJob.textContent = about
        //    cards.reverse().forEach((card, index) => {
        //        const cardElement = new Card(card.link, card.name, userTemplateLi, card, userId, elementsGridContainer)
        //        cardElement.createCards()
        //    })

        const section = new Section({
            cards,
            renderer: (card) => {
                const cardElement = new Card(card.link, card.name, userTemplateLi, card, userId).createCards()
                section.addItem(cardElement)
            }
        }, elementsGridContainer)
        section.renderer()

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
    clearInputsValue(popupAvatar)
    resetError(popupAvatar, validatorConfig)
})


popupAvatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const submitButton = evt.submitter
    submitButton.textContent = 'Сохранение...'
    api.patchProfileAvatar(popupAvatarUrlInput.value)//добавил api.
        .then(res => {
            userAvatar.src = res.avatar
            closePopup(popupAvatar)
        })
        .catch(err => console.log(err))
        .finally(res => submitButton.textContent = 'Сохранить')
})

