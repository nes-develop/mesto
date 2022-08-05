

//объявляем все переменные по документу, используем cameCase
let page = document.querySelector('.page');
let content = page.querySelector('.content');
//переменные popup
let popup = document.querySelector('.popup');

//попап профиля
let popupEdit = document.querySelector('.popup_edit');
//попап добавления фото
let popupAdd = document.querySelector('.popup_add');

//кнопка закрытия попапа профиля
let editClose = popupEdit.querySelector('.popup__close-button');
//кнопка закрытия попапа фото
let addClose = popupAdd.querySelector('.popup__close-button');

//форма попапа
let popupFormElement = popup.querySelector('.popup__content');
//кнопки формы
let popupInputName = document.querySelector('.popup__input_btn_name');
let popupInputTitle = document.querySelector('.popup__input_btn_title');

//переменные для карточек
let popupImage = document.querySelector('.popup_image');
let imageOpen = document.querySelector('.cards__image');
let imageClose = popupImage.querySelector('.popup__close-button');
//переменные секции profile
let profile = document.querySelector('.profile');
let profileForm = profile.querySelector('profile__form');
let profileName = profile.querySelector('.profile__name');
let profileTitle = profile.querySelector('.profile__title');
//кнопка по редактировани профиля
let profileEditForm = profile.querySelector('.profile__edit-form');
//кнопка по добавлениею фото
let profileAddItem = document.querySelector('.profile__add-item');
let formAdd = popupAdd.querySelector('.popup__content');
let cardInputName = document.querySelector('.popup__input_btn_destination');
let cardInputLink = document.querySelector('.popup__input_btn_link');

const elements = document.querySelector('.elements');
const elementsItem = elements.querySelector('.elements__item');

//функция по открытию popup, любого
const openPopup = function (popup) {
    popup.classList.toggle('popup_opened');

};

function submitInfo(evt) {
    evt.preventDefault(); //меняем действия браузера по умолчанию, например отправка формы на сервер
    profileName.textContent = popupInputName.value;
    profileTitle.textContent = popupInputTitle.value;
    openPopup(popupEdit);
};

function createInitialCards() {
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

    initialCards.forEach(createCard);
}
//функция создания карточки
function createCard(card) {
    const template = document
        .querySelector('.template')
        .content.querySelector('.cards')
        .cloneNode(true);

    template.querySelector('.cards__title').textContent = card.name;
    template.querySelector('.cards__image').alt = card.name;
    template.querySelector('.cards__image').src = card.link;

    template
        .querySelector('.cards__delete')
        .addEventListener('click', disLike);

    template.querySelector('.cards__like').addEventListener('click', setLike);

    elementsItem.prepend(template);

    const imageOpen = template.querySelector('.cards__image');

    imageOpen.addEventListener('click', function () {
        openPopup(popupImage);
        popupImage.querySelector('.popup__subtitle').textContent = card.name;
        popupImage.querySelector('.popup__image').alt = card.name;
        popupImage.querySelector('.popup__image').src = card.link;
    });
}
//поставить лайк
function setLike(event) {
    const card = event.target;
    card.classList.toggle('cards__like_active');
};
//снять лайк
function disLike(event) {
    const card = event.target.parentNode;
    card.remove();
};

function addEventListeners() {
    formAdd.addEventListener('submit', function (event) {
        event.preventDefault();

        const newCard = {
            name: cardInputName.value,
            link: cardInputLink.value,
        };

        createCard(newCard);

        openPopup(popupAdd);
    });
}


//функция открытия попапа с профилем
profileEditForm.addEventListener('click', function () {
    openPopup(popupEdit);
    popupInputName.value = profileName.textContent;
    popupInputTitle.value = profileTitle.textContent;
});

//функция открытия попапа с добавлением фото
profileAddItem.addEventListener('click', function () {
    openPopup(popupAdd);
});

editClose.addEventListener('click', function () {
    openPopup(popupEdit);
});

addClose.addEventListener('click', function () {
    openPopup(popupAdd);
});

imageClose.addEventListener('click', function () {
    openPopup(popupImage);
});

popupFormElement.addEventListener('submit', submitInfo);

addEventListeners();
createInitialCards();