import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logIn } from '../../../redux/actions/user/actions';
import Navbar from '../navbar/navbar';
import {
    Grid,
    Form,
    Segment,
    Button,
    Header,
    Message,
    Icon
} from "semantic-ui-react";
import './login.scss';

const LogIn = (props) => {

  const [ userData , setUserData ] = useState({
    email:null,
    password:null
  });

  const [localErrors, setLocalErrors] = useState(null)

  if(props.isAuthenticated){
    props.history.push('/home');
  }


  const handleChange = event => {
    event.preventDefault();
    setUserData({
        ...userData,
        [event.target.name]: event.target.value
    });
  };

  const displayErrors = errors =>{
    return errors.map((error) => <p key={error}>Fill {error} field.</p>);
  }


  const handleSubmit = () => {

    if ( !userData.email || !userData.password ){
      let err = []
      for (let i in userData){
        if (!userData[i]){
          err.push(i)
        }
      }
      setLocalErrors(err);

    } else {
      setLocalErrors([]);
      props.logIn(userData);
    }
      
  }

    return(
        <>
        <Navbar />
        <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="grey" textAlign="center">
            <Icon name="users" color="grey" />

            Login
          </Header>
          <Form onSubmit={handleSubmit} size="large">
            <Segment stacked>
              <input 
                type="email" 
                placeholder="Email Address" 
                name="email"
                onChange={handleChange}
              ></input>
              <input 
                type="password" 
                placeholder="Password Confirmation" 
                name="password"
                onChange={handleChange}
              ></input>


              <Button
                color="grey"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>
          { localErrors ?  <Message error> {displayErrors(localErrors)} </Message> : '' }

          <Message>
            Don't have an account? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
        </>
    )
}

const mapStateToProps = state => {
  return {
    serverResponseStatus: state.userReducer.responseStatus,
    serverResponseMessage: state.userReducer.responseMessage,
    isAuthenticated: state.userReducer.authenticated,
    authToken: state.userReducer.authToken
  };
}

const mapDispatchToProps = {
  logIn
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);