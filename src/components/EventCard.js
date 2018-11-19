import React from 'react'
import {Card, Image} from 'semantic-ui-react'


const EventCard = (props) => {
    return (
        <div>
            <Card fluid>
            <Card.Content>
                    <Image src={props.event.image} className="event-image" />
                <div className="event-title">
                    <div className="date-box">
                        <span id="date-span">{props.event.date.split("-")[0]} <br/> {props.event.date.split("-")[1]}/{props.event.date.split("-")[2]}  </span>
                    </div>
                    <h3>{props.event.title}</h3>

                </div>
            </Card.Content>
            </Card>
        </div>
    )
}

export default EventCard