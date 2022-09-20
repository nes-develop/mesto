export class Card {
	constructor(name, link, templateSelector, handleCardClick) {
		this._name = name;
		this._link = link;
		this._handleCardClick = handleCardClick;
		this._templateSelector = templateSelector
	}

	_getCard() {
		return document.querySelector(this._templateSelector).content.querySelector('.cards').cloneNode(true)
	}

	generateCard() {
		this._element = this._getCard();

		const cardDelete = this._element.querySelector('.cards__delete');
		const cardLike = this._element.querySelector('.cards__like');
		const cardImage = this._element.querySelector('.cards__image');
		const cardTitle = this._element.querySelector('.cards__title');

		cardTitle.textContent = this._name;
		cardImage.alt = this._name;
		cardImage.src = this._link;

		cardLike.addEventListener('click', this._handleLike);
		cardDelete.addEventListener('click', () => {
			this._handleDelete('.cards')
		});
		cardImage.addEventListener('click', this._handleCardClick);

		return this._element;
	}

	_handleLike(event) {
		const buttonLike = event.target;
		buttonLike.classList.toggle('cards__like_active');
	}

	_handleDelete() {
		this._element.remove();
	}
}