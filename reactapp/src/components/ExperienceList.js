import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RedButton from './RedButton';
import { Cascader, notification } from 'antd'
/* TESTTTTT*/
const ExperienceList = (props) => {
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

    /* MAP SUR EXPERIENCES LIST ___________*/
    var ExperienceListing = [];
    if (props.experiences) {
        ExperienceListing = props.experiences.map((experience, i) => {
            var pictos = experience.tags.map((image, j) => {
                return (<img key={j} style={styles.picto} src={`images/pictos/${image}-8.png`} alt={image} />)
            })
            return (
                
                //Container
                <div key={i} style={styles.single_destinations}> 
                    <div> 
                        <div style={styles.image_card}>
                            <h4 style={styles.h4}>{experience.subtitle}</h4>
                            <img style={styles.image} src={ experience.description.imageBannerUrl ? experience.description.imageBannerUrl : "images/photo-526x360.png" } alt="list" />
                        </div>
                        <div style={{ width: '100%',backgroundColor: 'white',display:'flex', flexWrap:'nowrap', padding:'1rem'}}>
                            { pictos }
                        </div>
                        <div style={styles.detail_card}>
                            <div style={styles.detail_card_grid}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems:'flex-start'}}>
                                    <p style={{ color: 'grey', marginBottom: '8px' }}>
                                    <img style={{ marginRight: '4px' }} src="images/icone-geo.png" alt="map" />{experience.region}</p>
                                    <h5 style={styles.h5}>à {experience.city}</h5>
                                </div>
                            </div>


                            <div style={styles.detail_title_location}>
                                    <Link
                                    style={styles.h3}
                                    to={{
                                        pathname: `/partenaire/${experience._id}`,
                                        state: {
                                            experience: experience
                                        }
                                    }}>
                                    </Link>
                                    <Link
                                    style={styles.h4}
                                    to={{
                                        pathname: `/partenaire/${experience._id}`,
                                        state: {
                                            experience: experience
                                        }
                                    }}>
                                        <h3 style={styles.h3}>{experience.name}</h3>

                                    </Link>
                            </div>
                            <div style={styles.liste_price}>
                                <div style={styles.liste_temps_item}>
                                    <p>Temps</p>
                                    <h5 style={styles.h5}>{experience.activityTime}</h5>
                                </div>
                                <div style={styles.liste_price_item}>
                                    <p>Prix</p>
                                    <h5 style={styles.h5}>{experience.budget}</h5>
                                </div>
                            </div> 
                            <div style={{ textAlign: 'center', margin:'1rem', bottom:'0' }}>
                                <h4 style={styles.h5}>Ajouter cette experience à votre voyage</h4>
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
            )
        })
    }
    return (
        <div style={ styles.experiences_list_area }>
            {ExperienceListing}
            
        </div>
    )
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
    return { experiences: state.experiences, region: state.region, user: state.user, roadplanner: state.roadplanner }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(ExperienceList);




let styles = {

    // CARD - TITLE//

    h3: {
        fontWeight: 'bold',
        fontSize: '20px',
        color: '#106271',
        textDecoration: 'none',
        margin:'1rem',
    },

    h4: {
        fontSize: '14px',
        color: '#fff',
        textDecoration: 'none',
        textAlign: 'center',
        fontWeight: 'bold',
        // backgroundColor: '#e06868',
        margin:'1rem',
    },

    h5: {
        fontSize: '16px',
        color: 'grey',
        textDecoration: 'none',
    },

    // CARD - CSS //

    experiences_list_area: {
        display: 'grid',
        boxSizing: 'border-box',
        outline: 'none',
        paddingLeft: '7rem',
        paddingRight: '7rem',
        gridTemplateColumns: 'repeat(3, 1fr)',
    },

    detail_title_location: {
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        // minHeight: '100px',
        padding:'.5rem',
    },

    single_destinations: {
        display: 'flex',
        flexWrap: 'wrap',
        border: '1px solid #CFD3DE',
        boxShadow: '0px 3px 9px #071c551f',
        borderRadius: '7px',
        position: 'relative',
        overflow: 'hidden',
        margin: '.5rem',
    },

    image_card: {
        position: 'relative',
        background: '#106271',
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        minHeight: '200px',
        borderRadius: '5px',
    },

    detail_card_grid:{
        display: 'grid',
        gridTemplateColumns: '60% 40%',
    },

    image: {
        width: '100%',
        height: '300px',
        // maxHeight: '300px',

        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: '5px',
        zIndex: '10',
    },

    detail_card: {
        display: 'grid',
        padding: '0 1rem 1rem 1rem',
        gridTemplateColumns: '2fr, 1fr',
        flex: '0 0 100%',
        background: '#ffffff',
    },

    card_content: {
        marginBottom: '15px',
        color: '#bcbcbc',
        hyphens: 'auto',
    },

    liste_price: {
        // marginBottom: '100px',
        display: 'flex',
        boxSizing: 'border-box',
        outline: 'none',
        justifyContent: 'center'
    },

    liste_price_li: {
        margin: '0 10px',
        fontSize: '14px',
        listStyle: 'none',
        display: 'inline-block',
    },

    liste_price_content: {
        float: 'left',
        marginTop: '20px',
        margin: '0',
        padding: '0',
        display: 'inline-block',
    },

    icons_fa: {
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
        width: '45%',
        textAlign:'center',
    },

    liste_temps_item: {
        paddingRight: '10%',
        paddingTop: '0',
        width: '45%',
        textAlign:'center',
    },

    picto: {
        height: '80px',
        width: '80px',
        marginRight: '1%',
        whiteSpace: 'wrap',
        zIndex:'10',
        marginTop: '-3rem',
    },
    
    display_inline: {
        display: 'inline-flex',
    },

    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
}
