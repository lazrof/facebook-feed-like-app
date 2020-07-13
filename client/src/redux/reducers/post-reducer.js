import * as actionTypes from '../actions/post/types';

const initialPostState = {
    currentPost:{
        title:null,
        content:null,
        image:null
    },
    allPosts:null,
    response:{
        status:null,
        message:null
    },
    postCreated: null,
    openModal:false
}

const postReducer = (state = initialPostState, action) => {

    switch (action.type) {

        case actionTypes.CREATE_POST:
        
            return {
                ...state,
                allPosts: [action.payload.data, ...state.allPosts],
                postCreated: true,
                response:{
                    status:"success",
                    message:"Post Created!"
                }
            };

        case actionTypes.CREATE_POST_FAIL:
        
            return {
                ...state,
                response:{
                    status:"error",
                    message: action.payload.message
                }
            };

        case actionTypes.GET_ALL_POSTS:
    
            return {
                ...state,
                allPosts:action.payload.docs,
                response:{
                    status:"success",
                    message: "Posts retrived"
                }
            };

        case actionTypes.DELETE_POST:

            return {
                ...state,
                allPosts:state.allPosts.filter(
                    post => post._id !== action.payload
                )
            };
        
        case actionTypes.SET_CURRENT_POST:
            return {
                ...state,
                currentPost:action.payload,
                postCreated:null
            };
        case actionTypes.UPDATE_POST:
            
            let currentPosts = state.allPosts.filter(post => post._id !== action.payload.data._id)
            let newCurrentPosts = [action.payload.data, ...currentPosts]

            return {
                ...state,
                allPosts: newCurrentPosts,
                response:{
                    status:"success",
                    error:"Post updated!"
                }
            }

        case actionTypes.TOGGLE_MODAL:
            
            return {
                ...state,
                openModal:action.payload
            };

        default:
            return state;
    }
};

export default postReducer;