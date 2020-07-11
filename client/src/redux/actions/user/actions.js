import axios from 'axios';

import { 
  REGISTER_USER, 
  REGISTER_FAIL, 
  LOGIN, 
  LOGOUT
} from './types';


export const registerUser = userData => {
  return {
    type: REGISTER_USER,
    payload: { userData }
  };
};

export const logIn = user => {
  return {
    type: LOGIN,
    payload: {
      currentUser: 'Current User from Action'
    }
  };
};

export const logOut = user => {
  
  return {
    type: LOGOUT,
      payload: {
        currentUser: 'Current User CLEAR FROM ACTION'
    }
  };
};