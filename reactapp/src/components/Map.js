import React, { Component } from 'react';
import '../App.css';
import '../styles/googleMap.css';
import GoogleMapReact from 'google-map-react';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons'



const LocationPin = ({ text }) => (
    <div className="pin">
        <FontAwesomeIcon icon={faMapMarker} className="pin-icon" />
        <p className="pin-text">{text}</p>
    </div>
);

const Map = (zoomLevel) => {

    let location = {
        address: '1600 Amphitheatre Parkway, Mountain View, california.',
        lat: 48.856614,
        lng: 2.3522219
    }

    return (
        <div className="map">
            <div className="google-map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCZWCVDSpj-l4rJc3IdAxNRgHRrIjWz9mk'}}
                    defaultCenter={location}
                    defaultZoom={16}
                >
                    <LocationPin
                        lat={location.lat}
                        lng={location.lng}
                    />
                </GoogleMapReact>
            </div>
        </div>

    )
}
export default Map;