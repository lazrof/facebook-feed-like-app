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
      
      if (action.payload.status == 200){

        localStorage.setItem('authToken', action.payload.data.jwt)
        return {
          ...state,
          currentUser: action.payload.data.user.email,
          authToken: action.payload.data.jwt,
          response:{
            status:'success',
            message:'Login success!'
          },
          authenticated: true
        };
      
      } else {

        return {
          ...state,
          response:{
            status:'error',
            message:action.payload.data.message
          },
        };        
      }

    case actionTypes.LOGOUT:
      return {
        currentUser: "LOGOUT"
      };

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
          message: 'Error, email already exists'
        }
      }

    default:
      return state;
  }
};

export default userReducer;