//1. Работа модальных окон
const popupEditProfile = document.querySelector('.popup');//попап редактировать профиль
const closeEditProfile = popupEditProfile.querySelector('.popup__close-button');//кнопка -закрыть попап редактирования профиля
const openEditProfile = document.querySelector('.profile__edit-button');//кнопка -открыть попап редактирования профиля
const porfileName = document.querySelector('.profile__user-name');//имя пользователя на главной
const porfileAbout = document.querySelector('.profile__user-about');//профессия пользователя на главной
const popupInputName = document.querySelector('#popupNameInput ');//ввод имя пользователя в попапе
const popupInputAbout = document.querySelector('#popupAboutInput');//ввод профессии пользователя в попапе
const popupSubmit = document.querySelector('.popup__submit-button')//кнопка сохранить изменения в попапе редактирования профиля

//Открытие и закрытие модального окна

openEditProfile.addEventListener('click', openClose);//отслеживаем клик и даем ссылку на обработчик для открытия попапа
closeEditProfile.addEventListener('click', openClose);//отслеживаем клик и даем ссылку на обработчик для закрытия попапа
popupSubmit.addEventListener('click', saveClose);//отслеживаем клик и даем ссылку на обработчик для сохранения инфы в попапе



popupInputName.value = porfileName.textContent;
popupInputAbout.value = porfileAbout.textContent;


//обработчики кнопок попапа редактирования профиля
function saveClose(evt) {
    evt.preventDefault();
    porfileName.textContent = popupInputName.value;
    porfileAbout.textContent = popupInputAbout.value;
    openClose()
}//обработчик кнопки сохранить в попап редактор профиля




function openClose() {
    popupEditProfile.classList.toggle('popup_opened');
} //обработчик открытия и закрытия попап



//2. Шесть карточек «из коробки»

let elementGridContainer = document.querySelector('.elements__grid-container') //определил контейнер для темплейта 
let templateCard = document.querySelector('.template').content;//определил шаблон темплейта



const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function initialCardsPush(event) {
    initialCards.push(event)
}//функция пуша в основной массив





initialCards.forEach(function (element) {
    const initialCardsElement = templateCard.cloneNode(true);
    initialCardsElement.querySelector('.element__caption-about').textContent = element.name;
    initialCardsElement.querySelector('.element__image').src = element.link;
    elementGridContainer.append(initialCardsElement);

});//закоментил карточки в хтмл и для каждого елемента массива выше,через темплейт создал карточку





//3. Форма добавления карточки
let popupMesto = document.querySelector('#popupMesto')//ищем попап места
let profileAddButton = document.querySelector('.profile__add-button')//определил кнопку добавления места
let mestoCloseButton = popupMesto.querySelector('#mestoCloseButton')//ищем кнопку закрытия попапа места

let nameImageInput = popupMesto.querySelector('#nameImageInput');//ищем значения в полях ввода данных в попапе
let urlImageInput = popupMesto.querySelector('#urlImageInput');//ищем значения в полях ввода данных в попапе
let createMesto = popupMesto.querySelector('#createMesto')//кнопка СОЗДАТЬ

//4. Добавление карточки

profileAddButton.addEventListener('click', addMestoOpenClose) //отслеживаем клик и вешаем оброботчик открытия
mestoCloseButton.addEventListener('click', addMestoOpenClose)//отслеживаем клик и вешаем оброботчик закрытия

//отслеживаем клик кнопки сохранить . копируем темплейт, сохраняем изменения в копированный темплейт с полей инпут, добавляем карточку темплейт в начало грид контейнера 
createMesto.addEventListener('click', function (evt) {
    evt.preventDefault()
    const initialCardsElement = templateCard.cloneNode(true);
    initialCardsElement.querySelector('.element__caption-about').textContent = nameImageInput.value;
    initialCardsElement.querySelector('.element__image').src = urlImageInput.value;
    likeArr.push(initialCardsElement.querySelector('.element__button'));//пушу в массив лайков новосозданый лайк из новосозданой карточки
    elementGridContainer.prepend(initialCardsElement)

})

//второй обработчик для пуша данных в массив 
createMesto.addEventListener('click',
    function () {
        let element = document.querySelector('.element');
        element = {
            name: nameImageInput.value,
            link: urlImageInput.value
        };
        initialCards.push(element);
        addMestoOpenClose()
    }
)

//Открытие и закрытие попапа
function addMestoOpenClose() {
    popupMesto.classList.toggle('popup_opened');
}




//5. Лайк карточки

var like = document.querySelectorAll('.element__button')//нашел и обьявил нодлист лайков на  сатранице
var likeArr = Array.from(like)//перевел лайки в массив 
likeArr.forEach(function (item) {
    item.addEventListener('click', function () {
        item.classList.toggle('element__button_active')
    })
})//подключил активное состояние при клике 









