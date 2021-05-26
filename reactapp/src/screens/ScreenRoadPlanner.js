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

    //FUNCTIONS
    const getTotal = (arr) => {
        return arr.reduce((a, c) => { return a + c.advantageAmount }, 0);
    }

    return (
        <div>
            <Nav />

            <div style={styles.container}>
                <div style={ styles.map }>
                    <Map mode='roadplanner'></Map>
                </div>

                <div style={styles.list}>
                    <div style={styles.avantage}>
                        { warning }
                        <h3>Vous avez cumulé <span>{total}</span>€ d'avantages dans votre séléction!</h3>
                        <RedButton title='Achetez votre Neopass pour 60€'></RedButton>
                        <Popover content={content} >
                            <FontAwesomeIcon size='2x' icon={faInfoCircle} style={{marginLeft:'2%'}}/>
                        </Popover>
                    </div>

                    <div style={styles.experiences_list_area}>
                        {cards}
                    </div>
                </div>
            </div>
        </div>
    )
};


function mapStateToProps(state) {
    return { user: state.user, roadplanner: state.roadplanner }
}

export default connect(
    mapStateToProps,
    null
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
        gridTemplateRows: '15% 85%',
        flexWrap: 'wrap',
        height: '100vh'
    },

    col_xl_9: {
        position: 'relative',
        width: '100%',
        minHeight: '.1rem',
        paddingRight: '1.5rem',
        paddingLeft: '1.5rem',
    },

    avantage:{
        textAlign: 'center',
        color: '#fff',
        width: '65%',
        padding: '.5rem',
        margin: '1rem',
        borderRadius: '0.7rem',
        border: '2px solid #e06868',
        alignSelf: 'center',
        justifySelf: 'center'
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
    }

}
