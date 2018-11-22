export function fetchEvents() {
    return (dispatch) => {
    return fetch('https://locate-her-api.herokuapp.com/events')
    .then(res => res.json())
    .then(data => dispatch({type: "FETCH_EVENTS", payload: data}))
    }
}
