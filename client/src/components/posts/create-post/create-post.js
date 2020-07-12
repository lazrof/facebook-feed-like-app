import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import { Grid, Form, Modal, Message } from 'semantic-ui-react'
import { createPost as createPost_ }  from '../../../redux/actions/post/actions';
import CreatePostButton from '../create-post-button/create-post-button';
import './create-post.scss';

const CreatePost = (props) => {

    const [postData, setPostData] = useState({
        title: null,
        content: null
    });
    const [localErrors, setLocalErrors] = useState(null)
    const [image, setImage] = useState('');

    // useEffect(() => {

    //     if (props.currentPost) {
    //         setPost({
    //             title: props.currentPost.title,
    //             content: props.currentPost.content
    //         });
    //     }

    // }, [props.currentPost])

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
        console.log(postData);

        if (!postData.title || !postData.content){
            console.log('algun input está vació')
            let err = []
            for (let i in postData) {
                if (!postData[i]){
                    err.push(i)
                }
            }
          setLocalErrors(err);
    
        } else {
          setLocalErrors([]);
          console.log('sending post')
          console.log(postData)
          console.log(image)
          props.createPost_(postData, image);
        }
          
      }

    const ErrorAlerts = () => {
        console.log('errors')
        console.log(localErrors)
        if (!localErrors){
            return ''
    
        } else if(props.serverResponse.status == 'error') {
            return <Message error>{props.serverResponse.essage}</Message>
    
        } else {
            return localErrors.map((error) => <Message error>{`${error} field is required`}</Message>)
        }
    }

    
    return(
        <Modal trigger={<Grid><CreatePostButton></CreatePostButton></Grid>}>
            <Modal.Header>Create a Post</Modal.Header>
            <Modal.Content>
            <Form>
                <Form.Input fluid 
                    label='Title' 
                    placeholder='El Quijote.' 
                    name="title"
                    /* value="El quijote" */
                    onChange={handleChange}/>
                <Form.TextArea 
                    label='Content' 
                    placeholder='Habia una vez...'
                    name="content"
                    /* value="Habia una vez y dos son tres" */
                    onChange={handleChange}/>
                <label htmlFor="image">Upload a image:</label>
                <input 
                    type="file"
                    id="image" name="image"
                    accept="image/png, image/jpeg"
                    onChange={handleChangeImageInput}>
                </input>

                <ErrorAlerts />

                <Form.Button onClick={handleSubmit} style={{ margin:'1em 0 0 0'}}>Submit</Form.Button>
            </Form>
            <ErrorAlerts />
            
            </Modal.Content>
        </Modal>
    )

}

const mapStateToProps = state => {

    return {
        /* currentPost: state.PostReducer.currentPost, */
        serverResponse: state.postReducer.response
    }
}

const mapDispatchToProps = {
    createPost_
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);