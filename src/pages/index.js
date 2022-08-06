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


function createCard(item) {
    const cardData = new Card({
        data: item, api, userId, templateSelector,
        handleCardClick: (elementImage) => {
            elementImage.addEventListener('click', () => {
                popupWithImage.open(item)
            })
        }
    })
    return cardData.generate()
}



//инициализация карточек при первом запуске ----------------------------------------------------------------------------------------------------------------
Promise.all([api.getUserProfileInfo(), api.getInitialCards()])//переписать getUserId() на UserInfo class
    .then(([userData, cards]) => {
        userInfo.setUserInfo(userData)
        const { name, about, avatar, _id, cohort } = userData
        userId = _id
        return { userId, cards }
    })
    .then(({ userId, cards }) => {

        const section = new Section({
            cards,
            renderer: (item) => {
                section.addItem(createCard(item))
                //     const cardData = new Card({
                //         data: item, api, userId, templateSelector,
                //         handleCardClick: (elementImage) => {
                //             elementImage.addEventListener('click', () => {
                //                 popupWithImage.open(item)
                //             })
                //         }
                //     })
                //     const cardElement = cardData.generate()
                //     section.addItem(cardElement)
            }
        }, elementsGridContainer)
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

    //popupWithFormProfile.showInputValueAfterOpenPopup(profileJobInput, profileUserJob, profileNameInput, profileUserName)//открытие попапа
    //validPopupProfileEdit.resetError(popupSubmitProfileForm)//открытие попапа
})//слушатель событий кнопки открыть по-пап редактирования профиля

//редактирование профиля ------------------------------------------------------------------------------------------------------------------------------------------------




//дабвления карточки на страницу ------------------------------------------------------------------------------------------------------------------------------
//const popupNewCard = new Popup(popupAddNewPhoto)
//popupNewCard.setEventListeners(closeButtons)


const validPopupAddCard = new FormValidator(validatorConfig, formNewPhoto)
validPopupAddCard.enableValidation()



profileAddCardButton.addEventListener('click', () => {
    formNewPhoto.reset()
    validPopupAddCard.resetValidation()
    popupFormNewCard.openPopup()
    // popupNewCard.clearInputsValue(popupAddNewPhoto)
    // validPopupAddCard.resetError(formNewPhoto)
    // validPopupAddCard.disableSubmitButton(addNewPhotoSubmitButton, validatorConfig.inactiveButtonClass)
})



//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const popupFormNewCard = new PopupWithForm({
    popupElement: popupAddNewPhoto,
    handler: ({ imagename, imageurl }) => {
        popupFormNewCard.toggleSubmitButtonTextContent('Сохранение...')//меняем тексконтент кнопки , пока идет запрос на сервер
        api.pushNewCard(imagename, imageurl)//пушим карточку на сервер
            .then(cardFromServer => {


                //создаем карточку
                //    const cardData = new Card({
                //        data: cardFromServer, api, userId, templateSelector,
                //        handleCardClick: (elementImage) => {
                //            elementImage.addEventListener('click', () => {
                //                popupWithImage.open(cardFromServer)
                //            })
                //        }
                //    })
                //    const cardElement = cardData.generate()


                //вставляем карточку в разметку
                const section = new Section({
                    cards: cardFromServer,
                    renderer: (cardFromServer) => {
                        //section.addItem(cardElement)
                        section.addItem(createCard(cardFromServer))
                    }
                }, elementsGridContainer)
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


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!






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


//const popupAva = new Popup(popupAvatar)
//popupAva.setEventListeners(closeButtons)
const validPopupUserAvatar = new FormValidator(validatorConfig, popupAvatarForm)
validPopupUserAvatar.enableValidation()

userAvatar.addEventListener('click', () => {
    validPopupUserAvatar.resetValidation()
    popupAvatarForm.reset()
    popupAvaForm.openPopup()
    // popupAva.clearInputsValue()
    //  validPopupUserAvatar.disableSubmitButton(avatarSubmit, validatorConfig.inactiveButtonClass)
    // validPopupUserAvatar.resetError(popupAvatar)
})



const popupAvaForm = new PopupWithForm({
    popupElement: popupAvatar,
    handler: () => {
        popupAvaForm.toggleSubmitButtonTextContent('Сохранение...')
        api.patchProfileAvatar(popupAvatarUrlInput.value)//добавил api.
            .then(avatar => {
                userInfo.setUserInfo(avatar)
                popupAvaForm.close()
            })
            .catch(err => console.log(err))
            .finally(res => popupAvaForm.toggleSubmitButtonTextContent('Сохранить'))
    }
})

popupAvaForm.setEventListeners()

