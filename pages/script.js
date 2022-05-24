let popup = document.querySelector('.popup');//попак редактировать профиль
let closeEditProfile = document.querySelector('.popup__close-button');//кнопка -закрыть попап редактирования профиля
let openEditProfile = document.querySelector('.profile__edit-button');//кнопка -открыть попап редактирования профиля


openEditProfile.addEventListener('click', openClose);//отслеживаем клик и даем ссылку на обработчик
closeEditProfile.addEventListener('click', openClose);//отслеживаем клик и даем ссылку на обработчик

function openClose() {
    popup.classList.toggle('popup_opened');
} //обработчик открытия и закрытия попап