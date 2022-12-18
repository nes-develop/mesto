export class Card {
	constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleSetLike) {
		this._name = data.name;
		this._link = data.link;
		this._likes = data.likes;
		this._id = data.id;
		this._userId = data.userId,
			this._ownerId = data.ownerId

		this._handleCardClick = handleCardClick;
		this._handleDeleteClick = handleDeleteClick;
		this._handleSetLike = handleSetLike;

		this._templateSelector = templateSelector;
		this._element = this._getCard();
		this._image = this._element.querySelector('.cards__image');

	}
	//шаблон
	_getCard() {
		const cardElement = document
			.querySelector(this._templateSelector)
			.content
			.querySelector('.cards')
			.cloneNode(true);

		return cardElement;
	}
	//генерим карточку
	generateCard() {
		this._setEventListeners(); //вызываем слушатели
		this._image.src = this._link;
		this._image.alt = this._name;
		this._element.querySelector('.cards__title').textContent = this._name;

		this.setLikes(this._likes)

		//проверка принадлежности карточки
		if (this._ownerId !== this._userId) {
			this._element.querySelector('.cards__delete').style.display = 'none'
		}

		return this._element;
	}
	//метод удаления карторчки
	deleteCard() {
		this._element.remove();
		this._element = null
	}

	//метод для лайков
	setLikes(newLikes) {
		this._likes = newLikes
		const likeCountElement = this._element.querySelector('.cards__like_count')
		//кол-во лайков массив
		// likeCountElement.textContent = '0'
		likeCountElement.textContent = this._likes.length


		if (this.isLiked()) {
			this._element.querySelector('.cards__like').
				classList.add('cards__like_active');
		} else {
			this._element.querySelector('.cards__like').
				classList.remove('cards__like_active');
		}
	}

	isLiked() {
		const userHasLikedCard = this._likes.find(user => user._id === this._userId)
		return userHasLikedCard
	};


	_setEventListeners() {


		this._element.querySelector('.cards__like')
			.addEventListener('click', () => this._handleSetLike(this._id));

		this._element.querySelector('.cards__delete')
			.addEventListener('click', () => this._handleDeleteClick(this._id));

		// 	this._element.remove();
		// 	this._element = null;
		// });

		this._image.addEventListener('click', () => {
			this._handleCardClick(this._name, this._link);
		});
	}
}
