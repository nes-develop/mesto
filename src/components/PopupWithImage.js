import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
	constructor(popup) {
		super(popup);
		this._showImage = this._popup.querySelector('.popup__image');
		this._popupSubtitle = this._popup.querySelector('.popup__subtitle');
	}

	open(name, link) {
		this._showImage.src = link;
		this._showImage.alt = name;
		this._popupSubtitle.textContent = name;
		super.open();
	}

	setEventListeners() {
		super.setEventListeners();
	}
}
