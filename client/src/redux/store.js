import { createStore, combineReducers} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import  userReducer from './reducers/user-reducer'

const rootReducer = combineReducers({
    userReducer
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;