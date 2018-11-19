import React, {Component} from 'react'


class MapMarker extends Component {

    render() {
        return (
            <div className="map-marker">
                <div className="map-star" />
                {this.props.user.first_name}
            </div>
        )
    }
}

export default MapMarker

