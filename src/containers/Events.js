import React, {Component} from 'react'
import {Card, Input} from 'semantic-ui-react'
import './Events.css'
import EventCard from '../components/EventCard'
import {fetchEvents} from '../actions/eventsActions'
import {connect} from 'react-redux'

class Events extends Component {
    componentDidMount() {
        this.props.fetchEvents()
    }

    render() {
        return (
            <div className="events-container">
                <div className="events-search">
                    <Input fluid icon='search' placeholder='Search...' onChange={(e) => this.handleChange(e.target.value)} />
                </div>
                <h2>Programmes and Events</h2>
                <div className="events-grid-container">
                    {this.props.allEvents.map(event => {
                        return (
                            <div className="events-grid-item">
                                <EventCard event={event} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allEvents: state.events.events
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEvents: () => dispatch(fetchEvents())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);