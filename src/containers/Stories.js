import React, {Component} from 'react'
import {Grid, Image, Input} from 'semantic-ui-react'
import {fetchStories} from '../actions/storiesActions'
import {connect} from 'react-redux'
import './Stories.css'
import StoryCard from '../components/StoryCard'

class Stories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            featuredStories: props.stories
        }
    }
    componentDidMount() {
        this.props.fetchStories()
    }
    render() {
        return(
            <div className="stories-container">
                <div className="stories-search">
                    <Input fluid icon='search' placeholder='Search...' onChange={(e) => this.handleChange(e.target.value)} />
                </div>
                <div className="stories-display">
                <Grid divided='vertically'>
                    <h2>Featured</h2>
                    <Grid.Row columns={2}>
                    {this.props.stories.slice(0, 2).map(story => {
                        return (
                            <Grid.Column>
                                <StoryCard featured={true} story={story}/>
                            </Grid.Column>
                        )
                    })}
                    </Grid.Row>
                    <h2>Latest</h2>
                    <Grid.Row columns={3}>
                    {this.props.stories.splice(2).map(story => {
                        return (
                            <Grid.Column>
                                <StoryCard story={story}/>
                            </Grid.Column>
                        )
                    })}
                    </Grid.Row>
                </Grid>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        stories: state.stories.stories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStories: () => dispatch(fetchStories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stories)