import React, {Component} from 'react'
import { Card, Grid, Image, Input, Button, Modal, Form } from 'semantic-ui-react'
import { createConnection } from '../actions/usersActions'
import {connect} from 'react-redux'

class DashboardList extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            allUsers: props.allUsers.filter(user => user.id !== props.currentUser.id),
            allOtherUsers: props.allUsers.filter(user => user.id !== props.currentUser.id),
            searchTerm: "",
            expectationsMessage: "",
            requestMessage: "", 
            pendingConnectionIds: "",
            acceptedConnectionIds: "",
            pendingRequestsIds: ""
        }
    }

    componentDidMount() {
        //users who have not been approved by current user
        const pendingRequestedUsers = this.props.currentUser.connections.filter(connection => connection.accepted === false)
        const pendingRequestedUserIds = pendingRequestedUsers.map(connection => connection.requested_user_id)
        //users who have been approved by current user
        const acceptedRequests= this.props.currentUser.requests.filter(request => request.accepted === true)
        const acceptedRequestedUserIds = acceptedRequests.map(request => request.user_id)
        //users who have approved current user
        const acceptedConnectionUsers = this.props.currentUser.connections.filter(connection => connection.accepted === true)
        const acceptedConnectedUserIds = acceptedConnectionUsers.map(connection => connection.requested_user_id)
        //users who have not approved current user
        const pendingRequests= this.props.currentUser.requests.filter(request => request.accepted === false)
        const pendingRequestsUserIds = pendingRequests.map(request => request.user_id)
        
        const acceptedConnections = [...acceptedRequestedUserIds, ...acceptedConnectedUserIds]
        this.setState({pendingConnectionIds: pendingRequestedUserIds})
        this.setState({pendingRequestsIds: pendingRequestsUserIds})
        this.setState({acceptedConnectionIds: acceptedConnections})
    }

    handleConnectFieldInput = (field, userInput) => {
        this.setState({[field]: userInput }, () => console.log(this.state))
    }

    handleConnectFieldSubmit = (requestedUserId) => {
        const intReqId = parseInt(requestedUserId)
        this.props.createConnection(this.props.currentUser.id, intReqId, this.state.expectationsMessage, this.state.requestMessage)
    }

    filterMentors = () => {
        const mentorUsers = this.state.allOtherUsers.filter(user => user.mentor === true)
        console.log(mentorUsers)
        return mentorUsers.length === 0 ? this.setState({allUsers: "Looks like there are no mentors in this area."}) : this.setState({allUsers: mentorUsers})
    }

    filterMentees = () => {
        const menteeUsers = this.state.allOtherUsers.filter(user => user.mentee === true)
        console.log(menteeUsers)
        return menteeUsers.length === 0 ? this.setState({allUsers: "Looks like there are no mentees in this area."}) : this.setState({allUsers: menteeUsers})
    }

    filterNetwork = () => {
        const connectedUsers = this.state.allOtherUsers.filter(user => this.state.acceptedConnectionIds.includes(user.id))
        console.log(connectedUsers)
        return connectedUsers.length === 0 ? this.setState({allUsers: "There is no one in your network yet. Once mentors and mentees approve your request, they will appear here."}) :         this.setState({allUsers: connectedUsers})

    }

    searchByTerm = (term) => {
        const lowerTerm = term.toLowerCase()
        const returnedUsers = this.state.allOtherUsers.filter(user => user.personal_msg.toLowerCase().includes(lowerTerm) || user.location.toLowerCase().includes(lowerTerm) || user.job_title.toLowerCase().includes(lowerTerm) || user.first_name.toLowerCase().includes(lowerTerm) || user.last_name.toLowerCase().includes(lowerTerm))
        this.setState({allUsers: returnedUsers})
    }

    setAllUsers = () => {
        this.setState({allUsers: this.state.allOtherUsers})
    }

    handleChange = (term) => {
        this.searchByTerm(term)

    }

    renderConnectionStatus = (user) => {
        if (this.state.acceptedConnectionIds.includes(user.id)){
            return (
                <div className='status-button'>
                    <Button basic color="green" size='tiny'>Accepted</Button>
                </div>
            )
        } else if(this.state.pendingConnectionIds.includes(user.id)) {
            return (
                <div className='status-button'>
                    <Button basic color="red" size='tiny'>Pending Request</Button>
                </div>
            )
        } else if(this.state.pendingRequestsIds.includes(user.id)) {
            return (
                <div className='status-button'>
                    <Button basic color="orange" size='tiny'>Pending Approval</Button>
                </div>
            )
        } 
        else {
            return null
        }
    }


    renderUsers = () => {
        return typeof this.state.allUsers === "string" ? 
        (
            <div className="status-message">{this.state.allUsers}</div>
        ) : 
        (
        this.state.allUsers.map(user => {
            return (
                <Modal 
                trigger={
                    <Card fluid> 
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column width={6}>
                            <Image className="avatar-pic" src={user.avatar_link} />
                            </Grid.Column>
                            <Grid.Column width={10} className="card-info">
                            <div className="card-text">
                                <div className="card-title">
                                    <h4>{user.first_name}</h4>
                                    <p>{user.job_title}</p>
                                    <p>{user.location}</p>
                                </div>
                                <div className="block-ellipsis">
                                <p>{user.personal_msg}</p>
                                </div>
                            </div>
                            {this.renderConnectionStatus(user)}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card>
                }>
            
                <Modal.Content>
                  <Modal.Description>
                      <div className="modal-header">
                      <Grid>
                          <Grid.Row columns={2} className='modal-info'>
                            <Grid.Column width={6}>
                                <Image className="avatar-pic" src={user.avatar_link} />
                                </Grid.Column>
                                <Grid.Column width={10} className="card-info">
                                <div className="card-text">
                                    <div className="card-title">
                                        <h4>{user.first_name}</h4>
                                        <p>{user.job_title}</p>
                                        <p>{user.location}</p>
                                    </div>
                                    <div className="modal-bio">
                                    <p>{user.personal_msg}</p>
                                    </div>
                                </div>
                                </Grid.Column>
                            </Grid.Row>
                            {user.mentor ? (
                                <Grid.Row>
                                    <div className="modal-detail">
                                        <p><span style={{fontWeight: '700'}}>Availability:</span> {user.availability}</p>
                                        <p><span style={{fontWeight: '700'}}>Can advise on:</span> {user.advises_on}</p>
                                    </div>
                                </Grid.Row>
                            ) : null}
                                <div className="status-message">
                                {this.state.pendingConnectionIds.includes(user.id) ? (                                    
                                    <h4>You have sent this user a request to become their {this.props.currentUser.mentor ? "Mentor" : "Mentee"} and are awaiting approval.</h4>
                                ) : this.state.acceptedConnectionIds.includes(user.id) ? (
                                    <h4>You are this users's {this.props.currentUser.mentor ? "Mentor" : "Mentee"}.</h4>
                                ) : this.state.pendingRequestsIds.includes(user.id) ? (
                                    <h4>This user has sent you a request to become their {this.props.currentUser.mentor ? "Mentor" : "Mentee"}. Check your dashboard to see their application.</h4>
                                ) : (
                                    <Grid.Row>
                                    <Form style={{width: '80%', marginLeft: '10%', textAlign: 'center'}}>
                                        <Form.TextArea onChange={(e) => this.handleConnectFieldInput('expectationsMessage', e.target.value)} placeholder={user.mentee ? "Tell this mentee about the type of mentor you'd like to be." : "Tell us your ambitions, background and expectations from mentorship."}/>
                                        <Form.TextArea onChange={(e) => this.handleConnectFieldInput('requestMessage', e.target.value)}placeholder={user.mentee ? `How do you think you could help ${user.first_name}?` : `How do you think ${user.first_name} can help you?`}/>
                                        <Form.Button onClick={() => this.handleConnectFieldSubmit(user.id)} color="yellow">Connect</Form.Button>
                                    </Form>
                                </Grid.Row>
                                )}
                                </div>
                        </Grid>
                      </div>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            )
        })
        )
    }

    render() {
        return (
            <div className="users-list">
                <div className="search-bar">
                    <Input fluid icon='search' placeholder='Search...' onChange={(e) => this.handleChange(e.target.value)} />
                    <div className="filter-buttons">
                    <Button onClick={this.setAllUsers} size='tiny' color='yellow'>Everyone</Button>
                    <Button onClick={this.filterMentors} size='tiny' color='yellow'>Mentors</Button>
                    <Button onClick={this.filterMentees} size='tiny' color='yellow'>Mentees</Button>
                    <Button onClick={this.filterNetwork} size='tiny' color='yellow'>My Network</Button>

                    </div> 
                </div>
                  <Card.Group>
                      {this.renderUsers()}

                </Card.Group>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createConnection: (userId, requestedUserId, expMessage, reqMessage) => dispatch(createConnection(userId, requestedUserId, expMessage, reqMessage))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardList)