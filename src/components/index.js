import { popupFunctions } from "./modal.js";
import { card, addNewCardOnPage } from "./card.js";
import "../pages/index.css";

//1. Работа модальных окон
//слушатели-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
popupFunctions.data.closePopupProfileEdit.addEventListener('click', () => popupFunctions.render.closePopup(popupFunctions.data.popupProfileEdit))//слушатель событий кнопки закрыть по-пап редактирования профиля
popupFunctions.data.openPopupProfileEditButton.addEventListener('click', () => popupFunctions.render.openPopup(popupFunctions.data.popupProfileEdit))//слушатель событий кнопки открыть по-пап редактирования профиля
popupFunctions.data.popupSubmitProfileForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    popupFunctions.render.submitListener();
}) //слушатель событий сохранить изменения в профиль
//2. Шесть карточек «из коробки»
//функции---------------------------------------------------------------------------------------------------------------------------------------
card.data.initialCards.forEach(item => card.render.insertCard(card.render.createCards(item.link, item.name))
)//перебираем массив и вызываем функцию к каждому элементу массива 

//3. Форма добавления карточки
addNewCardOnPage.data.popupNewPhotoCloseButton.addEventListener('click', () => popupFunctions.render.closePopup(addNewCardOnPage.data.popupAddNewPhoto))
addNewCardOnPage.data.profileAddCardButton.addEventListener('click', () => popupFunctions.render.openPopup(addNewCardOnPage.data.popupAddNewPhoto))
//4. Добавление карточки
card.data.formNewPhoto.addEventListener('submit', (evt) => {
    evt.preventDefault()
    card.render.insertCard(card.render.createCards(card.data.urlImageInput.value, card.data.nameImageInput.value))
    popupFunctions.render.closePopup(addNewCardOnPage.data.popupAddNewPhoto)
})//функция добавления новой карточки отсылающая к ранее созданной функции с заменой аргументов 
//5. Лайк карточки
//6. Удаление карточки
//7. Открытие попапа с картинкой

//закрытие попапа при клике на оверлей

popupFunctions.data.popupArr.forEach((popupElem) => {
    popupElem.addEventListener('click', (evt) => {
        if(evt.target === popupElem)
        popupFunctions.render.closePopup(popupElem)
    })

    document.addEventListener(('keydown'), (evt) => {
        if (evt.key === 'Escape') {
            popupFunctions.render.closePopup(popupElem)
        }
    })//закрытие попапа при нажатие на ескейп
}
)



