export class Popup {
	constructor(popup) {
		this._popup = popup;
		this._handleEscClose = this._handleEscClose.bind(this);
	}

	_handleEscClose(event) {
		if (event.key === 'Escape') {
			this.close();
		}
	}

	open() {
		this._popup.classList.add('popup_opened');
		document.addEventListener('keydown', this._handleEscClose);
	}

	close() {
		this._popup.classList.remove('popup_opened');
		document.removeEventListener('keydown', this._handleEscClose);
	}

	setEventListeners() {
		this._popup.addEventListener('click', (evt) => {
			if (
				evt.target.classList.contains('popup__close') ||
				evt.target === evt.currentTarget
			) {
				this.close();
			}
		})
	}

}
