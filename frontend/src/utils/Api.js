class Api {
  constructor(options) {
    this._adress = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInfoAboutUser(token) {
    return fetch(`${this._adress}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
  }

  setInfoAboutUser(info, token) {
    return fetch(`${this._adress}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${info.fullname}`,
        about: `${info.about}`,
      }),
    }).then(this._checkResponse);
  }

  uploadNewAvatar(link, token) {
    return fetch(`${this._adress}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: `${link}`,
      }),
    }).then(this._checkResponse);
  }

  getInitialCards(token) {
    return fetch(`${this._adress}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
  }

  addNewCard(info, token) {
    return fetch(`${this._adress}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${info.cardname}`,
        link: `${info.link}`,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId, token) {
    return fetch(`${this._adress}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  likeCard(cardId, token) {
    return fetch(`${this._adress}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  unlikeCard(cardId, token) {
    return fetch(`${this._adress}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked, token){
    return fetch(`${this._adress}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }
}

/*-----------------*/

export const api = new Api({
  baseUrl: "https://api.backendishard.nomoreparties.sbs",
  headers: {
    "Content-Type": "application/json",
  },
}); /* api */

