class FormValidator {
  constructor(btnSave) {
    this.btnSave = btnSave;
  }
  // Накладываем события
  setEventListeners(form) {
    for (let elem of form) {
      if (elem.id !== this.btnSave.id) {
        elem.addEventListener('input', this.checkInputValidity.bind(this));
      }
    }
  }
  // Проверка на валидность
  checkInputValidity(elem) {
    const error = elem.target.closest('div').querySelector('.popupEditProfile__input-error')
    let isValidity = true;

    if (elem.target.validity.valueMissing) {
      isValidity = false;
      this.setSubmitButtonState(isValidity);
      return error.textContent = 'Это обязательное поле';
    }
    if (elem.target.validity.tooLong || elem.target.validity.tooShort) {
      isValidity = false;
      this.setSubmitButtonState(isValidity);
      return error.textContent = 'Должно быть от 2 до 30 символов';
    }
    this.setSubmitButtonState(isValidity);
    error.textContent = '';
  }
  // Активируем/Деактивируем кнопку
  setSubmitButtonState(isValidity) {
    if (isValidity) {
      this.btnSave.removeAttribute('disabled');
      this.btnSave.classList.remove('popupEditProfile__button_is-closes');
    } else {
      this.btnSave.setAttribute('disabled', 'disabled');
      this.btnSave.classList.add('popupEditProfile__button_is-closes');
    }
  }
}
