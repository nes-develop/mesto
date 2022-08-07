//Сразу изменим функции showInputError и hideInputError — научим их принимать и обрабатывать входящие параметры:
//Теперь обе функции не берут DOM-элемент ошибки из внешней области видимости. Они находят нужный элемент формы для поля, которое проверяется в данный момент. Чтобы знать, где искать такой элемент, мы передаём функции параметр formElement и ищем элемент ошибки в нём.
//Добавление обработчиков всем полям формы

const showInputError = (formElement, inputElement, errorMessage, obj) => {
    // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorTextClass);
}

const hideInputError = (formElement, inputElement, obj) => {
    // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorTextClass);
  errorElement.textContent = ' ';
}

//Для этого создадим функцию hasInvalidInput. Она принимает массив полей формы и возвращает true, если в нём хотя бы одно поле не валидно, и false, если все валидны.
//Для такой проверки подходит метод some. Используем его внутри hasInvalidInput и пройдём по массиву, чтобы найти невалидный input:
// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
     return !inputElement.validity.valid;
  })
}

const disabledButton = (buttonElement, obj) => {
  buttonElement.classList.add(obj.inactiveButtonClass);
  buttonElement.disabled = true;
}
const activeButton = (buttonElement, obj) => {
  buttonElement.classList.remove(obj.inactiveButtonClass);
  buttonElement.disabled = false;
}

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, obj) => {
    // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
     disabledButton(buttonElement, obj);
  } else {
        // иначе сделай кнопку активной
     activeButton(buttonElement, obj);
  }
}


// Функция isValid теперь принимает formElement и inputElement, +наш объект
// а не берёт их из внешней области видимости
const isValid = (formElement, inputElement, obj) => {
  if (!inputElement.validity.valid) {
        // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
     showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
        // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
     hideInputError(formElement, inputElement, obj);
  }
}

//из тренажера Пусть слушатель событий добавится всем полям ввода внутри формы. Для этого создадим функцию setEventListener, которая примет параметром элемент формы и добавит её полям нужные обработчики:
const setEventListeners = (formElement, obj) => {
    // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, obj);
    // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
     inputElement.addEventListener('input', () => {
            // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
        isValid(formElement, inputElement, obj);
        toggleButtonState(inputList, buttonElement, obj);
     })
  })
}


//переписываем из тренажера, она добавит обработчики сразу всем полям формы.
const enableValidation = (obj) => {
  // ищем все формы
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  // добавляем слушатели 
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, obj);
  });
}


enableValidation({
  formSelector: '.popup__content',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_invalid',
  inputErrorClass: 'popup__input_invalid',
  errorTextClass: 'popup__error',
});
