import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
	constructor(selectorPopup) {
		//вызываем конструктор родителя
		super(selectorPopup);
		
		this.showImage = document.querySelector('.popup__image');
		this.popupSubtitle = document.querySelector('.popup__subtitle');
	}

	open(name, link) {
		this.showImage.src = link;
		this.showImage.alt = name;
		this.popupSubtitle.textContent = name;
		super.open();
	}

}
