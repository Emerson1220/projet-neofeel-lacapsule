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
        setWeather(getWeather(props.coordinate))
    }, [props.coordinate])

    //HTTP REQUESTS
    const deleteExperienceDB = async(experienceID) => {
        let rawResponse = await fetch(`/myroadplanner/${props.roadplanner.id}/${experienceID}`);
        let response = await rawResponse.json();
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
        if (props.user.token) {
            deleteExperienceDB(experienceID)
        } else {
            props.deleteExperience(experienceID)
        }
    }


    //DISPLAY
    var pictos = props.tags.map((image, j) => {
        return (<img key={j} style={styles.liste_pictos} src={`images/pictos/${image}-8.png`} alt={image} />)
    })

    return ( 
        <div style={ styles.single_destinations}>
            <div style={ styles.card_banniere }>

                <div style={ styles.image_card }>
                    <img style={ styles.image } src={props.imageBannerUrl} alt="list" />
                </div>


                <div style={ styles.detail_card }>
                    <div>
                        <div style={styles.liste_pictos}>
                            {pictos}
                        </div>
                        <div>
                            <FontAwesomeIcon size='2x' icon={faTrashAlt} onClick={ ()=>deleteExperience() } />
                        </div>
                        <h3 style={ styles.padding_top } ><Link style={ styles.h3 } to="/">{props.subtitle}</Link></h3>
                        <h4><Link style={ styles.h4 } to="/">{props.name}</Link></h4>
                    </div>

                    <div style={ styles.title_location }>
                        <h4 style={ styles.items_title_location }><img style={{marginRight:'.5rem'}} src="images/icone-geo.png" alt="map" />{props.region}</h4>
                        <h4 style={ styles.items_title_location }>{props.city}</h4>
                    </div>

                    <div style={styles.liste_price}>
                        <div style={styles.liste_time_item}>
                            <p>Durée:</p>
                            <p>{props.activityTime}</p>
                        </div>
                        <div style={styles.liste_price_item}>
                            <p>Prix:</p>
                            <p>{props.budget}</p>
                        </div>
                        <div style={styles.liste_weather_item}>
                            <p>Méteo</p>
                            <img src={ `http://openweathermap.org/img/wn/${weather.icon}@2x.png` } alt="picto météo" style={ styles.picto_weather }/>
                            <p>{ weather.temp }</p>
                            <p>{ weather.desc }</p>                         
                        </div>

                    </div> 
                </div>
            </div>
        </div> 
                                
    )
};

function mapDispatchToProps(dispatch) {
    return {
        deleteExperience: function(data) {
            dispatch({ type: 'deleteExperience', data: data })
        }
    }
}

function mapStateToProps(state) {
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
        boxSizing: 'border-box',
    },

    card_banniere:{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
    },

    image_card:{
        display: 'grid',
        gridTemplateRows: 'repeat(1, 1fr)',        
        position: 'relative',
        background: '#fff',
        overflow: 'hidden',
        borderRadius: '5px',
    },

    image:{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: '.4rem',
    },

    title_location:{
        display:'flex', 
        flexDirection: 'columns',
    },

    detail_card:{
        display: 'grid',
        gridTemplateColumns: '1fr',        
        padding: '.5rem',
    },

    liste_pictos:{
        width: '30%',
        display: 'flex',
        flexWrap: 'nowrap',
        marginTop: '-.8rem'
    },

    liste_price:{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',        
        marginTop: '1rem',
    },

    liste_time_item:{
        paddingLeft: '.5rem',
        borderRight: '1px solid #CFD3DE',
        paddingTop: '0', 
        color:'grey',
        textAlign:'center',
        fontWeight: 'bold',
    },

    liste_price_item:{
        paddingLeft: '.5rem',
        borderLeft: '1px solid #CFD3DE',
        paddingTop: '0',
        color:'grey',
        textAlign:'center',
        fontWeight: 'bold',
    },

    liste_weather_item:{
        textAlign:'center',
        color:'grey',
        borderLeft: '1px solid #CFD3DE',
        fontWeight: 'bold',


    },

    picto_weather: {
        height: '40px'
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

    items_title_location:{
        color: 'grey', 
        marginRight: '1rem',
    },

}        