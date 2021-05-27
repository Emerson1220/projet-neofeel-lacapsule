import React, { useState } from 'react';
import '../styles/popover.css'
import '../App.css';
import { Link } from 'react-router-dom';

//REDUX
import { connect } from 'react-redux';

//UI
import { Menu, notification, Dropdown, Button, Modal  } from 'antd';
import { DownOutlined } from '@ant-design/icons'
import RedButton from './RedButton';

const { SubMenu } = Menu;

const PopoverContent = (props) => {
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
                props.addRoadtripToUser(response.roadtrip);
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

    //DISPLAY
    const { experience } = props;

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
    

    let addContent = <></>
    if (props.mode === 'search') {
        addContent = 
            <div style={{ textAlign: 'center', width: '60%',height: '100%', paddingLeft: '1%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h4 style={styles.h4}>Ajouter cette experience à un voyage</h4>
                <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                    <Dropdown overlay={ menu }>
                        <Button>
                            Sélectionnez un voyage <DownOutlined />
                        </Button>
                    </Dropdown>
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
                    <h4 style={styles.h4}>  {experience.city}</h4>
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
            <Modal
            title="Choisissez un nom pour votre nouveau voyage!"
            visible={ visible }
            onOK={ toggleModal }
            onCancel={ toggleModal }
            footer={ null }
            bodyStyle={ styles.modal }>
                    <input name="name" type='text' style={ styles.input } value={ newTripName } onChange={ (e)=>setNewTripName(e.target.value) } placeholder='mon prochain voyage'></input>
                    <RedButton title="+" onSelect={ ()=>createNewTrip(newTripExperience, newTripName) }/>
            </Modal>
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
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: '5px',
    },

    detail_title_location:{
        padding:'0.8rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        boxSizing: 'border-box'
    },

    detail_card:{
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        width: '45%',
        paddingRight: '0.8rem',
        paddingLeft: '0.8rem',
        paddingBottom: '0.5rem',
        boxSizing: 'border-box'
    },

    detail_roadplanner_card:{
        display: 'flex',
        background: '#ffffff',
        width: '100%',
        paddingRight: '0.8rem',
        paddingLeft: '0.8rem',
        paddingBottom: '0.5rem',
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
        height: '70px',
        width: '70px',
        marginRight: '1%',
        whiteSpace: 'wrap',
        zIndex:'10',
        marginTop: '-2rem',
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

    input: {
        border: '2px solid #e06868',
        color: 'black',
        width: '80%'
    },

    modal: {
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

