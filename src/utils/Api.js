import crypto from 'crypto-js'

const hash = crypto.MD5("Valantis_20240310").toString()

class Api {
  constructor({ baseURL, headers }) {
    this.baseUrl = baseURL;
    this.headers = headers;
  }

  getId(pagination) {
    console.log(pagination)
    return fetch(this.baseUrl,
        {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify({
            "action": "get_ids",
            "params": pagination
          })
        })
        .then(response => {
          if(response.status === 400) {
            console.log(response)
            const errorText = response.statusText ? response.statusText : 'Failed to fetch get_ids'
            throw new Error (errorText);
          }
          return response.json()
          // console.log(response)
          // console.log(response.result)
        })
        .catch(error => console.error('Error:', error));

  }


getCards(id) {
  return fetch(this.baseUrl,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          "action": "get_items",
          "params": {ids: id}
        })
      })
      .then(response => {
        if(response.status !== 200) {
          console.log(response)
          const errorText = response.statusText ? response.statusText : 'Failed to fetch get_ids'
          throw new Error (errorText);
        }
        return response.json()
      })
      .catch(error => console.error('Error:', error));

  }

  getCardsWithFilter(filter) {
    return fetch(this.baseUrl,
        {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify({
            "action": "filter",
            "params": {"price": filter}
          })
        })
        .then(response => {
          if(response.status !== 200) {
            console.log(response)
            const errorText = response.statusText ? response.statusText : 'Failed to fetch get_ids'
            throw new Error (errorText);
          }
          return response.json()
        })
        .catch(error => console.error('Error:', error));

    }

    getFields(field, line) {
      return fetch(this.baseUrl,
          {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
              "action": "get_fields",
              "params": {"field": field, line}
            })
          })
          .then(response => {
            if(response.status !== 200) {
              console.log(response)
              const errorText = response.statusText ? response.statusText : 'Failed to fetch get_ids'
              throw new Error (errorText);
            }
            return response.json()
          })
          .catch(error => console.error('Error:', error));

      }

}



const api = new Api({
  baseURL: "https://api.valantis.store:41000/",
  headers: {
    "X-Auth": hash,
    "Content-Type": "application/json",
  },
});

export default api;