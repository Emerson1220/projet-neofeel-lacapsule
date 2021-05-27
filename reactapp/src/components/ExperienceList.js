import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RedButton from './RedButton';
import { Menu, Dropdown, Button, notification, Modal } from 'antd'
import { DownOutlined } from '@ant-design/icons'

const { SubMenu } = Menu;

const ExperienceList = (props) => {
    const [visible, setVisible] = useState(false);
    const [newTripName, setNewTripName] = useState('');
    const [newTripExperience, setNewTripExperience] = useState(null);

    const onMenuClick = ({ key }) => {
        const data = JSON.parse(key)
        if (data[0] === 'temp') {
            !props.roadplanner.experiences || props.roadplanner.experiences.length === 0 ? props.newRoadplanner(data[0], data[1]) : props.addExperience(data[0], data[1]) ;
            openNotification('warning', 'Expérience ajoutée. Connectez-vous pour sauvegarder votre voyage.');
        } else if (data[0] === 'new') {
            setNewTripExperience(data[1]);
            setVisible(true);
        } else {
            addExperienceToTrip(data[0], data[1])
        }
    }
    
    //HTTP REQUESTS
    const createNewTrip = async (experience, name) => {
        setVisible(!visible);
        let rawResponse = await fetch('/myroadplanner', {
            method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `token=${props.user.token}&name=${name}&region=${experience.region}&regionCode=${experience.regionCode}&experienceID=${experience._id}`
            });
            let response = await rawResponse.json();
            if (response.result === true) {
                props.newRoadplanner(response.roadtrip._id, experience);
                props.addRoadtripToUser(response.roadtrip)
                openNotification('success', 'Voyage enregistré!');
                setNewTripName('');
                setNewTripExperience(null);
            } else {
                openNotification('error', "Votre voyage n'a pas pu être crée. Veuillez réessayer.")
            }
        }
        
        const addExperienceToTrip = async(trip, experience) => {
            if (props.user.token) {
                let rawResponse = await fetch('/myroadplanner', {
                method: 'PUT',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `roadtripID=${trip}&experienceID=${experience._id}`
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
    }

    //FUNCTIONS
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
            let menu = (
                <Menu onClick={ onMenuClick }>
                    <Menu.Item key={ JSON.stringify(['temp', experience]) }>Mon voyage</Menu.Item>
                </Menu>
            )
        
            if (props.user.token) {
                let userTrips = (
                    props.user.roadtrips.filter(e => e.type !== 'admin').map(e => <Menu.Item key={ JSON.stringify([e._id, experience]) }>{ e.name }</Menu.Item>)
                )
                menu = (
                    <Menu onClick={ onMenuClick }>
                        <Menu.Item key={ JSON.stringify(['new', experience ]) }>Nouveau voyage</Menu.Item>
                        <SubMenu title="Mes voyages">
                            { userTrips }
                        </SubMenu>
                    </Menu>
                )
            }

            var pictos = experience.tags.map((image, j) => {
                return (<img key={j} style={styles.picto} src={`images/pictos/${image}-8.png`} alt={image} />)
            })
            return (
                
                //Container
                <div key={i} style={styles.single_destinations}> 
                    <div> 
                        <div style={styles.image_card}>
                        <Link
                            to={{
                                pathname: `/partenaire/${experience._id}`,
                                state: {
                                    experience: experience
                                }
                            }}>
                            <h4 style={styles.h4_header}>{experience.subtitle}</h4>
                            <img style={styles.image} src={ experience.description.imageBannerUrl ? experience.description.imageBannerUrl : "images/photo-526x360.png" } alt="list" />
                        </Link>

                        </div>

                        <div style={styles.picto_items} >
                            { pictos }
                        </div>

                        <div style={styles.detail_card}>

                            <div style={styles.card_title}>
                                    <p style={styles.p}>
                                        <img style={{ marginRight: '4px' }} src="images/icone-geo.png" alt="map" />{experience.region}
                                    </p>
                                    
                                    <Link
                                    to={{
                                        pathname: `/partenaire/${experience._id}`,
                                        state: {
                                            experience: experience
                                        }
                                    }}>
                                        <h3 style={styles.h3}>{experience.name}</h3>
                                    </Link>
                            </div>

                            <div style={styles.card_location}>
                                <h5 style={styles.h5}>à {experience.city}</h5>
                            </div>


                            <div style={styles.liste_price}>
                                <div style={styles.liste_temps_item}>
                                    <p style={styles.p_white}>Temps</p>
                                    <h5 style={styles.h5_white}>{experience.activityTime}</h5>
                                </div>
                                <div style={styles.liste_price_item}>
                                    <p style={styles.p_white}>Prix</p>
                                    <h5 style={styles.h5_white}>{experience.budget}</h5>
                                </div>
                            </div> 

                            <div style={{ textAlign: 'center', margin:'1rem', bottom:'0' }}>
                                <h4 style={styles.h5}>Ajouter cette experience à votre voyage</h4>
                                    <Dropdown overlay={ menu }>
                                        <Button>
                                            Sélectionnez un voyage <DownOutlined />
                                        </Button>
                                    </Dropdown>
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
            footer={ null }
            bodyStyle={ styles.modal }>
                    <input name="name" type='text' style={ styles.input } onChange={ (e)=>setNewTripName(e.target.value) } placeholder='mon prochain voyage'></input>
                    <RedButton title="+" onSelect={ ()=>createNewTrip(newTripExperience, newTripName) }/>
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
    return { experiences: state.experiences, region: state.region, user: state.user, roadplanner: state.roadplanner }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(ExperienceList);




let styles = {

    // LISTE CONTAINER  //
    experiences_list_area: {
        display: 'grid',
        boxSizing: 'border-box',
        outline: 'none',
        paddingLeft: '7rem',
        paddingRight: '7rem',
        gridTemplateColumns: 'repeat(3, 1fr)',
    },

    // CARD CONTAINER  //
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

    // CARD - TITLE//
    h3: {
        fontWeight: 'bold',
        fontSize: '18px',
        color: '#106271',
        textDecoration: 'none',
        textAlign:'left',
        textTransform:'uppercase',
        // height:'60px',
    },

    h4_header: {
        fontSize: '16px',
        color: '#fff',
        textDecoration: 'none',
        textAlign: 'center',
        fontWeight: 'bold',
        margin:'1rem',
        height:'40px',
    },

    h4: {
        fontSize: '18px',
        color: '#fff',
        textDecoration: 'none',
        textAlign: 'center',
        fontWeight: 'bold',
        margin:'1rem',
    },

    h5: {
        fontSize: '16px',
        color: 'grey',
        textDecoration: 'none',
    },

    h5_white: {
        fontSize: '14px',
        color: '#fff',
        textDecoration: 'none',
    },

    p:{
        fontSize: '12px',
        color: 'grey',
    },

    p_white:{
        fontSize: '12px',
        color: '#fff',
        marginBottom: '.1rem',
    },

    // CARD HEADER //
    image_card: {
        position: 'relative',
        background: '#106271',
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '200px',
        borderRadius: '5px',
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

    // CARD PICTOS //
    picto_items:{
        width: '100%',
        backgroundColor: 'white',
        display:'flex', 
        flexWrap:'nowrap', 
        padding:'1rem',
    },

    picto: {
        height: '20%',
        width: '20%',
        marginRight: '1%',
        whiteSpace: 'wrap',
        zIndex:'10',
        marginTop: '-3rem',
        objectFit: 'contain',
    },

    // CARD CONTENU //
    detail_card: {
        padding: '0 1rem 1rem 1rem',
    },

    card_title: {
        // padding:'.5rem',
    },

    card_location: {
        display: 'flex', 
        flexDirection: 'column', 
        alignItems:'flex-start',
    },

    // CARD TEMPS & PRIX //
    liste_price: {
        // width: '60%',
        // alignItems: 'center',
        display: 'flex',
        boxSizing: 'border-box',
        outline: 'none',
        justifyContent: 'center',
        backgroundColor: '#e06868',
        borderRadius:'2%',
        padding:'.2rem',
    },

    liste_price_item: {
        paddingLeft: '5%',
        borderLeft: '1px solid #CFD3DE',
        paddingTop: '0',
        width: '80%',
        textAlign:'center',
        color:'#fff',
        fontWeight: 'bold',
    },

    liste_temps_item: {
        paddingRight: '5%',
        paddingTop: '0',
        width: '80%',
        textAlign:'center',
        color:'#fff',
        fontWeight: 'bold',
    },

    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    input: {
        border: '2px solid #e06868',
        color: 'black',
        width: '80%'
    },

    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

}
