import axios from 'axios';
import serverBaseURL from '../../api/config';
import * as actionTypes from '../actions/user/types';


const initialUserState = {
  currentUser: null,
  authToken: null,
  authenticated: null,
  response: {
    status:null,
    message:null
  },
  registerSuccess: null
}

const userReducer = (state = initialUserState, action) => {

  switch (action.type) {

    case actionTypes.LOGIN:
      
        localStorage.setItem('authToken', action.payload.data.jwt)
        return {
          ...state,
          currentUser: action.payload.data.user.email,
          authToken: action.payload.data.jwt,
          response:{
            status:'success',
            message:'Login success!'
          },
          authenticated: true,
          registerSuccess:false
        };

    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        response:{
          status:'error',
          message: 'Error, Invalid Credentials.'
        },
        authenticated: false,
      }

    case actionTypes.REGISTER_USER:
      
      return {
        ...state,
        currentUser: action.payload.data.user.email,
        registerSuccess: true,
        response:{
          status:'success',
          message: 'Register Success! you can Login now.'
        },
      }; 

    case actionTypes.REGISTER_FAIL:
      
      return {
        ...state,
        registerSuccess: false,
        response:{
          status:'error',
          message: 'Error, email already exists.'
        }
      }

    case actionTypes.VALIDATE_TOKEN:
      
      return {
        ...state,
        authenticated: true
      }

    case actionTypes.VALIDATE_TOKEN_FAIL:

      return {
        ...state,
        authenticated: false
      }

    default:
      return state;
  }
};

export default userReducer;