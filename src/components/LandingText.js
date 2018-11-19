import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import './LandingText.css'

class LandingText extends Component {

    componentDidMount() {
        document.getElementsByClassName('page-container')[0].style.backgroundImage = "url('../../purple-background.jpg')"
        document.getElementsByClassName('logo')[0].style.color = "white"
        document.getElementsByClassName('header-link')[0].style.color = "white"
        document.getElementsByClassName('header-link')[1].style.color = "white"
        // document.getElementsByClassName('header-link')[2].style.color = "white"
        document.getElementsByClassName('dropbtn')[0].style.color = "white"

    }

    componentWillUnmount() {
        document.getElementsByClassName('page-container')[0].style.backgroundImage = "none"
        document.getElementsByClassName('logo')[0].style.color = "purple"
        document.getElementsByClassName('dropbtn')[0].style.color = "purple"
        document.getElementsByClassName('header-link')[0].style.color = "purple"
        document.getElementsByClassName('header-link')[1].style.color = "purple"
        // document.getElementsByClassName('header-link')[2].style.color = "purple"
    }
    render() {
        if (!!this.props.currentUser.first_name) {
            return <Redirect to='/dashboard' />
        }

        
        return (
            <div>
                <div className="welcome-text">
                    <h1>LocateHER</h1>
                    <h3>A tech mentoring platform to empower women</h3>
                    <p>Discover mentors or inspire mentees in your community</p>
                </div>
                <div className="signup-links">
                    <Link to="/signup"><h4 onClick={this.props.signUpAsMentor}>Mentor Sign Up</h4></Link>
                    <Link to="/signup"><h4 onClick={this.props.signUpAsMentee}>Mentee Sign Up</h4></Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser
    }
}

export default connect(mapStateToProps)(LandingText);