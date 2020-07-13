import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import { Form, Message } from 'semantic-ui-react'
import { createPost, updatePost, toggleModal }  from '../../../redux/actions/post/actions';
import CreatePostButton from '../create-post-button/create-post-button';
import './create-post.scss';

const CreatePost = (props) => {

    const [postData, setPostData] = useState({
        title: null,
        content: null
    });

    const [localErrors, setLocalErrors] = useState(null);
    const [image, setImage] = useState('');

    useEffect(() => {

        if (props.currentPost) {
            setPostData({
                title: props.currentPost.title,
                content: props.currentPost.content
            });
        } else {
            setPostData({
                title: null,
                content: null
            });
            
        }

    }, [props.currentPost])

    const handleChange = event => {
        event.preventDefault();
        setPostData({
            ...postData,
            [event.target.name]: event.target.value
        });
    };

    const handleChangeImageInput = (event) => {
        let image = event.target.files[0];
        setImage(image);
    }

    const handleSubmit = () => {

        if (!postData.title || !postData.content){
            let err = []
            for (let i in postData) {
                if (!postData[i]){
                    err.push(i)
                }
            }
          setLocalErrors(err);
    
        } else {
            setLocalErrors([]);
            if (props.currentPost){
                props.updatePost(props.currentPost._id, postData, image);
            } else {
                props.createPost(postData, image);
                setPostData({
                    title: null,
                    content: null
                });
            }
        } 
    }

    const ErrorAlerts = () => {
        if (!localErrors){
            return ''
    
        } else if(props.serverResponse.status == 'error') {
            return <Message error>{props.serverResponse.essage}</Message>
    
        } else {
            return localErrors.map((error) => <Message error>{`${error} field is required`}</Message>)
        }
    }

    const SuccessCreation = () => {
        if(props.postCreated == true){
            return <Message positive>Post created succesfully!</Message>
        } else {
            return ''
        }
    }

    const outsideClick = (event) => {
        if (event.target.id === 'modal' || event.target.id === 'close') {
            props.toggleModal(false);
        }
    }

    return(
        <>
        <CreatePostButton />
        <div id="modal" className={props.openModal ? 'modal show' : 'modal'} onClick={outsideClick}>
            <div className="modal-content col-md-6" >
                <div className="cart-header">
                    <h3>Create a Post</h3>
                    <span id="close" className="close">&times;</span>
                </div>
                <div className="cart-body">
                    <Form>
                        <Form.Input fluid 
                            label='Title' 
                            placeholder='El Quijote.' 
                            name="title"
                            value={postData.title ? postData.title : ""}
                            onChange={handleChange}/>
                        <Form.TextArea 
                            label='Content' 
                            placeholder='Habia una vez...'
                            name="content"
                            value={postData.content ? postData.content : ""}
                            onChange={handleChange}/>
                        <label htmlFor="image">Upload a image:</label>
                        <input 
                            type="file"
                            id="image" name="image"
                            accept="image/png, image/jpeg"
                            onChange={handleChangeImageInput}>
                        </input>

                        <ErrorAlerts />
                        <SuccessCreation />

                        <Form.Button onClick={handleSubmit} style={{ margin:'1em 0 0 0'}}>Submit</Form.Button>
                    </Form>
                    <ErrorAlerts />
                </div>
            </div>
        </div>
        </>
    )

}

const mapStateToProps = state => {

    return {
        currentPost : state.postReducer.currentPost,
        serverResponse: state.postReducer.response,
        postCreated: state.postReducer.postCreated,
        openModal: state.postReducer.openModal
    }
}

const mapDispatchToProps = {
    createPost,
    updatePost,
    toggleModal
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);