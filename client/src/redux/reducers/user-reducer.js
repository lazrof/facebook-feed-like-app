import * as actionTypes from '../actions/user/types';


const initialUserState = {
    currentUser: null
}

const userReducer = (state = initialUserState, action) => {
  console.log('action')  
  console.log(action)
  switch (action.type) {

    case actionTypes.LOGIN:
      return {
        currentUser: "LOGIN"
      };

    case actionTypes.LOGOUT:
      return {
        currentUser: "LOGOUT"
      };

    case actionTypes.REGISTER_USER:
      return {
        ...state,
        currentUser: "REGISTER_USER"
      };
    default:
      return state;
  }
};

export default userReducer;