class Api {
  constructor(options) {
    this.options = options;
  }
  // Получаем name и about с сервера
  getUserInfo() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: {
        authorization: `${this.options.headers.authorization}`,
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(new Error(`Ошибка ${err.message}`));
        }
      })
      .then((res) => {
        return res
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(new Error(`Ошибка ${err.message}`));
      })
  };
  // Получаем массив с картами
  getCardArray() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: {
        authorization: `${this.options.headers.authorization}`,
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(new Error(`Ошибка ${err.message}`));
        }
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(new Error(`Ошибка ${err.message}`));
      })
  }
  // Редактирование имени
  renameUserInfo(name, about) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${this.options.headers.authorization}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
      })
    })
    .then((res) => {
      if (res.ok) {
        return res;
      } else {
        return Promise.reject(new Error(`Ошибка ${err.message}`));
      }
    })
    .catch((err) => {
      return Promise.reject(new Error(`Ошибка ${err.message}`));
    })
  }
  //Добавление карты
  cardAdd(name, link) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `${this.options.headers.authorization}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`,
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(new Error(`Ошибка ${err.message}`));
        }
      })
      .catch((err) => {
        return Promise.reject(new Error(`Ошибка ${err.message}`));
      })
  }
  //Удаление карты
  cardDelete(id) {
    return fetch(`${this.options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this.options.headers.authorization}`,
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      if (res.ok) {
        return res;
      } else {
        return Promise.reject(new Error(`Ошибка ${err.message}`));
      }
    })
    .catch((err) => {
      return Promise.reject(new Error(`Ошибка ${err.message}`));
    })
  }
  // Лайк карточки
  cardLike(id) {
    return fetch(`${this.options.baseUrl}/cards/like/${id}`, {
      method: 'PUT',
      headers: {
        authorization: `${this.options.headers.authorization}`,
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(new Error(`Ошибка ${err.message}`));
      }
    })
    .catch((err) => {
      return Promise.reject(new Error(`Ошибка ${err.message}`));
    })
  }
  // Дизлайк карточки
  cardDislike(id) {
    return fetch(`${this.options.baseUrl}/cards/like/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this.options.headers.authorization}`,
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(new Error(`Ошибка ${err.message}`));
      }
    })
    .catch((err) => {
      return Promise.reject(new Error(`Ошибка ${err.message}`));
    })
  }
}

