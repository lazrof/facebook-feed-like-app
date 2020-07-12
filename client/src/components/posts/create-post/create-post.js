import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import { Grid, Form, Modal, Message } from 'semantic-ui-react'
import { createPost }  from '../../../redux/actions/post/actions';
import CreatePostButton from '../create-post-button/create-post-button';
import './create-post.scss';

const CreatePost = (props) => {

    const [postData, setPostData] = useState({
        title: null,
        content: null
    });

    const [localErrors, setLocalErrors] = useState(null);
    const [image, setImage] = useState('');

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
            props.createPost(postData, image);
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

    return(
        <Modal trigger={<Grid><CreatePostButton></CreatePostButton></Grid>}>
            <Modal.Header>Create a Post</Modal.Header>
            <Modal.Content>
            <Form>
                <Form.Input fluid 
                    label='Title' 
                    placeholder='El Quijote.' 
                    name="title"
                    onChange={handleChange}/>
                <Form.TextArea 
                    label='Content' 
                    placeholder='Habia una vez...'
                    name="content"
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
            
            </Modal.Content>
        </Modal>
    )

}

const mapStateToProps = state => {

    return {
        serverResponse: state.postReducer.response,
        postCreated: state.postReducer.postCreated
    }
}

const mapDispatchToProps = {
    createPost
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);