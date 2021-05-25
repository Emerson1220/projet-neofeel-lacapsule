import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';



//REDUX
import { connect } from 'react-redux';

function CardRoadPlanner(props) {
    //STATE HOOKS
    const [weather, setWeather] = useState({});

    //EFFECT HOOKS
    useEffect(()=> {
        setWeather(getWeather(props.coordinate));
    }, [props.coordinate])

    //HTTP REQUESTS
    const deleteExperienceDB = async(experienceID) => {
        let rawResponse = await fetch(`/myroadplanner/${props.roadplanner.id}/${experienceID}`);
        let response = await rawResponse.json();
            if(response.result === true) {
                props.deleteExperience(experienceID)
            }
    }
        
    //FUNCTIONS
    const deleteExperience = experienceID => {
        if (props.user.token) {
            deleteExperienceDB(experienceID)
        } else {
            props.deleteExperience(experienceID)
        }
    }

    const getWeather = async(data) => {
        const api_key = '4810d2c7945fe82541e351ffa914d368';
        
        let rawResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${api_key}&units=metric&lang=fr`);
        let response = await rawResponse.json();
        console.log(response)
        return {
            temp: response.main.temp,
            desc: response.weather[0].description,
            icon: response.weather[0].icon
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
                <div style={{ padding: '2rem' }}>
                    <p style={{ color: '#e06868', marginToop: '2rem'}}><img style={{ marginRight: '4px'}} src="images/icone-geo.png" alt="map" />{props.region}</p>
                    <h4 ><Link style={ styles.h4 }  to="/">{props.city}</Link></h4>
                    <div style={styles.liste_pictos}>
                        {pictos}
                    </div> 

                </div>


            </div>

            <div style={ styles.detail_card }>
                <div>
                    <h3><Link style={ styles.h3 } to="/">{props.subtitle}</Link></h3>
                    <h4><Link style={ styles.h4 } to="/">{props.name}</Link></h4>
                </div>
                <div style={styles.liste_price}>
                    <div style={styles.liste_price_item}>
                        <p>Temps</p>
                        <h4>{props.activityTime}</h4>
                    </div>
                    <div style={styles.liste_price_item}>
                        <p>Prix</p>
                        <h4>{props.budget}</h4>
                    </div>
                </div> 
            </div>
        </div> 
                                
    )
};

let styles = {

    single_destinations:{
        // display: 'flex',
        flexWrap: 'wrap',
        // margin: '0 0 30px 0',
        border: '1px solid #CFD3DE',
        boxShadow: '0px 3px 9px #071c551f',
        borderRadius: '7px',
        position: 'relative',
        // overflow: 'hidden',
        margin: '.5rem',
        maxHeight: '400px'
    },


    card_banniere:{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',        
    },

    image_card:{
        position: 'relative',
        background: '#fff',
        overflow: 'hidden',
        flex: '0 0 30%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        mHeight: '400px',
        borderRadius: '5px',
    },

    liste_pictos:{
        width: '40%',
        display: 'flex',
        flexWrap: 'nowrap',
        // padding: '1rem',
    },

    detail_card:{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',        
        flex: '0 0 70%',
        padding: '22px 15px',
        background: '#ffffff',
    },




    // CSS - ICONS //

    icons_la:{
        display: 'inline-block',
        position: 'absolute',
        top: '17px',
        left: '20px',
        color: '#CFD3DE',
        font: 'normal 16px/1 LineAwesome',
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
        // fontSize: '18px',
        color: '#e06868',
        textDecoration: 'none',
    },

    // CARD - CSS //

    experiences_list_area:{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',        
        boxSizing: 'border-box',
        outline: 'none',
        paddingLeft: '1rem',
        paddingRight: '1rem',

    },





    image:{
        width: '100%',
        height: '100%',
        objectFit: 'contains',
        objectPosition: 'center center',
        borderRadius: '5px',
    },



    card_content:{
        marginBottom: '15px',
        color: '#bcbcbc',
        hyphens: 'auto',
    },

    liste_price:{
        marginTop: '20px',
        display: 'flex',
        boxSizing: 'border-box',
        outline: 'none',
    },



    liste_price_li:{
        margin: '0 10px',
        fontSize: '14px',
        listStyle: 'none',
        display: 'inline-block',
    },


    liste_price_content:{
        float: 'left',
        marginTop: '20px',  
        margin: '0',
        padding: '0',
        display: 'inline-block',      
    },

    icons_fa:{
        display: 'inline-block',
        font: 'normal normal normal 14px/1 FontAwesome',
        fontSize: 'inherit',
        textRendering: 'auto',
        color: '#01B9B7',
        marginRight: '5px',
    },

    liste_price_item:{
        paddingLeft: '30px',
        marginLeft: '20px',
        borderLeft: '1px solid #CFD3DE',
        paddingTop: '0',    
    },
}        

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