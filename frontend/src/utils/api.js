class Api{
  constructor(baseUrl, apiKey){
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }
  // get the cards from the server
  getCards(){
      return fetch(`${this.baseUrl}/cards`, {
        headers: {
          authorization: this.apiKey
        }
      })
        .then(res => res.json())
  }

  getUserInfo(){
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.apiKey
      }
    })
      .then(res => res.json())
  }

  putLike(cardId){
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this.apiKey
      }
    }).then(res => res.json())
  }

  deleteLike(cardId){
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.apiKey
      }
    }).then(res => res.json())
  }

  patchUserInfo(name, about){
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        about
      })
    }).then(res => res.json())
  }

  postCard(name, link){
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this.apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        link
      })
    }).then(res => res.json())
  }

  deleteCard(cardId){
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.apiKey,
      }
    }).then(res => res.json())
  }

  patchAvatar(avatarLink){
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: avatarLink
      })
    }).then(res => res.json())
  }
}

// get the jwt token from the localhost
const getjwt = () => {
  return localStorage.getItem('jwt');
}

const ApiElement =  new Api('http://localhost:4000', "Bearer " + getjwt());


export default ApiElement;
