export function fetchStories() {
    return (dispatch) => {
    return fetch('http://localhost:3000/stories')
    .then(res => res.json())
    .then(data => dispatch({type: "FETCH_STORIES", payload: data}))
    }
}
