import React, { useState } from 'react';
import '../App.css';
import '../styles/googleMap.css';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons'


const LocationPin = ({ text }) => (
    <div className="pin">
        <FontAwesomeIcon  icon={faMapMarker} className="pin-icon" />
        <p className="pin-text">{text}</p>
    </div>
);

const Map = (props) => {
    var ExperienceListingMap = [];
    if (props.experiences) {

        ExperienceListingMap = props.experiences.map((experience, i) => {
            return (<LocationPin
                lat={experience.coordinate.latitude}
                lng={experience.coordinate.longitude}

            />)
    })}
        


    let location = {
            address: '',
            lat: 48.816,
            lng: 5.806
        }

    return (
            <div className="map">
                <div className="google-map">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: ' AIzaSyBvIhotKMqoE6LT2ahjaI1T87LX1zG5Y3s' }}
                        defaultCenter={location}
                        defaultZoom={7}
                    >
                        {ExperienceListingMap}
                    </GoogleMapReact>
                </div>
            </div>

        )
    }



    function mapStateToProps(state) {
        console.log(state)
        return { experiences: state.experiences, region: state.region }
    }

    export default connect(
        mapStateToProps,
        null)(Map);
