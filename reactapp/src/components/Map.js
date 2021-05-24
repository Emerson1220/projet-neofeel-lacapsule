import React, { useState } from 'react';
import '../App.css';
import '../styles/googleMap.css';
import { Link } from 'react-router-dom';

//MAP
import GoogleMapReact from 'google-map-react';

//REDUX
import { connect } from 'react-redux';

//UI
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons'
import { Modal, Cascader, message  } from 'antd';
import RedButton from './RedButton';


const Map = (props) => {
    const [experience, setExperience] = useState({ partner: { addresses: [{ city: '' }] }, tags: [], description: {imageBannerUrl:''} })
    const [visible, setVisible] = useState(false);
    const [voyageSelect, setVoyageSelect] = useState('');
    
    //MODAL
    const showModal = (exp) => {
        setExperience(exp)
        setVisible(!visible);
    
    };

    const handleCancel = () => {
        setVisible(!visible);
    };

    //CASCADER
    let options = [
            {
                value: 'new',
                label: 'Mon voyage'
            }
        ]
        
    if (props.user.roadtrips) { 
        let userTrips = props.user.roadtrips.map(e => {
            return {
                value: e._id,
                label: e.name
            }
        });

        let savedTripsOption = {};

        if (userTrips.length > 0) { 
            savedTripsOption = {
                value: 'saved',
                label: "Vos voyages",
                children: userTrips
            }
        }

        options = [
        {
            value: 'new',
            label: 'Nouveau voyage'
        },
        savedTripsOption
    ];
    }

    function displayRender(label) {
        return label[label.length - 1];
    }

    const onChange = (value) => {
        setVoyageSelect(value)
    };

    //HTTP REQUESTS
const createNewTrip = async (experience) => {
    let region = 'Alsace-Vosges';
        let rawResponse = await fetch('/myroadplanner', {
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `token=${props.user.token}&name=Mon Voyage en ${region}&region=${region}&regionCode=${props.region}&experienceID=${experience._id}`
        });
        let response = await rawResponse.json();
        if (response.result === true) {
            props.toggleRoadplanner(response.roadtrip._id, experience);
            props.addRoadtripToUser(response.roadtrip)
            success();
        }
    }
    
    const addExperienceToTrip = async(experience) => {
        let rawResponse = await fetch('/myroadplanner', {
            method: 'PUT',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `roadtripID=${voyageSelect[1]}&experienceID=${experience._id}`
        })
        let response = await rawResponse.json();
        if(response.result === true) {
            props.addExperience(response.roadtrip._id, experience)
            success()
        }
    }

    //FUNCTIONS
    const chooseExperience = async(experience) => {
        if (props.user.token) {
            voyageSelect[0] === 'new' ? createNewTrip(experience) : addExperienceToTrip(experience);
        } else {
            !props.roadplanner.experiences || props.roadplanner.experiences.length === 0 ? props.toggleRoadplanner('temp', experience) : props.addExperience('temp', experience) ;
            success();
        }
    }

    const success = () => {
        message.success({
            content: 'Expérience ajouté',
            className: 'custom-class',
            style: {
                marginTop: '20vh',
            },
        });
    };

    let openModal = [];
    if (experience !== {}) {
        openModal = 
        <div style={styles.single_destinations}> 
        <div style={styles.image_card}>
            <img style={styles.image} src={ experience.description.imageBannerUrl ? experience.description.imageBannerUrl : "images/photo-526x360.png" } alt="list" />
        </div>
        <div style={{ width: '100%',backgroundColor: 'white',display:'flex', flexWrap:'nowrap', padding:'1rem'}}>
            {experience.tags.map((image, j) => {
                return (<img key={j} style={styles.picto} src={`images/pictos/${image}-8.png`} alt={image} />)
            }) }
        </div>
            <div style={styles.detail_title_location}>
                <div>
                    <Link
                    style={styles.h3}
                    to={{
                        pathname: `/partenaire/${experience._id}`,
                        state: {
                            experience: experience
                        }
                    }}>
                        <h3>{experience.name}</h3>
                    </Link>
                    <Link
                    style={styles.h4}
                    to={{
                        pathname: `/partenaire/${experience._id}`,
                        state: {
                            experience: experience
                        }
                    }}>
                        <h4>{experience.subtitle}</h4>
                    </Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems:'flex-end' }}>
                    <p style={{ color: '#e06868', marginBottom: '8px' }}>
                    <img style={{ marginRight: '4px' }} src="images/icone-geo.png" alt="map" />{experience.region}</p>
                    <h4 ><Link style={styles.h4} to="/">{experience.partner.addresses[0].city}</Link></h4>
                </div>
            </div>
        <div style={styles.detail_card}>
                <div style={styles.liste_temps_item}>
                    <p>Temps</p>
                    <h2>{experience.activityTime}</h2>
                </div>
                <div style={styles.liste_price_item}>
                    <p>Prix</p>
                    <h2>{experience.budget}</h2>
                </div>
        </div>
        <div style={{ textAlign: 'center', marginTop:'1rem', alignSelf: 'center', width: '100%' }}>
            <h4 style={styles.h4}>Ajouter cette experience à votre voyage</h4>
            <Cascader
            options={ options }
            expandTrigger="hover"
            displayRender={ displayRender }
            onChange={ onChange }
            placeholder="Sélectionnez un voyage"
            />
            <RedButton
            title="+"
            onSelect={ ()=>chooseExperience(experience) }/>
        </div>
    </div>
    }

    const LocationPin = (props) => (
        <div className="pin" onClick={() => props.onSelect()}>
            <FontAwesomeIcon icon={faMapMarker} className="pin-icon" />
            <p className="pin-text">{ props.text }</p>
        </div>
    );

    var ExperienceListingMap = [];
    if (props.experiences) {

        ExperienceListingMap = props.experiences.map((experience, i) => {
            return (
                <LocationPin
                    key={i}
                    onSelect={() => showModal(experience)}
                    lat={experience.coordinate.latitude}
                    lng={experience.coordinate.longitude}
                />

            )
        })
    }

    let location = {
        address: '',
        lat: 48.10707,
        lng: 7.21825
    }

    return (
        <div className="map">
            <div className="google-map">
                <GoogleMapReact
                    bootstrapURLKeys={{ 
                        key: 'AIzaSyBvIhotKMqoE6LT2ahjaI1T87LX1zG5Y3s' }}
                    defaultZoom={9}
                    defaultCenter={ location }
                >
                    {ExperienceListingMap}
                </GoogleMapReact>
            </div>
            <Modal
                title=''
                centered={true}
                visible={visible}
                footer={null}
                closable={ false }
                bodyStyle={styles.modal}
                maskStyle={styles.modalMask}
                onCancel={() => handleCancel()}>

                {openModal}
            </Modal>
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
    // CSS - ICONS //


    // CSS - ICONS //

    icons_la:{
        display: 'inline-block',
        position: 'absolute',
        top: '17px',
        left: '20px',
        color: '#CFD3DE',
        font: 'normal normal normal 16px/1 LineAwesome',
        fontSize: 'inherit',
        textDecoration: 'inherit',
        textRendering: 'optimizeLegibility',
        textTransform: 'none',
    },

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

    // CARD - CSS //

    experiences_list_area:{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',        
        boxSizing: 'border-box',
        outline: 'none',
        paddingLeft: '1rem',
        paddingRight: '1rem',

    },

    single_destinations:{
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 0 30px 0',
        border: '1px solid #CFD3DE',
        boxShadow: '0px 3px 9px #071c551f',
        borderRadius: '7px',
        position: 'relative',
        overflow: 'hidden',
        // maxHeight: '400px'
    },

    image_card:{
        position: 'relative',
        background: '#fff',
        overflow: 'hidden',
        // flex: '0 0 30%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        // minHeight: '200px',
        maxHeight: '30%',
        borderRadius: '5px',
    },

    image:{
        width: '100%',
        height: '100%',
        // objectFit: 'cover',
        objectFit: 'contains',
        objectPosition: 'center center',
        borderRadius: '5px',
    },

    detail_card:{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',        
        // flex: '0 0 70%',
        padding: '22px 15px',
        background: '#ffffff',
        width: '100%'
    },

    card_content:{
        marginBottom: '15px',
        color: '#bcbcbc',
        hyphens: 'auto',
    },

    liste_price:{
        marginTop: '20px',
        display: 'flex',
        boxSizing: 'border-box',
        outline: 'none',
    },

    liste_price_li:{
        margin: '0 10px',
        fontSize: '14px',
        listStyle: 'none',
        display: 'inline-block',
    },


    liste_price_content:{
        float: 'left',
        marginTop: '20px',  
        margin: '0',
        padding: '0',
        display: 'inline-block',      
    },

    icons_fa:{
        display: 'inline-block',
        font: 'normal normal normal 14px/1 FontAwesome',
        fontSize: 'inherit',
        textRendering: 'auto',
        color: '#01B9B7',
        marginRight: '5px',
    },

    liste_price_item: {
        paddingLeft: '10%',
        borderLeft: '1px solid #CFD3DE',
        paddingTop: '0',
        width: '45%'
    },

    liste_temps_item: {
        paddingRight: '10%',
        paddingTop: '0',
        width: '45%'
    },

    picto: {
        height: '80px',
        width: '80px',
        marginRight: '1%',
        whiteSpace: 'wrap',
        zIndex:'10',
        marginTop: '-3rem',
    },
    modal: {
        backgroundColor: 'rgba(244, 244, 246, 0.5)',
        borderRadius: '15px',
        height: '70%'
    },
    modalMask: {
        backgroundColor: "rgba(133, 187, 197, 0.6)"
    }
}
