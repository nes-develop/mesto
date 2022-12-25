export class Card {
	constructor({data, userId, templateSelector, handleCardClick, handleDeleteClick, handleSetLike, handleRemoveLike}) {
		this._name = data.name;
		this._link = data.link;
		this._likes = data.likes;
		this._id = data.id;
		this._userId = userId;
		this._ownerId = data.ownerId;

		this._templateSelector = templateSelector;
		this._handleCardClick = handleCardClick;
		this._handleDeleteClick = handleDeleteClick;
		this._handleSetLike = handleSetLike;
		this._handleRemoveLike = handleRemoveLike;





	}
	//шаблон
	_getCard() {
		return document.querySelector(this._templateSelector).content.querySelector('.cards').cloneNode(true)
	}
	//генерим карточку
	generateCard() {

		this._element = this._getCard();


		// this._element.querySelector('.cards__title').textContent = this._name;

		this._likeCountElement = this._element.querySelector('.cards__like_count')
		this._deleteButton = this._element.querySelector('.cards__delete');
		this._likeButton = this._element.querySelector('.cards__like');
		this._image = this._element.querySelector('.cards__image');
		this._title = this._element.querySelector('.cards__title');

		this._image.src = this._link;
		this._image.alt = this._name;
		this._title.textContent = this._name;
		this._likeCountElement.textContent = this._likes.length

		// this.setLikes(this._likes)
		this._isLiked()

		//проверка принадлежности карточки
		if (this._ownerId !== this._userId) {
			this._deleteButton.style.display = 'none'
		} else {
			this._deleteButton.addEventListener('click', () => {
				this._handleDeleteClick(this._id)
			})
		}
		this._setEventListeners(); //вызываем слушатели

		return this._element;
	}
	//метод удаления карторчки
	deleteCard() {
		this._element.remove();
		this._element = null
	}

	//метод для лайков
	handleLikeCard(newLikes) {
		this._likes = newLikes
		this._likeButton.classList.toggle('cards__like_active')
		//кол-во лайков массив
		// likeCountElement.textContent = '0'
		this._likeCountElement.textContent = this._likes.length


		// if (this.isLiked()) {
		// 	this._element.querySelector('.cards__like').
		// 		classList.add('cards__like_active');
		// } else {
		// 	this._element.querySelector('.cards__like').
		// 		classList.remove('cards__like_active');
		// }
	}

	_isLiked() {
		// const userHasLikedCard = this._likes.find(user => user._id === this._userId)
		// return userHasLikedCard
		if (this._likes.some((user) => {
			return this._userId === user._id
		})) {
			this._likeButton.classList.toggle('cards__like_active')
		}
	};


	_setEventListeners() {

		this._image.addEventListener('click', () => {
			this._handleCardClick(this._name, this._link);
		});

		this._likeButton.addEventListener('click', () => {
			if (this._likeButton.classList.contains('cards__like_active')) {
				this._handleRemoveLike(this._id)
			} else {
				this._handleSetLike(this._id)
			}
		});

		// this._element.querySelector('.cards__delete')
		// 	.addEventListener('click', () => this._handleDeleteClick(this._id));

		// 	this._element.remove();
		// 	this._element = null;
		// });


	}
}
