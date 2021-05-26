/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import '../App.css';

//COMPONENTS
import Nav from '../components/Nav';
import Map from '../components/Map';
import Neopass from '../components/Neopass';
import CardRoadPlanner from '../components/CardRoadPlanner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Popover } from 'antd';
import RedButton from '../components/RedButton'
import { WarningTwoTone } from '@ant-design/icons'


//REDUX
import { connect } from 'react-redux';

function ScreenRoadPlanner(props) {
    //STATE HOOKS
    const [experienceList, setExperienceList] = useState([]);
    const [total, setTotal] = useState(0);
    
    //EFFECT HOOKS
    useEffect(() => {
        setExperienceList(props.roadplanner.experiences)
        if(props.roadplanner.experiences && props.roadplanner.experiences.length > 0) {
            setTotal(getTotal(props.roadplanner.experiences))
        }
    },  [props.roadplanner])

    const content = (
        <div>
            <Neopass/>
        </div>
    );

    let warning = <></>
    if (!props.user.token) {
        warning = <p><span><WarningTwoTone twoToneColor="rgb(224, 104, 104)"/></span><span style={{ color: 'black', marginLeft: '0.3rem'}}>Connectez-vous pour sauvegarder votre voyage.</span></p>
    }
    
    let cards = []
    if (experienceList && experienceList.length > 0) {
        cards = experienceList.map((e, i)=>
    
            <CardRoadPlanner
            key={i}
            experience={ e }
            />
        )
    }

    let menu;
    if (props.user.token) {
        menu = 
        <div style={styles.menu}>
        <div style={{ borderRight: '1px solid grey' }}>
            { warning }
            <h3>Vous avez cumulé <span>{total}</span>€ d'avantages dans votre séléction!</h3>
            <RedButton title='Achetez votre Neopass pour 60€'></RedButton>
            <Popover content={content} >
                <FontAwesomeIcon size='2x' icon={faInfoCircle} style={{marginLeft:'2%'}}/>
            </Popover>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <h3>Mes voyages</h3>
            <select style={ styles.select } placeholder="choisissez un voyage pour l'afficher" onChange={ (e)=>toggleRoadplanner(e.target.value) }>
                { props.user.roadtrips.filter(e => e.creator === props.user._id).map(e => {
                    return <option value={ e._id }>{ e.name }</option>
                }) }
            </select>
        </div>
    </div>
    } else {
        menu =                     
        <div style={styles.menu_temp}>
        <div>
            { warning }
            <h3>Vous avez cumulé <span>{total}</span>€ d'avantages dans votre séléction!</h3>
            <RedButton title='Achetez votre Neopass pour 60€'></RedButton>
            <Popover content={content} >
                <FontAwesomeIcon size='2x' icon={faInfoCircle} style={{marginLeft:'2%'}}/>
            </Popover>
        </div>
    </div>
    }

    //FUNCTIONS
    const getTotal = arr => {
        return arr.reduce((a, c) => { return a + c.advantageAmount }, 0);
    }

    const toggleRoadplanner = value => {
        let roadtripSelect = props.user.roadtrips.find(e => e._id === value );
        let roadtripLoad = {
            id: value,
            experiences: roadtripSelect.days[0].experiences,
            name: roadtripSelect.name
        };
        props.toggleRoadplanner(roadtripLoad);
    }


    return (
        <div>
            <Nav />

            <div style={styles.container}>
                <div style={ styles.map }>
                    <Map mode='roadplanner'></Map>
                </div>

                <div style={styles.list}>
                    { menu }
                    <div style={styles.experiences_list_area}>
                        {cards}
                    </div>
                </div>
            </div>
        </div>
    )
};

function mapDispatchToProps(dispatch) {
    return {
        toggleRoadplanner: function(roadplanner) {
            dispatch({ type: 'toggleRoadplanner', roadplanner: roadplanner })
        }
    }
}

function mapStateToProps(state) {
    return { user: state.user, roadplanner: state.roadplanner }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenRoadPlanner);

let styles = {

    // CSS - ARCHITECTURE nf//

    container: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '50% 50%',
        height: '100%'
    },

    map:{
        display: 'flex',
        overflow: 'hidden',
        height:'100vh',
        width:'100%',
        },

    list:{
        display: 'grid',
        gridTemplateRows: '20% 80%',
        flexWrap: 'wrap',
        height: '100%'
    },

    col_xl_9: {
        position: 'relative',
        width: '100%',
        minHeight: '.1rem',
        paddingRight: '1.5rem',
        paddingLeft: '1.5rem',
    },

    menu:{
        textAlign: 'center',
        color: '#fff',
        width: '95%',
        padding: '.5rem',
        margin: '1rem',
        borderRadius: '0.7rem',
        border: '2px solid #e06868',
        alignSelf: 'center',
        justifySelf: 'center',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr'
    },

    menu_temp:{
        textAlign: 'center',
        color: '#fff',
        width: '95%',
        padding: '.5rem',
        margin: '1rem',
        borderRadius: '0.7rem',
        border: '2px solid #e06868',
        alignSelf: 'center',
        justifySelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    experiences_list_area: {
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        boxSizing: 'border-box',
        outline: 'none',
        overflow: 'scroll', 
        '::-webkit-scrollbar' : {
            display: 'none'
        }
    },

    select: {
        border: '2px solid #e06868',
        color: 'black',
        width: '60%'
    }

}
