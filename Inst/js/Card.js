class Card {
    constructor(name, link, id, likes, cardlike, cardDislike, cardDelete) {
        this.name = name;
        this.link = link;
        this.id = id;
        this.likes = likes;
        this.card = this.create(name ,link, id, likes);

        this.cardlike = cardlike;
        this.cardDislike = cardDislike;
        this.cardDelete = cardDelete;
    }
    // Лайк карточки
    like(event) {
        this.cardLike(event.target.closest('.place-card').id)
        .then( (res) => {
            event.target.parentNode.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
            event.target.parentNode.querySelector('.place-card__like-counter').textContent = 
            +event.target.parentNode.querySelector('.place-card__like-counter').textContent + 1;
        
        })
        .catch( (err) => {
            console.log(err.message); 
        })
    }
    // Дизлайк карточки
    disLike(event) {
        this.cardDislike(event.target.closest('.place-card').id)
        .then( (res) => {
            event.target.parentNode.querySelector('.place-card__like-icon').classList.remove('place-card__like-icon_liked');
            event.target.parentNode.querySelector('.place-card__like-counter').textContent = 
            +event.target.parentNode.querySelector('.place-card__like-counter').textContent - 1;
        })
        .catch( (err) => {
            console.log(err.message);
        })
    }
    // Удаление карточки
    remove(event) {
        if (event.target.classList.contains('place-card__delete-icon')) {
            if (window.confirm('Удалить карту?')) { 
                this.cardDelete(event.target.parentNode.parentNode.id)
                .then( (res) => {
                    if (res.ok) {
                        event.target.parentNode.parentNode.remove();
                    }
                })
                .catch( (err) => {
                    console.log(err.message);
                })
            } 
        };
    }
    // Создание карточки
    create(name, link, id, like) {
        const placeCard = document.createElement("div");
        placeCard.classList.add("place-card");
        placeCard.setAttribute('id', `${id}`);
        placeCard.insertAdjacentHTML('beforeend',
        `
            <div class="place-card__image">
                <button class="place-card__delete-icon"></button>
            </div>
            <div class="place-card__description">
                <h3 class="place-card__name"></h3>
                <div class="place-card__like-box">
                    <button class="place-card__like-icon"></button>
                    <p class="place-card__like-counter"></p>
                </div>
            </div>
        `);
        if (like > 0) {
            placeCard.querySelector(".place-card__like-icon").classList.add('place-card__like-icon_liked');    
        }
        placeCard.querySelector(".place-card__like-counter").textContent = `${like}`;
        placeCard.querySelector(".place-card__name").textContent = name;
        placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${link})`;
        return placeCard;
    }
}
