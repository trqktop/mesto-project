let popupEditProfile = document.querySelector('.popup');//попак редактировать профиль
let closeEditProfile = popupEditProfile.querySelector('.popup__close-button');//кнопка -закрыть попап редактирования профиля
let openEditProfile = document.querySelector('.profile__edit-button');//кнопка -открыть попап редактирования профиля



openEditProfile.addEventListener('click', openClose);//отслеживаем клик и даем ссылку на обработчик для открытия попапа
closeEditProfile.addEventListener('click', openClose);//отслеживаем клик и даем ссылку на обработчик для закрытия попапа

function openClose() {

    popupEditProfile.classList.toggle('popup_opened');
} //обработчик открытия и закрытия попап






let porfileName = document.querySelector('.profile__user-name');//имя пользователя на главной

let porfileAbout = document.querySelector('.profile__user-about');//профессия пользователя на главной


let popupInputName = document.querySelector('#popup__name-input ');//ввод имя пользователя 
let popupInputAbout = document.querySelector('#popup__about-input');//ввод профессии пользователя

let popupSubmit = document.querySelector('.popup__submit-button')//кнопка сохранить изменения в попапе редактирования профиля




popupSubmit.addEventListener('click', saveClose);//отслеживаем клик и даем ссылку на обработчик для сохранения инфы в попапе

function saveClose() {
    porfileName.textContent = popupInputName.value;
    porfileAbout.textContent = popupInputAbout.value;
}//обработчик кнопки сохранить в попап редактор профиля





