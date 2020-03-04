class CardList {
  constructor(container, create, likeFunc, dislike, removeFunc, openImgFunc, apiGetCard, cardLike, cardDislike, cardDelete) {
    this.container = container;
    this.create = create;
    this.like = likeFunc;
    this.dislike = dislike;
    this.remove = removeFunc;
    this.opemImg = openImgFunc;
    this.apiGetCard = apiGetCard;
    this.cardLike = cardLike;
    this.cardDislike = cardDislike;
    this.cardDelete = cardDelete;
  }
  // Добавление карты в контейнер
  addCard(child) {
    this.container.insertBefore(child, this.container.firstChild);
  }
  // Рендер данных с сервера, и добавление в контейнер
  render(data) {
    data.forEach(card => {
      if (card.owner.name === 'Denis Bitaev') {
        const user = this.create(card.name, card.link, card._id, card.likes.length, this.cardLike, this.cardDislike, this.cardDelete).card;
        this.addCard(user);
      }
    });
  }
  // Накладываем события (удаление, лайк и тд) на карточки
  eventListener() {
    this.container.addEventListener('click', (event) => {
      // Событие Удаления
      if (event.target.classList.contains('place-card__delete-icon')) {
        this.remove(event);
      }
      // События лайка и дизлайка
      if (event.target.classList.contains('place-card__like-icon')) {
        if (event.target.classList.contains('place-card__like-icon_liked')) {
          this.dislike(event);
        } else {
          this.like(event);
        }
      }
      // Событие открытия картинки
      if (event.target.classList.contains('place-card__image')) {
        this.opemImg(event);
      }
    })
  }
  // Получение данных с сервера
  loadCards() {
    this.apiGetCard().then((data) => {
      this.render(data)
    }).catch((err) => {
        console.log(err);  
      })
  }
}


