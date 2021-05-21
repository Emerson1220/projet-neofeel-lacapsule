import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';



//REDUX
import { connect } from 'react-redux';

function CardRoadPlanner(props) {
    console.log(props)

    const deleteBDD = async(data) => {
        let rawResponse = await fetch(`/myroadplanner/${data.roadtripID}/${data.experienceID}`);
        let response = await rawResponse.json();
    }

    var pictos = props.tags.map((image, j) => {
        return (<img key={j} style={styles.picto} src={`images/pictos/${image}-8.png`} alt={image} />)
    })



    return ( 
        <div style={ styles.single_destinations}>
            <div style={ styles.image_card }>
                <img style={ styles.image } src={props.imageBannerUrl} alt="list" />
            </div>
            <div style={ styles.detail_card }>
                <div>
                    <h3><Link style={ styles.h3 } to="/">{props.subtitle}</Link></h3>
                    <h4><Link style={ styles.h4 } to="/">{props.name}</Link></h4>
                </div>
                <div style={{ padding: '2rem' }}>
                    <p style={{ color: '#e06868', marginToop: '2rem'}}><img style={{ marginRight: '4px'}} src="images/icone-geo.png" alt="map" />{props.region}</p>
                    <h4 ><Link style={ styles.h4 }  to="/">{props.city}</Link></h4>
                </div>
                <div style={styles.liste_price}>
                    <div style={styles.liste_temps_item}>
                        <p>Temps</p>
                        <h4>{props.activityTime}</h4>
                    </div>
                    <div style={styles.liste_price_item}>
                        <p>Prix</p>
                        <h4>{props.budget}</h4>
                    </div>
                </div> 
                <div style={styles.liste_price}>
                            {pictos}
                </div> 



                
            </div>
        </div> 
                                
    )
};

let styles = {

    // CSS - ICONS //

    icons_la:{
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

    single_destinations:{
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 0 30px 0',
        border: '1px solid #CFD3DE',
        boxShadow: '0px 3px 9px #071c551f',
        borderRadius: '7px',
        position: 'relative',
        overflow: 'hidden',
        margin: '.5rem',
    },

    image_card:{
        position: 'relative',
        background: '#fff',
        overflow: 'hidden',
        flex: '0 0 30%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        minHeight: '200px',
        borderRadius: '5px',
    },

    image:{
        width: '100%',
        height: '100%',
        // objectFit: 'cover',
        objectFit: 'contains',
        objectPosition: 'center center',
        borderRadius: '5px',
    },

    detail_card:{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',        
        flex: '0 0 70%',
        padding: '22px 15px',
        background: '#ffffff',
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