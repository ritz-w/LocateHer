export default (state = {users: [], currentUser: ""}, action) => {
    switch (action.type) {
      case "FETCH_USERS" :
      console.log(action)
      return state = {...state, users: action.payload};
      case "SIGNUP_USER" :
      console.log(action)
      return state = {...state, currentUser: action.payload};
      case "SIGNIN_USER" :
      console.log(action)
      return state = {...state, currentUser: action.payload};
      case "CREATE_CONNECTION" :
      console.log(action)
      return state = {...state, currentUser: action.payload};
      case "SIGNOUT_USER" :
      console.log(action)
      return state = {...state, currentUser: ""};
      default :
      return state;
    }
  }
  