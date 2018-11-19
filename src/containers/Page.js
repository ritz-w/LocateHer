import React, { Component } from 'react'
import LandingText from '../components/LandingText'
import Navbar from './Navbar'
import MyPage from './MyPage'
import Stories from './Stories'
import Events from './Events'
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux'
import {fetchUsers} from '../actions/usersActions'
import SignupForm from './SignupForm';
import './Page.css'
import Dashboard from './Dashboard'

class Page extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mentorSignup: false,
        }
    }

    componentDidMount() {
        this.props.fetchUsers()
    }

    signUpAsMentor = () => {
        this.setState({mentorSignup: true})
    }

    signUpAsMentee = () => {
        this.setState({mentorSignup: false})
    }


    render() {
        return (
            <div className="page-container">
                    <BrowserRouter>
                    <div>
                        <Navbar />
                        <Switch>
                        <Route exact path="/" component={(routerProps) => <LandingText signUpAsMentee={this.signUpAsMentee} signUpAsMentor={this.signUpAsMentor} {...routerProps} />}/>
                        <Route exact path="/signup" component={() => <SignupForm mentor={this.state.mentorSignup} />}/>
                        <Route exact path="/dashboard" component={() => <Dashboard allUsers={this.props.allUsers}/>}/>
                        <Route exact path="/events" component={() => <Events />}/>
                        <Route exact path="/stories" component={() => <Stories />}/>
                        <Route exact path="/mypage" component={() => <MyPage />}/>
                        {/* <Route exact path={`/gallery/:imgId`} component={(routerProps) => <PresentationContainer userImages={this.props.userImages} {...routerProps}/>}/>
                        <Route exact path="/about" component={About}/> */
                        }
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: () => dispatch(fetchUsers())
    }
}


const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser,
        allUsers: state.users.users
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
