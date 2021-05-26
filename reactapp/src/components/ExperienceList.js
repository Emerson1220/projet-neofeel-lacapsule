import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RedButton from './RedButton';
import { Cascader, notification, Modal } from 'antd'
/* TESTTTTT*/
const ExperienceList = (props) => {
    const [voyageSelect, setVoyageSelect] = useState('');
    const [visible, setVisible] = useState(false);
    const [newTripName, setNewTripName] = useState('');
    const [newTripExperience, setNewTripExperience] = useState(null);
    
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

    
    const onChange = value => {
        console.log(value)
        if (value[0] === 'new') {
            setVisible(true);
        } else {
            setVoyageSelect(value)
        }
    };
    
    //HTTP REQUESTS
    const createNewTrip = async (experience) => {
        console.log(experience)
        let region = 'Alsace-Vosges';
        let rawResponse = await fetch('/myroadplanner', {
            method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `token=${props.user.token}&name=${newTripName}&region=${region}&regionCode=${props.region}&experienceID=${experience._id}`
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
        console.log(response)
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
        console.log(experience)
        if (props.user.token) {
            voyageSelect[0] === 'new' ? createNewTrip(experience) : addExperienceToTrip(experience);
        } else {
            !props.roadplanner.experiences || props.roadplanner.experiences.length === 0 ? props.newRoadplanner('temp', experience) : props.addExperience('temp', experience) ;
            openNotification('warning', 'Expérience ajoutée. Connectez-vous pour sauvegarder votre voyage.');
        }
    }

    // const chooseTripName = () => {
    //     voyageSelect
    // }

    const toggleModal = () => {
        setVisible(!visible);
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
                    {/* Card 1 */}
                    <div> 
                        <div style={styles.image_card}>
                            <img style={styles.image} src={ experience.description.imageBannerUrl ? experience.description.imageBannerUrl : "images/photo-526x360.png" } alt="list" />
                        </div>
                        <div style={{ width: '100%',backgroundColor: 'white',display:'flex', flexWrap:'nowrap', padding:'1rem'}}>
                            { pictos }
                        </div>
                        <div style={styles.detail_card}>
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
                                    <h4 ><Link style={styles.h4} to="/">{experience.city}</Link></h4>
                                </div>
                            </div>
                            <div style={styles.liste_price}>
                                <div style={styles.liste_temps_item}>
                                    <p>Temps</p>
                                    <h2>{experience.activityTime}</h2>
                                </div>
                                <div style={styles.liste_price_item}>
                                    <p>Prix</p>
                                    <h2>{experience.budget}</h2>
                                </div>
                            </div> 
                            <div style={{ textAlign: 'center', marginTop:'1rem' }}>
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
                    </div>

                </div>
            )
        })
    }
    return (
        <div style={ styles.experiences_list_area }>
            {ExperienceListing}
            <Modal
            title="Choisissez un nom pour votre nouveau voyage!"
            visible={ visible }
            onOK={ toggleModal }
            onCancel={ toggleModal }
            footer={ null }>
                <label for='name'>Nom</label>
                <input name="name" type='text' onChange={ (e)=>setNewTripName(e.target.value) }></input>
                <RedButton title="Confirm"/>
            </Modal>
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
    console.log(state)
    return { experiences: state.experiences, region: state.region, user: state.user, roadplanner: state.roadplanner }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(ExperienceList);




let styles = {
    // CSS - ICONS //

    icons_la: {
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
        color: '#e06868',
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
        gridTemplateColumns: 'repeat(2, 1fr)',
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
        //old
        // flex: '0 0 30%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        minHeight: '200px',
        borderRadius: '5px',
    },

    image: {
        width: '100%',
        maxHeight: '300px',
        objectFit: 'cover',
        objectPosition: 'center center',
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
        marginTop: '20px',
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
    
    display_inline: {
        display: 'inline-flex',
    },

    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
}
