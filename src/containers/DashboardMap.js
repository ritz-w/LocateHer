import React, {Component} from 'react'
import {connect} from 'react-redux'
import MapMarker from '../components/MapMarker'
import GoogleMapReact from 'google-map-react';
import Geocode from 'react-geocode';

 

class DashboardMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            center: {
                lat: 51.5074,
                lng: 0.1278
              },
              zoom: 10,
            userCoords: []

        }
    }

    componentDidMount() {
        console.log(this.props.allUsers)
        Geocode.setApiKey("AIzaSyB6pa_QL5Wzonq9oAoweMEmLwjnRN3F6iE");
        for (let i=0; i<this.props.allUsers.length; i++) {
            Geocode.fromAddress(this.props.allUsers[i].location).then(
                response => {
                  const coords = response.results[0].geometry.location;
                  console.log(this.props.allUsers[i].first_name + coords)
                  return JSON.parse(JSON.stringify(coords))
                })
        .then(coords => {
            console.log(coords)
            this.setState({userCoords: [...this.state.userCoords, [coords.lat, coords.lng]]})
        })
        }
    }


    renderMapMarkers = () => {
        return this.state.userCoords.map((coords, index) => {
        return <MapMarker user={this.props.allUsers[index]} lat={coords[0]} lng={coords[1]} />
        }
        )
    }


    render() {
        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyB6pa_QL5Wzonq9oAoweMEmLwjnRN3F6iE' }}
                defaultCenter={this.state.center}
                defaultZoom={this.state.zoom}
                >
                {this.renderMapMarkers()}
                </GoogleMapReact>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allUsers: state.users.users
    }
}



export default connect(mapStateToProps)(DashboardMap)

