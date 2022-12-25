import './index.css';

import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { api } from '../components/Api.js';
import { PopupWithSubmitForm } from '../components/PopupWithSubmitForm.js';

import {
    cardsContainer,
    avatarImage,
    initialCards,
    nameInput,
    professionInput,
    popupForm,
    popupAdd,
    popupAddOpen,
    popupEdit,
    popupEditOpen,
    popupImage,
    formAdd,
    popupName,
    popupProf,
    validationConfig,
    popupDelete,
    popupAvatar,
    popupSubmitButton
} from '../utils/constants.js';

//валидация аватара
const avatarFormValidator = new FormValidator(validationConfig, popupAvatar)
avatarFormValidator.enableValidation()

//создаем новые классы валидации
const validatorPopupEdit = new FormValidator(validationConfig, popupForm);
validatorPopupEdit.enableValidation();
const validatorPopupAdd = new FormValidator(validationConfig, formAdd);
validatorPopupAdd.enableValidation();

//переменная для уникального id пользователя
let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([initialCards, res]) => {
        //передаем по методу setUserInfo из класса UserInfo 
        userInfo.setUserInfo(res)
        userId = res._id;
        initialCards.reverse()
        defaultCardList.renderItems(initialCards)
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`)
    })

// api.getUserInfo()
//     .then(res => {
//         //передаем по методу setUserInfo из класса UserInfo 
//         userInfo.setUserInfo(res.name, res.about, res.avatar);
//         userId = res._id
//     })


// api.getInitialCards()
//     .then(cardList => {
//         cardList.forEach(data => {
//             const card = createCard({
//                 name: data.name,
//                 link: data.link,
//                 likes: data.likes,
//                 id: data._id,
//                 userId: userId,
//                 ownerId: data.owner._id
//             })
//             defaultCardList.addItem(card)
//         });
//     })




//Создание карточки
const createCard = (data) => {
    //из класса Card 1 аргумент data, третий селектор шаблона, четвертый функция 
    const card = new Card({
        data: data,
        userId: userId,
        templateSelector: '.template',
        //функция открытия
        handleCardClick: (name, link) => {
            imageViewPopup.open(name, link)
        }, handleDeleteClick: (cardId) => {
            deleteCardPopup.open()
            deleteCardPopup.changeSubmitHandler(() => {
                api.deleteCard(cardId)
                    .then(() => {
                        card.deleteCard()
                        deleteCardPopup.close();
                    })
                    .catch((err) => {
                        console.log(`Ошибка: ${err}`)
                    })
            })
        },
        handleSetLike: (cardId) => {
            api.addLike(cardId)
                .then((res) => {
                    card.handleLikeCard(res.likes)
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        },
        handleRemoveLike: (cardId) => {
            //функция дизлайка
            api.deleteLike(cardId)
                .then(res => {
                    card.handleLikeCard(res.likes)
                })

                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });

        }

    })
    return card.generateCard();
}

//добавление карточек при загрузке
const defaultCardList = new Section({
    // items: initialCards,
    renderer: (data) => {

        defaultCardList.addItem((createCard({
            name: data.name,
            link: data.link,
            likes: data.likes,
            id: data._id,
            userId: data.userId,
            ownerId: data.owner._id
        })))
    }
}, cardsContainer);

// defaultCardList.renderItems();

//popup добавления карточки
const cardAddPopup = new PopupWithForm(popupAdd, (data) => {

    cardAddPopup.loading(true);
    //добавляем api для добавление карточки
    //item.name, item.link, item.likes, item._id, item.avatar
    api.addCard((data))
        .then(res => {
            //создание карточки 
            const newCard = createCard({
                name: res.name, link: res.link, likes: res.likes, id: res._id, userId: res.userId, ownerId: res.owner._id
            })
            //добавление карточки через класс Section
            defaultCardList.addItem(newCard);
            cardAddPopup.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        })
        .finally(() => {
            cardAddPopup.loading(false)
        })

});
cardAddPopup.setEventListeners();

validatorPopupAdd.disableSubmitButton();


//редактикирование профиля
const editProfilePopup = new PopupWithForm(popupEdit, (data) => {

    editProfilePopup.loading(true);
    // const { name, job, avatar } = data

    //вызываем метод api корректировки профиля
    api.editUserInfo(data)
        .then((data) => {

            //через метод setUserInfo из класса UserInfo ставим значениея по name и job 
            // userInfo.setUserInfo(res.name, res.job, res.avatar)
            userInfo.setUserInfo(data);

            //добавил временно для закрытия попапа, перенес в then чтобы только после ответа
            editProfilePopup.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        })
        .finally(() => {
            editProfilePopup.loading(false)
        })
});
editProfilePopup.setEventListeners();

//
popupAddOpen.addEventListener('click', function () {
    validatorPopupAdd.cleanError();
    //оставляем функцию disable, тк при заполнении формы и переоткрытии можно создать пустые
    validatorPopupAdd.disableSubmitButton(popupSubmitButton);
    cardAddPopup.open();

});


//создаем новый попап для смены аватара
const editAvatarPopup = new PopupWithForm(popupAvatar, (data) => {
    editAvatarPopup.loading(true);
    // const { name, job, avatar } = data
    api.changeAvatar(data)
        .then(data => {
            userInfo.setUserInfo(data);
            editAvatarPopup.close()

        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        })
        .finally(() => {
            editAvatarPopup.loading(false)
        })

});
editAvatarPopup.setEventListeners();

//попап подтверждения удаления через новый метод
const deleteCardPopup = new PopupWithSubmitForm(popupDelete)
deleteCardPopup.setEventListeners();

//popup с картинкой
const imageViewPopup = new PopupWithImage(popupImage);
imageViewPopup.setEventListeners();

//popup редактирования профиля
const userInfo = new UserInfo({ username: popupName, job: popupProf, avatar: avatarImage });


popupEditOpen.addEventListener('click', () => {

    //получаем методом getUserInfo из класса UserInfo значение из инпутов 
    const info = userInfo.getUserInfo();
    nameInput.value = info.name;
    professionInput.value = info.about;

    validatorPopupEdit.cleanError();
    editProfilePopup.open();
});


//создаем новый попап для смены аватара
avatarImage.addEventListener('click', () => {

    //оставляем функцию disable, тк при заполнении формы и переоткрытии можно создать пустые
    avatarFormValidator.disableSubmitButton(popupSubmitButton)
    editAvatarPopup.open()
})








// function handleCardClick(name, link) {
//     imageViewPopup.open(name, link);
// }










