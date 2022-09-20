export class FormValidator {
	constructor(config, form) {
		this._config = config;
		this._form = form;
	}

	_showInputError(inputElement) {
		const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.add(this._config.inputErrorClass);
		errorElement.textContent = inputElement.validationMessage;
		errorElement.classList.add(this._config.errorTextClass);
	}

	_hideInputError(inputElement) {
		const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.remove(this._config.inputErrorClass);
		errorElement.classList.remove(this._config.errorTextClass);
		errorElement.textContent = '';
	}

	_hasInvalidInput() {
		return this._inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		});
	}

	_toggleInputError(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement, inputElement.validationMessage);
		} else {
			this._hideInputError(inputElement);
		}
	}

	disableSubmitButton() {
		this._buttonElement.classList.add(this._config.inactiveButtonClass);
		this._buttonElement.disabled = true;
	}

	enableSubmitButton() {
		this._buttonElement.classList.remove(this._config.inactiveButtonClass);
		this._buttonElement.disabled = false;
	}

	_toggleButtonState() {
		if (this._hasInvalidInput(this._inputList)) {
			this.disableSubmitButton();
		} else {
			this.enableSubmitButton();
		}
	}

	_setEventListeners() {
		this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));

		this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);

		this._toggleButtonState();

		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._toggleInputError(inputElement);
				this._toggleButtonState();
			});
		});
	}

	enableValidation() {
		this._setEventListeners();
	}
}