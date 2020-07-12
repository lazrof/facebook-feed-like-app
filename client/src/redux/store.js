import { createStore, combineReducers, applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import  userReducer from './reducers/user-reducer';
import  postReducer from './reducers/post-reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    userReducer,
    postReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;