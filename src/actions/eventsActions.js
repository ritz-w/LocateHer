export function fetchEvents() {
    return (dispatch) => {
    return fetch('http://localhost:3000/events')
    .then(res => res.json())
    .then(data => dispatch({type: "FETCH_EVENTS", payload: data}))
    }
}
