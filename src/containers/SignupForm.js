import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { signupUser, fetchUsers } from '../actions/usersActions'
import './SignupForm.css'
import { Form, Input } from 'semantic-ui-react'

class SignupForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isMounted: false,
            submitted: false,
            errorMsg: "",
            mentor: props.mentor,
            firstName: "",
            lastName: "",
            jobTitle: "",
            industry: "",
            personalMessage: "",
            email: "",
            location: "",
            avatarLink: ""
        }
    }


    handleChange = (e, field) => {
        this.setState({
            [field]: e.target.value
        }, () => console.log(this.state))
    }

    handleSubmit = () => {
        this.props.signupUser(this.state)
        .then(() => this.props.fetchUsers())
        .then((data) => data.payload.error ? this.setState({errorMsg: data.payload.error}) : this.setState({submitted: true}))
    }

    render() {
        if (!!this.props.currentUser.first_name) {
            return <Redirect to='/dashboard'/>;
          }

        return (
            <div className="signup-form-container">
                <h1>Welcome to <span className="logo-text">LocateHer</span></h1>
                <h3>You are signing up as a {this.props.mentor ? "Mentor" : "Mentee" }</h3>
                {this.state.errorMsg ? `There was a problem with your signup. ${this.state.errorMsg}` : ""}
                <h2>Login</h2>
                    <Form className="info-form">
                        <Input className="signup-input" onChange={(e) => this.handleChange(e, "email")} placeholder="Email"/>
                        <br />
                        <Input className="signup-input" type="password" onChange={(e) => this.handleChange(e, "password")} placeholder="Password"/>
                <h2 className="space-down">Your Info</h2>
                    <Form.Group widths='equal'>
                        <Form.Input className="signup-input" onChange={(e) => this.handleChange(e, "firstName")} placeholder="First Name"/>
                        <Form.Input onChange={(e) => this.handleChange(e, "lastName")} placeholder="Last Name"/>
                    </Form.Group> 
                    <Input className="signup-input" onChange={(e) => this.handleChange(e, "jobTitle")} placeholder="Job Title"/>
                    <br />
                    <Input className="signup-input" onChange={(e) => this.handleChange(e, "industry")} placeholder="Industry"/>
                    <br />
                    <Input className="signup-input" onChange={(e) => this.handleChange(e, "location")} placeholder="Location"/>
                    <br />
                    <Input className="signup-input space-down" onChange={(e) => this.handleChange(e, "avatarLink")} placeholder="Link to Photo"/>
                    <br />
                    <textarea className="signup-input" onChange={(e) => this.handleChange(e, "personalMessage")} placeholder="What are you looking for from this experience?"/>
                    <br />
                <br />
                <Form.Button className="signup-input space-down" type="submit" onClick={this.handleSubmit}>Submit</Form.Button>

                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signupUser: (userInfo) => dispatch(signupUser(userInfo)),
        fetchUsers: () => dispatch(fetchUsers())
    }
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)