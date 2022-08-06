const form = {
    formSelector: 'form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    activeButtonClass: 'popup__submit-button_valid',
    inactiveButtonClass: 'popup__submit-button_invalid',
    buttonClass: 'button',
    errorClass: '.popup__error',
  };

  
function enableValidation(selector) {
    // ищем все формы
    const forms = Array.from(document.querySelectorAll(selector.formSelector));
    // добавляем слушатели на input и submit
    forms.forEach(function (item) {
      item.addEventListener('submit', (event) => handleFormSubmit(event, selector));
      item.addEventListener('input', (event) => handleFormInput(event, selector));
    });
  };

  function handleFormSubmit(event, selector){
    //отменяем действия по умолчанию
    event.preventDefault();
    //проверяем форму
    const form = event.currentTarget;
  
    const isValid = form.checkValidity();
    if (isValid) {
      //если валидна, то сбросываем ее
      form.reset();
      setSubmitButtonState(form, selector);
    }
  };

  function handleFormInput(event, selector){
    const input = event.target;
    const form = event.currentTarget;
  
    //выводим ошибки под input
    showFieldError(input);
    //вкл-выкл кнопки
    setSubmitButtonState(form, selector);
  }
  
  function showFieldError(input) {
    const span = input.nextElementSibling;
    // Заменим содержимое span текст ошибки через свойство .validationMessage, по ТЗ необходимо использовать стандартные браузерные тексты ошибок
    span.textContent = input.validationMessage;
  }
  
  function setSubmitButtonState(form, selector){
    const button = form.querySelector(selector.submitButtonSelector);
    const isValid = form.checkValidity();
    
    if (isValid) {
      button.removeAttribute('disabled');
      button.classList.remove(selector.inactiveButtonClass);
      button.classList.add(selector.activeButtonClass);
      button.classList.add(selectorButton);
    } else {
      button.setAttribute('disabled', true);
      button.classList.add(selector.inactiveButtonClass);
      button.classList.remove(selector.activeButtonClass);
      button.classList.remove(selector.buttonClass);
    }
  
  }
  
  enableValidation(form);
  