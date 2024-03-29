import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
	constructor(popup, handleSubmitForm) {
		super(popup);
		this._handleSubmitForm = handleSubmitForm;
		//дубль из родительского класса
		// this._popup = document.querySelector(selectorPopup);
		this._popupForm = this._popup.querySelector('.popup__content');
		this._inputList = this._popupForm.querySelectorAll('.popup__input');
		this._submitButton = this._popupForm.querySelector('.popup__submit-button');
		this._submitButtonText = this._submitButton.textContent

	}

	_getInputValues() {
		this._formValues = {};
		//ищем 
		this._inputList.forEach((input) => {
			//ищем по ключу name из верстки, делая массив руками и вставляем значение value
			this._formValues[input.getAttribute('name')] = input.value;
		});

		return this._formValues;
	}


	setEventListeners() {
		//вызываем родительский метод через super
		super.setEventListeners();
		this._popupForm.addEventListener('submit', (event) => {
			event.preventDefault();
			this._handleSubmitForm(this._getInputValues());
			// this.close();
		})
	}

	close() {
		//вызываем родительский метод через super
		super.close();
		this._popupForm.reset();
	}

	
	loading(isLoading) {
		if (isLoading) {
			this._submitButton.textContent = 'Сохранение...'
		} else {
			this._submitButton.textContent = this._submitButtonText
		}
	}
}
