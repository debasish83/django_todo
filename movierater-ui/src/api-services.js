//start development with 1 user generated token and then move
//to using per user token extracted from Okta/Social OAuth

export default class API {
    static loginUser(body) {
        return fetch(`http://127.0.0.1:8000/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static getMovies(token) {
        return fetch("http://127.0.0.1:8000/api/movierater/movies/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
            .then(resp => resp.json())
    }

    static registerUser(body) {
        return fetch(`http://127.0.0.1:8000/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static updateMovie(token, mov, body) {
        return fetch(`http://127.0.0.1:8000/api/movierater/movies/${mov.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }
    static createMovie(token, body) {
        return fetch(`http://127.0.0.1:8000/api/movierater/movies/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }
    static deleteMovie(token, mov_id) {
        return fetch(`http://127.0.0.1:8000/api/movierater/movies/${mov_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
    }
}
