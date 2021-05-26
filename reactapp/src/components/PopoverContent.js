import React, { useState } from 'react';
import '../styles/popover.css'
import '../App.css';
import { Link } from 'react-router-dom';
//REDUX
import { connect } from 'react-redux';

//UI
import { Cascader, notification  } from 'antd';
import RedButton from './RedButton';

const PopoverContent = (props) => {
    const [voyageSelect, setVoyageSelect] = useState('');

    //CASCADER
    let options = [
        {
            value: 'new',
            label: 'Mon voyage'
        }
    ]
    
    if (props.user.roadtrips) { 
        let userTrips = props.user.roadtrips.filter(e => e.type !== 'admin').map(e => {
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
            props.newRoadplanner(response.roadtrip._id, experience);
            props.addRoadtripToUser(response.roadtrip)
            openNotification('success', 'Voyage enregistré!');
        } else {
            openNotification('error', "Votre voyage n'a pas pu être crée. Veuillez réessayer.")
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
            openNotification('success', 'Expérience ajouté');
        } else if (response.message === 'already exists') {
            openNotification('warning', 'Votre voyage contient déjà cette expérience.')
        } else {
            openNotification('error', "L'ajout d'expérience n'a pas pu aboutir. Veuillez réessayer.")
        }
    }

    //FUNCTIONS
    const chooseExperience = async(experience) => {
        if (props.user.token) {
            voyageSelect[0] === 'new' ? createNewTrip(experience) : addExperienceToTrip(experience);
        } else {
            !props.roadplanner.experiences || props.roadplanner.experiences.length === 0 ? props.newRoadplanner('temp', experience) : props.addExperience('temp', experience) ;
            openNotification('warning', 'Expérience ajoutée. Connectez-vous pour sauvegarder votre voyage.');
        }
    }

    const openNotification = (type, message) => {
        notification[type] ({
            description: message,
            placement: 'bottomRight'
        })
    };

    //DISPLAY
    let experience = props.experience;

    let addContent = <></>
    if (props.mode === 'search') {
        addContent = 
            <div style={{ textAlign: 'center', width: '50%',height: '100%', paddingLeft: '1%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h4 style={styles.h4}>Ajouter cette experience à un voyage</h4>
                <div style={{ display: 'flex', width: '100%', alignItems: 'center'}}>
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

    return (
        <div style={styles.single_destinations}> 
            <div style={styles.image_card}>
                <img style={styles.image} src={ experience.description.imageBannerUrl ? experience.description.imageBannerUrl : "images/photo-526x360.png" } alt="list" />
            </div>
            <div style={{ width: '100%',backgroundColor: 'white',display:'flex', flexWrap:'nowrap' }}>
                {experience.tags.map((image, j) => {
                    return (<img key={j} style={styles.picto} src={`images/pictos/${image}-8.png`} alt={image} />)
                }) }
            </div>
            <div style={styles.detail_title_location}>
                <div>
                    <Link
                    to={{
                        pathname: `/partenaire/${experience._id}`,
                        state: {
                            experience: experience
                        }
                    }}>
                        <h3 style={ styles.h3 }>{experience.name}</h3>
                    </Link>
                    <Link
                    to={{
                        pathname: `/partenaire/${experience._id}`,
                        state: {
                            experience: experience
                        }
                    }}>
                        <h4 style={ styles.h4 }>{experience.subtitle}</h4>
                    </Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems:'flex-end' }}>
                    <p style={{ color: '#e06868', marginBottom: '8px' }}>
                    <img style={{ marginRight: '4px', alignSelf: 'end' }} src="images/icone-geo.png" alt="map" />{experience.region}</p>
                    <h4 ><Link style={styles.h4} to="/">{experience.city}</Link></h4>
                </div>
            </div>
            <div style ={{ display: 'flex', width: '100%' }}>
                <div style={ props.mode === 'search'? styles.detail_card : styles.detail_roadplanner_card }>
                        <div style={props.mode === 'roadplanner' ? styles.liste_temps_item_roadplanner : styles.liste_temps_item}>
                            <p style={ styles.subtitle }>Temps</p>
                            <p style={ styles.p }>{experience.activityTime}</p>
                        </div>
                        <div style={styles.liste_price_item}>
                            <p style={ styles.subtitle }>Prix</p>
                            <p style={ styles.p }>{experience.budget}</p>
                        </div>
                </div>
                { addContent }
            </div>
    </div>
);

}

function mapDispatchToProps(dispatch) {
    return {
        newRoadplanner: function(roadtripID, experience) {
            dispatch({ 
                type: 'newRoadplanner',
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
    return {
        experiences: state.experiences, 
        region: state.region,
        user: state.user,
        roadplanner: state.roadplanner
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PopoverContent)

let styles = {

    // CARD - TITLE//

    h3: {
        fontWeight: 'bold',
        color: '#106271',
        textDecoration: 'none',
    },

    h4: {
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
        width: '35vw',
        height: '50vh',
        maxWidth: '550px',
        maxHeight: '450px'
    },

    image_card:{
        position: 'relative',
        background: '#fff',
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        maxHeight: '45%',
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
        padding:'0rem 0.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },

    detail_card:{
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        width: '45%',
        paddingRight: '2%',
        paddingLeft: '2%'
    },

    detail_roadplanner_card:{
        display: 'flex',
        background: '#ffffff',
        width: '100%',
        paddingRight: '2%',
        paddingLeft: '2%',
        marginBottom: '1rem'
    },

    liste_price_item: {
        paddingTop: '0',
        width: '100%',
        color:'grey',
        textAlign: 'center',

    },

    liste_temps_item_roadplanner: {
        paddingTop: '0',
        width: '100%',
        color:'grey',
        textAlign: 'center',
        borderRight: '1px solid #CFD3DE',
    },

    liste_temps_item: {
        paddingTop: '0',
        width: '100%',
        color:'grey',
        textAlign: 'center',
        borderBottom: '1px solid #CFD3DE',
    },

    picto: {
        height: '90px',
        width: '90px',
        marginRight: '1%',
        whiteSpace: 'wrap',
        zIndex:'10',
        marginTop: '-3rem',
    },

    subtitle: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 0
    },

    p: {
        margin: 0,
        color:'grey',
        fontWeight: 'bold'
    },

    popover: {
        backgroundColor: 'rgba(244, 244, 246, 0.5)',
        borderRadius: '15px',
        height: '70%'
    },
}

