// //0. импорт-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
import "./index.css";//0.3 импорт для вебпака 
import { Card } from "../components/Card.js";//0.1 импорт функций работы с карточками
import { Api } from "../components/Api.js"
import { Section } from "../components/Section.js"
import { PopupWithImage } from "../components/PopupWithImage.js"
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
// //0.2 импорт переменных
import {
    avatarSubmit,
    formEditAvatar,
    templateSelector,
    userTemplate,
    popupFullScreen, fullScreenCloseButton, validatorConfig, urlImageInput, nameImageInput, popupAddNewPhoto,
    userTemplateLi, elementsGridContainer, profileJobInput, profileUserJob, profileNameInput, profileUserName,
    popupProfileEdit, popupSubmitProfileForm, openPopupProfileEditButton, profileAddCardButton, formNewPhoto, avatarEditPen,
    userAvatar, popupAvatar, popupAvatarForm, popupAvatarUrlInput, addNewPhotoSubmitButton, submitButtonEditProfile,
    closeButtons, options, fullScreenImage, fullScreenImageDescription
} from "../utils/constants.js"//РАЗОБРАТЬСЯ С КОНСТАНТАМИ
import { FormValidator } from '../components/FormValidator.js'

let userId

const api = new Api(options)//api.СОЗДАЕТСЯ 1 РАЗ
const userInfo = new UserInfo({ profileUserName, profileUserJob, profileAvatar: userAvatar })//тут определяем все данные на странице. в том числе userId
const popupWithImage = new PopupWithImage(popupFullScreen)
popupWithImage.setEventListeners()

function createCard(item) {
    const cardData = new Card({
        data: item, api, userId, templateSelector,
        handleCardClick: () => {
            popupWithImage.open(item)
        },
        handleCardDeleteButtonListener: (element, cardId) => {
            api.requestToDeleteFromTheServer(cardId)
                .then(res => {
                    element.remove()
                })
                .catch(err => console.log(err))
        },
        handleCardlikeButtonListenerActive: (cardId, elementLike, elementLikeCount) => {
            api.putLikeOnServer(cardId)
                .then(newCard => {
                    elementLikeCount.textContent = newCard.likes.length
                })
                .then(res => elementLike.classList.add('element__button_active'))
                .catch(err => console.log(err))
        },
        handleCardlikeButtonListenerDelete: (cardId, elementLike, elementLikeCount) => {
            api.deleteLikeFromServer(cardId)
                .then(newCard => {
                    elementLikeCount.textContent = newCard.likes.length
                })
                .then(res => elementLike.classList.remove('element__button_active'))
                .catch(err => console.log(err))
        }
    })
    return cardData.generate()
}




const section = new Section({
    renderer: (item) => {
        section.addItem(createCard(item))
    }
}, elementsGridContainer)




//инициализация карточек при первом запуске ----------------------------------------------------------------------------------------------------------------
Promise.all([api.getUserProfileInfo(), api.getInitialCards()])//переписать getUserId() на UserInfo class
    .then(([userData, cards]) => {
        userInfo.setUserInfo(userData)
        const { name, about, avatar, _id, cohort } = userData
        userId = _id
        return { userId, cards }
    })
    .then(({ userId, cards }) => {
        section.renderItems(cards)
    })
    .catch(err => {
        console.log(err)
    })


const popupWithFormProfile = new PopupWithForm({
    popupElement: popupProfileEdit, handler: ({ username, userabout }) => {
        popupWithFormProfile.toggleSubmitButtonTextContent('Сохранение...')//меняю текстконтент кнопки пока идет загрузка с сервера
        api.pushProfileData(username, userabout)//5. Редактирование профиля
            .then(newData => {
                popupWithFormProfile.close()
                return newData
            })
            .then(newData => userInfo.setUserInfo(newData))
            .catch((err) => console.log(err))//в случае ошибки вывожу ее в консоль
            .finally(res => popupWithFormProfile.toggleSubmitButtonTextContent('Сохранить'))//возвращаю текст контент кнопке
    }
})

popupWithFormProfile.setEventListeners()







const validPopupProfileEdit = new FormValidator(validatorConfig, popupSubmitProfileForm)//валидация попапа
validPopupProfileEdit.enableValidation()//валидация попапа

openPopupProfileEditButton.addEventListener('click', () => {//открытие попапа
    validPopupProfileEdit.resetValidation()
    const userData = userInfo.getUserInfo()
    profileJobInput.value = userData.about
    profileNameInput.value = userData.name
    popupWithFormProfile.openPopup();//открытие попапа
})//слушатель событий кнопки открыть по-пап редактирования профиля



const validPopupAddCard = new FormValidator(validatorConfig, formNewPhoto)
validPopupAddCard.enableValidation()



profileAddCardButton.addEventListener('click', () => {
    validPopupAddCard.resetValidation()
    popupFormNewCard.open()
})




const popupFormNewCard = new PopupWithForm({
    popupElement: popupAddNewPhoto,
    handler: ({ imagename, imageurl }) => {
        popupFormNewCard.toggleSubmitButtonTextContent('Сохранение...')//меняем тексконтент кнопки , пока идет запрос на сервер
        api.pushNewCard(imagename, imageurl)//пушим карточку на сервер
            .then(cardFromServer => {
                section.renderer(cardFromServer)
            })
            .then(newCard => {
                popupFormNewCard.close()
            })
            .catch(err => console.log(err))//выводим в консоль ошибку в случае возвращения с сервера ошибки
            .finally(res => {
                popupFormNewCard.toggleSubmitButtonTextContent('Сохранить')
            })//возвращаем текст контент кнопки сохранить
    }
})
popupFormNewCard.setEventListeners()



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



//редактирование аватара------------------------------------------------


const validPopupUserAvatar = new FormValidator(validatorConfig, popupAvatarForm)
validPopupUserAvatar.enableValidation()

userAvatar.addEventListener('click', () => {
    validPopupUserAvatar.resetValidation()
    popupAvaForm.open()
})



const popupAvaForm = new PopupWithForm({
    popupElement: popupAvatar,
    handler: ({ imageurl }) => {
        popupAvaForm.toggleSubmitButtonTextContent('Сохранение...')
        api.patchProfileAvatar(imageurl)//добавил api.
            .then(avatar => {
                userInfo.setUserInfo(avatar)
                popupAvaForm.close()
            })
            .catch(err => console.log(err))
            .finally(res => popupAvaForm.toggleSubmitButtonTextContent('Сохранить'))
    }
})

popupAvaForm.setEventListeners()

