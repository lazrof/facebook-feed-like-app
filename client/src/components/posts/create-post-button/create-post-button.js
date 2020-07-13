import React from 'react';
import { connect } from "react-redux";
import { toggleModal, setCurrentPost }  from '../../../redux/actions/post/actions';
import { Icon } from 'semantic-ui-react';
import './create-post-button.scss';

const CreatePostButton = (props) => {

    const handleOpenModal = () => {
        props.toggleModal(true);
        props.setCurrentPost(null);
    }

    return (
        <div className="create-container">
            <div onClick={handleOpenModal}>
                <span>New Post</span>
                <Icon name="pencil"></Icon>
            </div>
        </div>
    )   
}


const mapDispatchToProps = {
    toggleModal,
    setCurrentPost
};

export default connect(null, mapDispatchToProps)(CreatePostButton);