import React from 'react';
import { connect } from "react-redux";
import { Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react'
import { deletePost }  from '../../../redux/actions/post/actions';
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

    return(
        <>
        <Grid.Row>
			<ImageHandler />
			<div className="title-container">
				<div>
					<Header as="h2">{props.data.title}</Header>
				</div>
				<div className="actions">
					<Icon name="edit" color="blue"></Icon>
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
    deletePost
};

export default connect(null, mapDispatchToProps)(SinglePost);