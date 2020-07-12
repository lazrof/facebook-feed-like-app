import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react'
import SinglePost from './single-post/single-post';
import CreatePost from './create-post/create-post';
import { getAllPosts } from '../../redux/actions/post/actions';


const Posts = (props) => {

		if(!props.isAuthenticated){
			props.history.push('/');
		}

		useEffect(() => {
			props.getAllPosts();
		}, [props.getAllPosts])

		/*
		Podemos intentar con un modal para los forms

		el layout será muy simple, un container centrado y un boton en el medio
		en la parte de abajo para añadir nuevos posts

		cada posts tendra una imagen, un titulo y un texto, seran tipo cardsitos
		y tendran 2 botones uno para editar con una plumita y otro para borrar con una basurita roja

		cuando queramos editar un post podemos abrir el modal con la información del post
		para editar la imagen podemos crear otro form solo para la imagen.

		*/
		const PostsHandler = () => {
			
			if(props.posts != null && props.posts.length > 0){
				
				return props.posts.map((post) => <SinglePost  key={post._id} data={post}/>)
				
			} else {
				return(
					<Segment>
						<h3>You don't have any post, Create a new one!</h3>
					</Segment>
				)
			}
			
		}

		return(
			<>
				<CreatePost />
				<Grid container style={{ padding: '5em 0em', justifyContent:'center' }} >
					<Grid.Row style={{ maxWidth: 700 }}>
						<Grid.Column>
							<PostsHandler />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</>
		)
}

const mapStateToProps = state => {
		return {
			isAuthenticated: state.userReducer.authenticated,
			posts: state.postReducer.allPosts
		};
	}
	
const mapDispatchToProps = {
  getAllPosts
}
	
	export default connect(mapStateToProps, mapDispatchToProps)(Posts);