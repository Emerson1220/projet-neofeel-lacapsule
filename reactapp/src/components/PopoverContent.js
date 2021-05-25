import React, { useState } from 'react';
import '../App.css';
import '../styles/googleMap.css';
import { Link } from 'react-router-dom';

//REDUX
import { connect } from 'react-redux';

//UI
import { Popover, Cascader, message  } from 'antd';
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

    let experience = props.experience;
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
                    style={styles.h3}
                    to={{
                        pathname: `/partenaire/${experience._id}`,
                        state: {
                            experience: experience
                        }
                    }}>
                        <h3 style={{ fontSize: '1.2rem' }}>{experience.name}</h3>
                    </Link>
                    <Link
                    style={styles.h4}
                    to={{
                        pathname: `/partenaire/${experience._id}`,
                        state: {
                            experience: experience
                        }
                    }}>
                        <h4 style={{ margin: 0 }}>{experience.subtitle}</h4>
                    </Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems:'flex-end' }}>
                    <p style={{ color: '#e06868', marginBottom: '8px' }}>
                    <img style={{ marginRight: '4px', alignSelf: 'end' }} src="images/icone-geo.png" alt="map" />{experience.region}</p>
                    <h4 ><Link style={styles.h4} to="/">{experience.city}</Link></h4>
                </div>
            </div>
            <div style ={{ display: 'flex', width: '100%' }}>
                <div style={styles.detail_card}>
                        <div style={styles.liste_temps_item}>
                            <p style={{ marginBottom: '0.3rem'}}>Temps</p>
                            <p style={{ marginBottom: '0.3rem'}}>{experience.activityTime}</p>
                        </div>
                        <div style={styles.liste_price_item}>
                            <p style={{ marginBottom: '0.3rem'}}>Prix</p>
                            <p style={{ marginBottom: '0.3rem'}}>{experience.budget}</p>
                        </div>
                </div>
                <div style={{ textAlign: 'center', width: '100%', paddingLeft: '1%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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

            </div>
    </div>
);

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
    null
)(PopoverContent)

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
        // paddingBottom: 0,
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },

    detail_card:{
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        width: '100%',
        paddingRight: '1%'
    },

    liste_price_item: {
        paddingTop: '0',
        width: '100%',
        color:'grey',
        textAlign: 'center',

    },

    liste_temps_item: {
        paddingTop: '0',
        width: '100%',
        color:'grey',
        textAlign: 'center',
        borderBottom: '1px solid #CFD3DE',
    },

    picto: {
        height: '65px',
        width: '65px',
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

