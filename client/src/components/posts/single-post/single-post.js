import React from 'react';
import { connect } from "react-redux";
import { Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react'
import { deletePost, setCurrentPost, toggleModal }  from '../../../redux/actions/post/actions';
import './single-post.scss';

const SinglePost = (props) =>{


	const ImageHandler = () => {
		if(!props.data.image){
			return '';
		} else {
			return(
				<img className="post-img" src={props.data.image}></img>
			)
		}
	}

	const handleDeletePost = (e) => {
		props.deletePost(props.data._id)
	}

	const handleUpdatePost = (e) => {
		props.setCurrentPost(props.data);
		props.toggleModal(true);
	}

    return(
        <>
        <Grid.Row>
			<ImageHandler />
			<div className="title-container">
				<div>
					<Header as="h2">{props.data.title}</Header>
				</div>
				<div className="actions">
					<Icon onClick={handleUpdatePost} name="edit" color="blue"></Icon>
					<Icon onClick={handleDeletePost} name="trash" color="red"></Icon>
				</div>
			</div>
			<Segment style={{ margin:'0 0 3em 0' }}>
				<p>{props.data.content}</p>
			</Segment>
			<Divider />
			
		</Grid.Row>
        </>
    )
}


const mapDispatchToProps = {
	setCurrentPost,
	deletePost,
	toggleModal
};

export default connect(null, mapDispatchToProps)(SinglePost);