import axios from 'axios';
import serverBaseURL from '../../../api/config';
import * as actionTypes from './types';

axios.defaults.baseURL = serverBaseURL;

export const createPost = (postData, image) => {

    let token = localStorage.getItem('authToken');
    axios.defaults.headers.common['Authorization'] = token;
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    
    if (image){
        formData.append('image', image);
    }

  
    return async (dispatch) => {
        await axios({
            method: 'post',
            url: '/posts',
            data: formData
        }).then(response => {
            dispatch({
                type: actionTypes.CREATE_POST,
                payload: response
            });
    
        }).catch(error => {
            console.log('error IN REQUEST')
            console.log(error)
            dispatch({
                type: actionTypes.CREATE_POST_FAIL,
                payload: error
            })
        });
    }
};

export const getAllPosts = () => {

    let token = localStorage.getItem('authToken');
    axios.defaults.headers.common['Authorization'] = token;

  
    return async (dispatch) => {
        await axios({
            method: 'get',
            url: '/posts'
        }).then(response => {
            console.log(response);
            dispatch({
                type: actionTypes.GET_ALL_POSTS,
                payload: response.data
            });
    
        }).catch(error => {
            console.log(error)
            dispatch({
                type: actionTypes.GET_ALL_POSTS_FAIL,
                payload: error
            })
        });
    }
};

export const deletePost = (postId) => {

    let token = localStorage.getItem('authToken');
    axios.defaults.headers.common['Authorization'] = token;

    return async (dispatch) => {
        await axios({
            method: 'delete',
            url: `/posts/${postId}`
        }).then(response => {
            console.log(response);
            dispatch({
                type: actionTypes.DELETE_POST,
                payload: postId
            });
    
        }).catch(error => {
            console.log(error)
            dispatch({
                type: actionTypes.DELETE_POST_FAIL,
                payload: error
            })
        });
    }
};

export const setCurrentPost = (postId) => {

    return {
        type: actionTypes.SET_CURRENT_POST,
        payload: postId
    }
}