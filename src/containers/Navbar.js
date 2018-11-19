import React, { Component } from 'react'
import {signinUser, signoutUser} from '../actions/usersActions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Form} from 'semantic-ui-react'
import './Navbar.css'

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMsg: "",
            username: "",
            password: ""
        }
    }

    handleOnChange = (e, field) => {
        this.setState({
            [field]: e.target.value
        }, () => console.log(this.state))
    }

    handleSubmit = () => {
        this.props.signinUser(this.state.username, this.state.password)
        .then((data) => data.payload.error ? this.setState({errorMsg: data.payload.error}) : null)
    }

    render() {
        return (
            <div className="nav-container">
            <div>
            <img className="logo-image" src="https://files.slack.com/files-pri/TE2MS2T28-FE7TFF08N/atom__1_.png" />
            <Link to="/"><h1 className="logo">LocateHER</h1></Link>
            </div>
                <div className="header-menu">
                    <Link to="/stories"><h3 className="header-link">Stories</h3></Link>
                    <Link to="/events"><h3 className="header-link">Events</h3></Link>
                    {this.props.currentUser ? <Link to="/mypage"><h3 className="header-link">My Page</h3></Link> : null}
                    {this.props.currentUser ? <Link to="/dashboard"><h3 className="header-link">Dashboard</h3></Link> : null}
                    <div className="dropdown">
                    <h3 className="dropbtn">{!!this.props.currentUser.email ? <span onClick={this.props.signoutUser}>Sign Out</span> : "Sign In" }</h3>
                    {!!this.props.currentUser.email ? 
                    null : (
                        <div className="dropdown-content">
                        {this.state.errorMsg !== "" ? <p>{this.state.errorMsg}</p> : ""}
                        <Form>
                            <label>Email</label>
                            <Form.Input type="text" onChange={(e) => this.handleOnChange(e, "username")} />
                            <label>Password</label>
                            <Form.Input type="password" onChange={(e) => this.handleOnChange(e, "password")} />
                            <Form.Button onClick={this.handleSubmit}>Sign In</Form.Button>
                        </Form>

                    </div>
                    )}
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signinUser: (email, password) => dispatch(signinUser(email, password)),
        signoutUser: () => dispatch(signoutUser())
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(Navbar)