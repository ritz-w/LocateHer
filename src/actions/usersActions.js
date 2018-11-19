export function fetchUsers() {
    return (dispatch) => {
    dispatch({ type: 'LOADING_USERS' });
    return fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => dispatch({type: "FETCH_USERS", payload: data}))
    }
}

export function signupUser(userInfo) {
    return (dispatch) => {
        return fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userInfo
            })
        })
        .then(res => res.json())
        .then(data => dispatch({ type: 'SIGNUP_USER', payload: data}))
        }
    }

    export function signinUser(email, password) {
        return (dispatch) => {
            return fetch('http://localhost:3000/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            .then(res => res.json())
            .then(data => dispatch({ type: 'SIGNIN_USER', payload: data}))
            }
        }

    export function signoutUser() {
        return (dispatch) => {dispatch({ type: 'SIGNOUT_USER'})
            }
    }

    export function createConnection(userId, requestedUserId, expMessage, reqMessage) {
        return (dispatch) => {
            return fetch('http://localhost:3000/connect_users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId,
                    requestedUserId: requestedUserId,
                    expMessage: expMessage,
                    reqMessage: reqMessage
                })
            })
            .then(res => res.json())
            .then(data => dispatch({ type: 'CREATE_CONNECTION', payload: data}))
            }
        }