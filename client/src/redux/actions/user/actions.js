import axios from 'axios';
import serverBaseURL from '../../../api/config';
import { 
  REGISTER_USER, 
  REGISTER_FAIL, 
  LOGIN, 
  LOGOUT,
  LOGIN_FAIL,
  VALIDATE_TOKEN,
  VALIDATE_TOKEN_FAIL
} from './types';

axios.defaults.baseURL = serverBaseURL;


export const registerUser = userData => {
  
  return async (dispatch) => {
    await axios({
      method: 'post',
      url: '/users',
      data: userData
    }).then(response => {
        dispatch({
          type: REGISTER_USER,
          payload: response
        });

    }).catch(error => {
      console.log(error)
        dispatch({
          type: REGISTER_FAIL,
          payload: error
        })
    });
  }
};

export const logIn = userCredentials => {
  
  return async (dispatch) => {
    await axios({
      method: 'post',
      url: '/login',
      data: userCredentials
    }).then(response => {
        dispatch({
          type: LOGIN,
            payload: response
        });

    }).catch(error => {
        dispatch({
            type: LOGIN_FAIL,
            payload: error
        })
    });
  }
};

export function authenticateUser() {

  let token = localStorage.getItem('authToken');

  if (!token){
    return {
      type: VALIDATE_TOKEN_FAIL
    }
  }

  axios.defaults.headers.common['Authorization'] = token;

  return async (dispatch) => {
      await axios({
        method: 'get',
        url: '/users'
      }).then(response => {
          dispatch({
              type: VALIDATE_TOKEN,
              payload: response
          });
      }).catch(error => {
          dispatch({
            type: VALIDATE_TOKEN_FAIL,
            payload: error
          });
      });
  }
}

export const logOut = user => {
  
  return {
    type: LOGOUT,
      payload: {
        currentUser: 'Current User CLEAR FROM ACTION'
    }
  };
};