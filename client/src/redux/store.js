import { createStore, combineReducers, applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import  userReducer from './reducers/user-reducer'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    userReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;