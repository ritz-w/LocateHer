export default (state = {stories: []}, action) => {
    switch (action.type) {
      case "FETCH_STORIES" :
      console.log(action)
      return state = {stories: action.payload};
      default :
      return state;
    }
  }
  