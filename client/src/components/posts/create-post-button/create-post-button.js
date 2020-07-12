import React from 'react';
import { Icon } from 'semantic-ui-react';
import './create-post-button.scss';

const CreatePostButton = () => {
    return (
        <div className="create-container">
            <div>
                <span>New Post</span>
                <Icon name="pencil"></Icon>
            </div>
        </div>
    )   
}

export default CreatePostButton;

