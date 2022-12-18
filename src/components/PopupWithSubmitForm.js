import { Popup } from "./Popup.js";

export class PopupWithSubmitForm extends Popup {
    constructor(popup) {
        super(popup);
        this._popupForm = this._popup.querySelector('.popup__content');

    }

    changeSubmitHandler(newSubmitHandler) {
        this._handleSubmit = newSubmitHandler;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._handleSubmit()
        })

    }

}