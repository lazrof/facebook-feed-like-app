import axios from 'axios';
import serverBaseURL from '../../../api/config';
import { 
  REGISTER_USER, 
  REGISTER_FAIL, 
  CLEAR_REGISTER_DATA,
  LOGIN, 
  LOGOUT,
  LOGIN_FAIL
} from './types';


export const registerUser = userData => {
  
  return async (dispatch) => {
    await axios({
      method: 'post',
      url: `${serverBaseURL}users`,
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
      url: `${serverBaseURL}login`,
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

export const logOut = user => {
  
  return {
    type: LOGOUT,
      payload: {
        currentUser: 'Current User CLEAR FROM ACTION'
    }
  };
};