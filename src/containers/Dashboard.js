import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import DashboardMap from './DashboardMap'
import DashboardList from './DashboardList'
import {fetchUsers} from '../actions/usersActions'
import {Grid} from 'semantic-ui-react'
import './Dashboard.css'

class Dashboard extends Component {

    render() {
        if (this.props.currentUser === "") {
            return <Redirect to='/'/>;
        }

        return (
            <div className="dashboard-container">
                <Grid divided='vertically'>
                    <Grid.Row columns={2}>
                    <Grid.Column>
                        <DashboardList allUsers={this.props.allUsers} />
                    </Grid.Column>
                    <Grid.Column>
                        <DashboardMap />
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser,
        allUsers: state.users.users
    }
}



export default connect(mapStateToProps)(Dashboard)