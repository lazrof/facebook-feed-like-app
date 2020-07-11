import axios from 'axios';
import serverBaseURL from '../../api/config';
import * as actionTypes from '../actions/user/types';


const initialUserState = {
  currentUser: null,
  authToken: null,
  authenticate: null,
  responseStatus: null,
  responseMessage:null,
  registerSuccess: null
}

const userReducer = (state = initialUserState, action) => {

  switch (action.type) {

    case actionTypes.LOGIN:
      
      if (action.payload.status == 200){

        localStorage.setItem('authToken', action.payload.data.jwt)
        return {
          ...state,
          currentUser: action.payload.data.user.email,
          authToken: action.payload.data.jwt,
          responseStatus: true,
          responseMessage: 'success',
          authenticate: true
        };
      
      } else {

        return {
          ...state,
          responseStatus: false,
          responseMessage: action.payload.data.message,
        };        
      }

    case actionTypes.LOGOUT:
      return {
        currentUser: "LOGOUT"
      };

    case actionTypes.REGISTER_USER:
      
      if (action.payload.status == 200){
        return {
          ...state,
          currentUser: action.payload.data.user.email,
          responseStatus: true,
          registerSuccess: true,
          responseMessage: 'success'
        };
      
      } else {

        return {
          ...state,
          responseStatus: false,
          responseMessage: action.payload.data.message,
          registerSuccess: false
        };        
      }


    default:
      return state;
  }
};

export default userReducer;