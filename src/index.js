import './pages/index.css';

import { FormValidator } from './components/FormValidator.js';
import { Card } from './components/Card.js';
import { Section } from './components/Section.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
import {
    cardsContainer,
    initialCards,
    nameInput,
    popupAdd, 
    popupAddOpen,
    popupEdit,
    popupEditOpen,
    popupImage,
    professionInput,
    popupName,
    popupProf, 
    validationConfig,
} from './utils/constants.js';

//создаем новые классы валидации
const editFormValidator = new FormValidator(validationConfig, popupEdit);
const addFormValidator = new FormValidator(validationConfig, popupAdd);

const createCard = (item) => {
    const card = new Card(item.name, item.link, '.template', () => {
        handleCardClick(item.name, item.link);
    });
    return card.generateCard()
}

const defaultCardList = new Section({
        items: initialCards,
        renderer: (item) => {
            const cardElement = createCard(item);
            defaultCardList.addItem(cardElement)
            },
        },
    cardsContainer
);

const addCardPopup = new PopupWithForm(popupAdd, (item) => {
    const newCard = createCard(item);
    defaultCardList.addItem(newCard);

    addCardPopup.close();
    addFormValidator.disableSubmitButton();
});

const imageViewPopup = new PopupWithImage(popupImage);
const handleCardClick = (name, link) => imageViewPopup.open(name, link);

const userInfo = new UserInfo({
    username: popupName, job: popupProf,
});



const editProfilePopup = new PopupWithForm(popupEdit, (data) => {
    userInfo.setUserInfo({
        name: data.name, job: data.job
    });

    editProfilePopup.close();

    editFormValidator.disableSubmitButton();

});


popupEditOpen.addEventListener('click', function () {
    const info = userInfo.getUserInfo();
    nameInput.value = info.name;
    professionInput.value = info.about;

    editProfilePopup.open();
});

popupAddOpen.addEventListener('click', function () {
    addCardPopup.open();
    //оставляем функцию disable, тк при заполнении формы и переоткрытии можно создать пустые
    addFormValidator.disableSubmitButton();

});

editFormValidator.enableValidation();
addFormValidator.enableValidation();
defaultCardList.renderItems();
imageViewPopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();