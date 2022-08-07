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

const buttonElement = document.querySelector('.popup__submit-button');

const validationConfig = {
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_invalid',
	inputErrorClass: 'popup__input_invalid',
	errorTextClass: 'popup__error',
  };


//функция для закрытия по Esc
const pressBtnEsc = (evt) => {
    //првоеряем нажата ли кнопка Esc, переписано на Escape
    if (evt.key === 'Escape') {
        //ищем активный попап
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
    }
};
//функция по нажатию на overlay
const pressOnOverlay = (evt) => {
    //если нажали , закрыть попап
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
    }
};

//функция открытия попапа
const openPopup = function (popup) {
    popup.classList.add('popup_opened');
    //добавляем слушатель на нажатую кнопку esc
    document.addEventListener('keydown', pressBtnEsc);
}
//функция закрытия попапа
const closePopup = function (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', pressBtnEsc);
};

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
    //добавляем функцию из validate
    disabledButton(buttonElement, validationConfig);

});


popupEditOpen.addEventListener('click', function () {
    openPopup(popupEdit);
    //добавляем функцию из validate
    activeButton(buttonElement, validationConfig);
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

//слушатели для всех попапов по нажатию на overlay
popupEdit.addEventListener('click', pressOnOverlay);
popupAdd.addEventListener('click', pressOnOverlay);
popupImage.addEventListener('click', pressOnOverlay);

popupForm.addEventListener('submit', submitForm);

createInitialCards();