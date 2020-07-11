import axios from 'axios';
import serverBaseURL from '../../../api/config';
import { 
  REGISTER_USER, 
  REGISTER_FAIL, 
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
        dispatch({
            type: REGISTER_FAIL,
            payload: 'Register failed'
        })
    });
  }
};

// export const logIn = user => {
//   return {
//     type: LOGIN,
//     payload: {
//       currentUser: 'Current User from Action'
//     }
//   };
// };

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
            payload: 'Error on login'
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