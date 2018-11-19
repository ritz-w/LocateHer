import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const StoryCard = (props) => {
    return (
        <Card fluid>
            <Card.Content>
                    <Image src={props.story.image} />
                <div className="article-title">
                    <h3>{props.story.title}</h3>
                    {
                        props.featured ? (
                            <p>{props.story.text}</p>
                        ) : null
                    }
                    <p id="article-tag">By {props.story.user.first_name}, {props.story.date}</p>
                </div>
            </Card.Content>
        </Card>
    )
}

export default StoryCard