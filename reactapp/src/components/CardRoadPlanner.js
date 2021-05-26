import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
//UI
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
//REDUX
import { connect } from 'react-redux';

function CardRoadPlanner(props) {
    //STATE HOOKS
    const [weather, setWeather] = useState({});

    //EFFECT HOOKS
    useEffect(()=> {
        setWeather(getWeather(props.experience.coordinate))
    }, [props.experience.coordinate])

    //HTTP REQUESTS
    const deleteExperienceDB = async(experienceID) => {
        let rawResponse = await fetch(`/myroadplanner/${props.user.token}/${props.roadplanner.id}/${experienceID}`,
            {method: 'DELETE'
        });
        let response = await rawResponse.json();
        console.log(response)
            if(response.result === true) {
                props.deleteExperience(experienceID)
            }
    }

    const getWeather = async(data) => {
        const api_key = '4810d2c7945fe82541e351ffa914d368';
        
        let rawResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${api_key}&units=metric&lang=fr`);
        let response = await rawResponse.json();

        setWeather({
            temp: response.main.temp,
            desc: response.weather[0].description,
            icon: response.weather[0].icon
        })
    }
        
    //FUNCTIONS
    const deleteExperience = experienceID => {
        console.log('click')
        if (props.user.token) {
            deleteExperienceDB(experienceID)
        } else {
            props.deleteExperience(experienceID)
        }
    }


    //DISPLAY
    const { experience } = props;

    var pictos = experience.tags.map((image, j) => {
        return (<img key={j} style={styles.liste_pictos} src={`images/pictos/${image}-8.png`} alt={image} />)
    })


    return ( 
        <div style={ styles.single_destinations }>

            <div style={ styles.image_card }>
                <img style={ styles.image } src={experience.description.imageBannerUrl} alt="list" />
            </div>


            <div style={ styles.detail_card }>
                <div>
                    <div style={styles.liste_pictos_header}>
                        <div style={styles.liste_pictos}>
                            {pictos}
                        </div>
                        <div style={styles.liste_pictos_trash}>
                            <FontAwesomeIcon icon={faTrashAlt} onClick={ ()=>deleteExperience(experience._id) } />
                        </div>
                    </div>
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

                <div style={ styles.title_location }>
                    <h4 style={ styles.items_title_location }><img style={{marginRight:'.5rem'}} src="images/icone-geo.png" alt="map" />{experience.region}</h4>
                    <h4 style={ styles.items_title_location }>{experience.city}</h4>
                </div>

                <div style={styles.liste_avantage}>
                    <p style={ styles.p_white }>Votre avantage Neopass</p>
                    <h4 style={ styles.h4_white }>{experience.advantage}</h4>
                </div>

                <div style={styles.liste_info}>
                    <div style={styles.liste_item}>
                        <p style={ styles.subtitle }>Durée</p>
                        <div style={ styles.infoContainer }>
                            <p style={ styles.p }>{experience.activityTime}</p>
                        </div>
                    </div>
                    <div style={styles.liste_item_center}>
                        <p style={ styles.subtitle }>Prix</p>
                        <div style={ styles.infoContainer }>
                            <p style={ styles.p }>{experience.budget}</p>
                        </div>
                    </div>
                    <div style={styles.liste_item}>
                        <p  style={ styles.subtitle }>Méteo</p>
                        <div style={ styles.infoWeatherContainer }>
                            <img src={ `http://openweathermap.org/img/wn/${weather.icon}@2x.png` } alt="picto météo" style={ styles.picto_weather }/>
                            <div>
                                <p style={ styles.p }>{ weather.temp }° C</p>
                                <p style={ styles.p }>{ weather.desc }</p>                         
                            </div>
                        </div>
                    </div>

                </div> 
            </div>
        </div> 
                                
    )
};

function mapDispatchToProps(dispatch) {
    return {
        deleteExperience: function(experienceID) {
            dispatch({ type: 'deleteExperience', experienceID: experienceID })
        }
    }
}

function mapStateToProps(state) {
    console.log(state)
    return { user: state.user, roadplanner: state.roadplanner }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardRoadPlanner);

let styles = {

    single_destinations:{
        flexWrap: 'wrap',
        margin: '1rem',
        border: '.1rem solid #CFD3DE',
        boxShadow: '0 .3rem .9rem #071c551f',
        borderRadius: '.5rem',
        position: 'relative',
        maxHeight: '320px',
        boxSizing: 'border-box',        
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
    },

    image_card:{
        background: '#fff',
        overflow: 'hidden',
        borderTopLeftRadius: '.5rem',
        borderBottomLeftRadius: '.5rem',
        height: '100%',
        borderBottom: '.1rem solid #CFD3DE',
    },

    image:{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        overflow: 'hidden'
    },

    title_location:{
        display:'flex', 
        flexDirection: 'columns',
    },

    liste_avantage:{
        textAlign: 'center',
        marginBottom: '.5rem',
        background: '#106170'
    },

    detail_card:{
        display: 'grid',
        gridTemplateColumns: '1fr',        
        padding: '.5rem',
        height: '100%',
        boxSizing: 'border-box',
        maxHeight: '100%'
    },

    liste_pictos_header:{
        display: 'grid',
        gridTemplateColumns: '2fr 40px',        

    },

    liste_pictos:{
        width: '35%',
        display: 'flex',
        flexWrap: 'nowrap',
        marginTop: '-.8rem',
    },

    liste_pictos_trash:{
        color:'#e06868',
        textAlign:'right',
        cursor: 'pointer'
    },

    liste_info:{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',        
        boxSizing: 'border-box',
    },

    liste_item: {
        display: 'grid',
        gridTemplateRows: '20% 80%',
        boxSizing: 'border-box'
    },

    liste_item_center: {
        borderRight: '1px solid #CFD3DE',
        borderLeft: '1px solid #CFD3DE',
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateRows: '20% 80%',
    },

    picto_weather: {
        height: '40px'
    },

    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace: 'wrap',
        flexWrap: 'wrap',
        textAlign: 'center'
    },

    infoWeatherContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        whiteSpace: 'wrap',
        flexWrap: 'wrap',
        textAlign: 'center'
    },

    // CARD - TITLE//

    h3: {
        fontWeight: 'bold',
        color: '#106271',
        textDecoration: 'none',
    },

    padding_top: {
        paddingTop: '.5rem',
    },

    h4: {
        color: '#e06868',
        textDecoration: 'none',
    },

    p: {
        margin: 0,
        color:'grey',
        fontWeight: 'bold'
    },

    h4_white: {
        color: '#fff',
        textDecoration: 'none',
    },

    p_white: {
        margin: 0,
        color:'#fff',
        fontWeight: 'bold'
    },

    items_title_location:{
        color: 'grey', 
        marginRight: '1rem',
    },

    subtitle: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        margin: 0
    }
}        