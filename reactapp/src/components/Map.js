import React, { useState, useEffect, useRef } from 'react';
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
import { Modal, Cascader  } from 'antd';
import RedButton from './RedButton';


const Map = (props) => {
    const [experience, setExperience] = useState({ partner: { addresses: [{ city: '' }] }, tags: [], description: {imageBannerUrl:''} })
    const [visible, setVisible] = useState(false);
    const [locations, setLocations] = useState([])

    const google = window.google;

    const [voyageSelect, setVoyageSelect] = useState('');
    const options = [
        {
            value: 'new',
            label: 'Nouveau voyage'
        },
        {
            value: 'saved',
            label: 'Vos voyages',
            children: [
                {
                    value: 'id12345',
                    label: 'Voyage 1'
                },
                {
                    value: 'id23456',
                    label: 'Voyage 2'
                }
            ]
        }
    ];

    function displayRender(label) {
        return label[label.length - 1];
    }

    const onChange = (value) => {
        setVoyageSelect(value)
    };

    const chooseExperience = async(experience) => {
        console.log(voyageSelect[0])
        if (voyageSelect[0] === 'new') {
            createRoadtrip(experience);
        } else {
            addExperience(experience);
        }
    }

    //ajout d'expérience à un voyage existant
    const addExperience = async(experience) => {
        let rawResponse = await fetch('/myroadplanner', {
            method: 'PUT',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `roadtripID=${voyageSelect}&experienceID=${experience._id}`
        })
        let response = await rawResponse.json();
        if (response.result === true) {
            props.onAddExperience(response.roadtrip);
        }
    };

    //création nouveau voyage avec expérience choisie
    const createRoadtrip = async(experience) => {
        if (props.token) {
            let rawResponse = await fetch('/myroadplanner', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `token=${props.token}&name=Mon Voyage en Alsace&region=${props.region}&regionCode=ges&experience=${experience._id}`
            })
        }
        props.onAddExperience(experience);
    }

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
                    <h3><Link style={styles.h3} to="/partenaire">{experience.name}</Link></h3>
                    <h4><Link style={styles.h4} to="/partenaire">{experience.subtitle}</Link></h4>
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
            />
            <RedButton
            title="+"
            onSelect={ ()=>chooseExperience(experience) }/>
        </div>
    </div>
    }

    const showModal = (exp) => {
        console.log(experience)
        setExperience(exp)
        setVisible(!visible);

    };

    const handleCancel = () => {
        setVisible(!visible);
    };




    const LocationPin = (props) => (
        <div className="pin" onClick={() => props.onSelect()}>
            <FontAwesomeIcon icon={faMapMarker} className="pin-icon" />
            <p className="pin-text">{props.text}</p>
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

    //fit map to markers
    const getMapBounds = (locations) => {
        const bounds = new google.maps.LatLngBounds();

        locations.forEach((location) => {
            bounds.extend( new google.maps.LatLng(location.latitude, location.longitude));
        })
        return bounds;
    };

    const bindResizeListener = (map, maps, bounds) => {
        maps.event.addDomListenerOnce(map, 'idle', () => {
            maps.event.addDomListener(window, 'resize', () => {
                map.fitBounds(bounds)
            })
        })
    };

    const apiIsLoaded = (map, maps, locations) => {
        if (map) {
            const bounds = getMapBounds(locations);
            map.fitBounds(bounds);
            bindResizeListener(map, maps, bounds)
        }
    }
    useEffect(() => {
        let locationsArray = props.experiences.map(e => ({ lat: e.coordinate.latitude, lng: e.coordinate.longitude }))
        setLocations(locationsArray)
    }, [props.experiences]);


    let location = {
        address: '',
        lat: 48.816,
        lng: 5.806
    }

    return (
        <div className="map">
            <div className="google-map">
                <GoogleMapReact
                    bootstrapURLKeys={{ 
                        key: 'AIzaSyBvIhotKMqoE6LT2ahjaI1T87LX1zG5Y3s'}}
                    defaultZoom={8}
                    defaultCenter={ location }
                    // yesIWantToUseGoogleMapApiInternals
                    // onGoogleApiLoaded={ ({map, maps}) => apiIsLoaded(map, maps, locations) }
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
        onAddExperience: function(experience) {
            dispatch({ type: 'addExperience', experience: experience })
        }
    }
}

function mapStateToProps(state) {
    console.log(state)
    return { experiences: state.experiences, region: state.region }
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
