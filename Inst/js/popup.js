class Popup {
  constructor(popup, btnSave, popupEdit, popupBigImg, popupImg) {
    this.popup = popup;
    this.btnSave = btnSave;
    this.popupEdit = popupEdit;
    this.popupBigImg = popupBigImg;
    this.popupImg = popupImg;
  }
  // Открытие попапа
  openPopup() {
    this.popup.classList.add('popup_is-opened');
  }
  // Закрытие попапа
  closePopup() {
    this.popup.classList.remove('popup_is-opened');
  }
  // Открытие эдит-попапа
  openPopupEditProfile() {
    this.btnSave.classList.remove('popupEditProfile__button_is-closes')
    this.btnSave.removeAttribute('disabled');
    this.popupEdit.classList.add('popupEditProfile_is-opened');
  }
  // Закрытие эдит-попапа
  closePopupEditProfile() {
    this.popupEdit.classList.remove('popupEditProfile_is-opened');
  }
  // Открытие картинки
  openImg(event) {
    const urlImg = event.target.style.backgroundImage.slice(5, -2);
    if (event.target.classList.contains('place-card__image')) {     
      this.popupBigImg.src = urlImg;
      this.popupImg.style.display = 'flex';
      this.popupBigImg.style.backgroundImage = event.target.style.backgroundImage;
    };
  }
  // Закрытие картинки
  closeImg() {
    this.popupImg.style.display = 'none';
  }
}








