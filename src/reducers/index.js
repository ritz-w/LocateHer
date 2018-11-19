import { combineReducers } from 'redux';
import usersReducer from './users';
import storiesReducer from './stories';
import eventsReducer from './events';


const rootReducer = combineReducers({
  users: usersReducer,
  stories: storiesReducer,
  events: eventsReducer
});

export default rootReducer;
