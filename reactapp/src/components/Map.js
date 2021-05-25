import React, { useState, useEffect } from 'react';
import '../App.css';
import '../styles/googleMap.css';

//MAP
import GoogleMapReact from 'google-map-react';

//REDUX
import { connect } from 'react-redux';

//UI
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons'
import { Popover } from 'antd';
import PopoverContent from './PopoverContent';

const Map = (props) => {
    const [experienceList, setExperienceList] = useState([]);

    useEffect(()=> {
        if (props.mode === 'roadplanner') {
            setExperienceList(props.roadplanner.experiences)
        } else if (props.mode === 'search') {
            setExperienceList(props.experiences)
        }
    }, [props.roadplanner.experiences, props.experiences, props.mode])
    
    useEffect(()=> {
        console.log(experienceList)
    }, [experienceList])

    var markers = [];
    if (experienceList && experienceList.length > 0) {
        markers = experienceList.map((experience, i) => {
            return (
                <Popover
                key={i}
                content={ <PopoverContent mode={ props.mode } experience={ experience } /> }
                
                trigger='click'                       
                lat={experience.coordinate.latitude}
                lng={experience.coordinate.longitude}>
                    <div className="pin">
                        <FontAwesomeIcon icon={faMapMarker} className="pin-icon" />
                    </div>
                </Popover>
    
            )
        })
    }
    
    let center = {
        lat: 48.10707,
        lng: 7.21825
    }

    return (
        <div className={ props.mode === 'roadplanner' ? "mapRoadplanner" : 'map'}>
            <div className="google-map">
                <GoogleMapReact
                    bootstrapURLKeys={{ 
                        key: 'AIzaSyA3ZlVPMDj0kr5MTDux3rftgTC6x-cBr-g' }}
                    defaultZoom={9}
                    defaultCenter={ center }
                >
                    {markers}
                </GoogleMapReact>
            </div>
        </div>

    )
}

function mapStateToProps(state) {
    return { experiences: state.experiences, roadplanner: state.roadplanner }
}

export default connect(
    mapStateToProps,
    null)
    (Map);