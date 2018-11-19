export default (state = {events: []}, action) => {
    switch (action.type) {
      case "FETCH_EVENTS" :
      console.log(action)
      return state = {events: action.payload};
      default :
      return state;
    }
  }
  