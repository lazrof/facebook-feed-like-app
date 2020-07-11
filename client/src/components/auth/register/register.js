import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
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
import './register.scss';

const Register = () => {

    return(
        <>
        <Navbar />
        <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="gray" textAlign="center">
            <Icon name="users icon" color="gray" />

            Register
          </Header>
          <Form /* onSubmit={this.handleSubmit} */ size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="name"
                icon="user"
                iconPosition="left"
                placeholder="Full Name"
                /* onChange={this.handleChange} */
                value="{email}"
                /* className={this.handleInputError(errors, "email")} */
                type="text"
              />

              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                /* onChange={this.handleChange} */
                value="{email}"
                /* className={this.handleInputError(errors, "email")} */
                type="email"
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                /* onChange={this.handleChange} */
                value="{password}"
                /* className={this.handleInputError(errors, "password")} */
                type="password"
              />

              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                /* onChange={this.handleChange} */
                value="{password}"
                /* className={this.handleInputError(errors, "password")} */
                type="password"
              />

              <Button
                disabled={false}
                className={false ? "loading" : ""}
                color="gray"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>
          <Message>
            Don't have an account? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
        </>
    )
}

export default Register;