import React from 'react';
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
    var ExperienceListingMap = [];
    if (props.experiences) {

        ExperienceListingMap = props.experiences.map((experience, i) => {
            return (
                <Popover
                key={i}
                content={ <PopoverContent experience={ experience } /> }
                
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
        <div className="map">
            <div className="google-map">
                <GoogleMapReact
                    bootstrapURLKeys={{ 
                        key: 'AIzaSyA3ZlVPMDj0kr5MTDux3rftgTC6x-cBr-g' }}
                    defaultZoom={9}
                    defaultCenter={ center }
                >
                    {ExperienceListingMap}
                </GoogleMapReact>
            </div>
        </div>

    )
}

function mapDispatchToProps(dispatch) {
    return {
        toggleRoadplanner: function(roadtripID, experience) {
            dispatch({ 
                type: 'toggleRoadplanner',
                roadtripID: roadtripID,
                experience: experience 
            })
        },
        addExperience: function(roadtripID, experience) {
            dispatch({
                type: 'addExperience',
                roadtripID: roadtripID,
                experience: experience
            })
        },
        addRoadtripToUser: function(roadtrip) {
            dispatch({
                type: 'addRoadtrip',
                roadtrip: roadtrip
            })
        }
    }
}

function mapStateToProps(state) {
    return { experiences: state.experiences, region: state.region, user: state.user, roadplanner: state.roadplanner }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)
    (Map);


let styles = {

    // CARD - TITLE//

    h3: {
        fontWeight: 'bold',
        fontSize: '20px',
        color: '#106271',
        textDecoration: 'none',
    },

    h4: {
        // fontSize: '18px',
        color: '#e06868',
        textDecoration: 'none',
    },

    single_destinations:{
        display: 'flex',
        flexWrap: 'wrap',
        border: '1px solid #CFD3DE',
        boxShadow: '0px 3px 9px #071c551f',
        borderRadius: '7px',
        position: 'relative',
        overflow: 'hidden',
        width: '30vw',
        height: '50vh'
    },

    image_card:{
        position: 'relative',
        background: '#fff',
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        maxHeight: '30%',
        borderRadius: '5px',
    },

    image:{
        width: '100%',
        height: '100%',
        objectFit: 'contains',
        objectPosition: 'center center',
        borderRadius: '5px',
    },

    detail_title_location:{
        padding:'.5rem',
    },

    detail_card:{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',        
        // padding: '22px 15px',
        background: '#ffffff',
        width: '100%',
        marginLeft: '.5rem',
        marginRight: '.5rem',
    },

    liste_price_item: {
        paddingLeft: '10%',
        borderLeft: '1px solid #CFD3DE',
        paddingTop: '0',
        width: '100%',
        color:'grey',
        textAlign: 'center',

    },

    liste_temps_item: {
        paddingRight: '10%',
        paddingTop: '0',
        width: '100%',
        color:'grey',
        textAlign: 'center',
    },

    picto: {
        height: '80px',
        width: '80px',
        marginRight: '1%',
        whiteSpace: 'wrap',
        zIndex:'10',
        marginTop: '-3rem',
    },

    popover: {
        backgroundColor: 'rgba(244, 244, 246, 0.5)',
        borderRadius: '15px',
        height: '70%'
    },
}
