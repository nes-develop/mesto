//переменные попапа 
const popupAdd = document.querySelector('.popup_add'); //попап добавления карточки
const popupEdit = document.querySelector('.popup_edit'); //попап редактирования профиля
const popupImage = document.querySelector('.popup_image'); //попап редактирования профиля
//переменные закрытия попапа 
const popupEditClose = document.querySelector('.popup__close_edit');
const popupAddClose = document.querySelector('.popup__close_add');
const popupImageClose = document.querySelector('.popup__close_image');
//переменные кнопок профиля
const popupAddOpen = document.querySelector('.profile__add-item');
const popupEditOpen = document.querySelector('.profile__edit-form');
//попап профиля
const popupForm = document.querySelector('.popup__content_edit');
const nameInput = document.querySelector('.popup__input_btn_name');
const professionInput = document.querySelector('.popup__input_btn_title');
//переменные профиля
const popupName = document.querySelector('.profile__name');
const popupProf = document.querySelector('.profile__title');
//попап добавления
const formAdd = document.querySelector('.popup__content_add');
const cardInputName = document.querySelector('.popup__input_btn_destination');
const cardInputLink = document.querySelector('.popup__input_btn_link');
//переменная шаблона
const container = document
    .querySelector('.template')
    .content.querySelector('.cards');
const section = document.querySelector('.elements');
const cardsContainer = section.querySelector('.elements__item');
//переменная изображения
const popupImageSize = popupImage.querySelector('.popup__image');
const popupSubtitle = popupImage.querySelector('.popup__subtitle');
//функция открытия попапа
const openPopup = function (popup) {
    popup.classList.add('popup_opened')
}
//функция закрытия попапа
const closePopup = function (popup) {
    popup.classList.remove('popup_opened')
}

const createCard = (card) => {
    const template = container.cloneNode(true);
    const cardImage = template.querySelector('.cards__image');
    const cardTitle = template.querySelector('.cards__title');

    cardTitle.textContent = card.name;
    cardImage.alt = card.name;
    cardImage.src = card.link;

    const cardDelete = template.querySelector('.cards__delete');
    const cardLike = template.querySelector('.cards__like');

    cardDelete.addEventListener('click', handleDelete);
    cardLike.addEventListener('click', handleLike);

    cardImage.addEventListener('click', function () {
        openPopup(popupImage);

        popupSubtitle.textContent = card.name;
        popupImageSize.alt = card.name;
        popupImageSize.src = card.link;
    });

    return template;
}

function createInitialCards() {
    initialCards.forEach(function (card) {
        cardsContainer.prepend(createCard(card));
    });
}

function submitForm(evt) {
    evt.preventDefault();
    popupName.textContent = nameInput.value;
    popupProf.textContent = professionInput.value;
    closePopup(popupEdit);
}

function handleLike(event) {
    const card = event.target;
    card.classList.toggle('cards__like_active');
}

function handleDelete(event) {
    const card = event.target.closest('.cards');
    card.remove();
}

formAdd.addEventListener('submit', function (event) {
    event.preventDefault();

    const card = {
        name: cardInputName.value,
        link: cardInputLink.value,
    };

    closePopup(popupAdd);
    cardsContainer.prepend(createCard(card));

});


popupEditOpen.addEventListener('click', function () {
    openPopup(popupEdit);
    nameInput.value = popupName.textContent;
    professionInput.value = popupProf.textContent;
});

popupAddOpen.addEventListener('click', function () {
    openPopup(popupAdd);
    formAdd.reset()
});

popupEditClose.addEventListener('click', function () {
    closePopup(popupEdit);
});

popupAddClose.addEventListener('click', function () {
    closePopup(popupAdd);
});

popupImageClose.addEventListener('click', function () {
    closePopup(popupImage);
});

popupForm.addEventListener('submit', submitForm);

createInitialCards();




// //попап профиля
// const popupEdit = document.querySelector('.popup_edit');
// //попап добавления фото
// const popupAdd = document.querySelector('.popup_add');

// //кнопка закрытия попапа профиля
// const editClose = popupEdit.querySelector('.popup__close-button');
// //кнопка закрытия попапа фото
// const addClose = popupAdd.querySelector('.popup__close-button');

// //форма попапа
// const popupFormElement = popup.querySelector('.popup__content');
// //кнопки формы
// const popupInputName = document.querySelector('.popup__input_btn_name');
// const popupInputTitle = document.querySelector('.popup__input_btn_title');

// //переменные для карточек
// const popupImage = document.querySelector('.popup_image');
// const imageOpen = document.querySelector('.cards__image');
// const imageClose = popupImage.querySelector('.popup__close-button');
// //переменные секции profile
// const profile = document.querySelector('.profile');
// const profileForm = profile.querySelector('profile__form');
// const profileName = profile.querySelector('.profile__name');
// const profileTitle = profile.querySelector('.profile__title');
// //кнопка по редактировани профиля
// const profileEditForm = profile.querySelector('.profile__edit-form');
// //кнопка по добавлениею фото
// const profileAddItem = document.querySelector('.profile__add-item');
// const formAdd = popupAdd.querySelector('.popup__content');
// const cardInputName = document.querySelector('.popup__input_btn_destination');
// const cardInputLink = document.querySelector('.popup__input_btn_link');

// const elements = document.querySelector('.elements');
// const elementsItem = elements.querySelector('.elements__item');
// //
// const container = document
// 	.querySelector('.template')
// 	.content.querySelector('.cards');
// const cardsContainer = document.querySelector('.elements__item');

// //переписал именно под отктиые 
// const openPopup = function (popup) {
//     popup.classList.add('popup_opened');
// };
// //переписал именно под закрытие 
// const closePopup = function (popup) {
// 	popup.classList.remove('popup_opened')
// }


// function submitInfo(evt) {
//     evt.preventDefault(); //меняем действия браузера по умолчанию, например отправка формы на сервер
//     profileName.textContent = popupInputName.value;
//     profileTitle.textContent = popupInputTitle.value;
//     openPopup(popupEdit);
// };


// //функция создания карточки
// function createCard(card) {
//     const template = document
//         .querySelector('.template')
//         .content.querySelector('.cards')
//         .cloneNode(true);

//     template.querySelector('.cards__title').textContent = card.name;
//     template.querySelector('.cards__image').alt = card.name;
//     template.querySelector('.cards__image').src = card.link;

//     template
//         .querySelector('.cards__delete')
//         .addEventListener('click', disLike);

//     template.querySelector('.cards__like').addEventListener('click', setLike);

//     elementsItem.prepend(template);

//     const imageOpen = template.querySelector('.cards__image');

//     imageOpen.addEventListener('click', function () {
//         openPopup(popupImage);
//         popupImage.querySelector('.popup__subtitle').textContent = card.name;
//         popupImage.querySelector('.popup__image').alt = card.name;
//         popupImage.querySelector('.popup__image').src = card.link;
//     });
// }
// //поставить лайк
// function setLike(event) {
//     const card = event.target;
//     card.classList.toggle('cards__like_active');
// };
// //снять лайк
// function disLike(event) {
//     const card = event.target.parentNode;
//     card.remove();
// };

// function addEventListeners() {
//     formAdd.addEventListener('submit', function (event) {
//         event.preventDefault();

//         const newCard = {
//             name: cardInputName.value,
//             link: cardInputLink.value,
//         };

//         createCard(newCard);

//         openPopup(popupAdd);
//     });
// }


// //функция открытия попапа с профилем
// profileEditForm.addEventListener('click', function () {
//     openPopup(popupEdit);
//     popupInputName.value = profileName.textContent;
//     popupInputTitle.value = profileTitle.textContent;
// });

// //функция открытия попапа с добавлением фото
// profileAddItem.addEventListener('click', function () {
//     openPopup(popupAdd);
// });

// editClose.addEventListener('click', function () {
//     openPopup(popupEdit);
// });

// addClose.addEventListener('click', function () {
//     openPopup(popupAdd);
// });

// imageClose.addEventListener('click', function () {
//     openPopup(popupImage);
// });

// popupFormElement.addEventListener('submit', submitInfo);

// addEventListeners();

// createInitialCards();