export function fetchStories() {
    return (dispatch) => {
    return fetch('https://locate-her-api.herokuapp.com/stories')
    .then(res => res.json())
    .then(data => dispatch({type: "FETCH_STORIES", payload: data}))
    }
}
