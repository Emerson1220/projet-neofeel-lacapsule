import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';


//REDUX
import { connect } from 'react-redux';

function CardRoadPlanner(props) {

    let roadplanner = props.roadplanner;

    const deleteBDD = async(data) => {
        let rawResponse = await fetch(`/myroadplanner/${data.roadtripID}/${data.experienceID}`);
        let response = await rawResponse.json();
    }

    const [experiences, setExperience] = useState([]);


    var selectExperience = async (experience) => {
        let rawResponse = await fetch('/roadtrips/60a4d8695e61b2c452d97b78', {
            method: 'DELETE',
        })
        let response = await rawResponse.json();
    }


    return ( 
        <div style={ styles.single_destinations}>
            <div style={ styles.image_card }>
                <img style={ styles.image } src="images/photo-526x360.png" alt="list" />
            </div>
            <div style={ styles.detail_card }>
                <div>
                    <h3><Link style={ styles.h3 } to="/">Activité</Link></h3>
                    <h4><Link style={ styles.h4 } to="/">Nom du partenaire</Link></h4>
                </div>
                <div style={ styles.display_inline}>
                    <p style={{ color: '#e06868', marginBottom: '8px'}}><img style={{ marginRight: '4px'}} src="images/icone-geo.png" alt="map" />Région</p>
                    <h4 ><Link style={ styles.h4 }  to="/">Ville</Link></h4>
                </div>
                {/* <p style={ styles.card_content } >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et.</p> */}
                <div style={ styles.liste_price }>
                    <ul style= { Object.assign(styles.liste_price_content, styles.liste_price_li) }>
                        <li><i style={ styles.icons_fa }/> Temps</li>
                        <li><i style={ styles.icons_fa }/> 2 heures</li>
                    </ul>
                </div>
                <div style={ styles.liste_price_item }>
                    <p>Prix</p>
                    <h2>80 <span>€</span></h2>
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

    h3:{
        fontWeight:'bold',
        fontSize: '28px',
        color: '#106271',
        textDecoration: 'none',
    },

    h4:{
        fontSize: '20px',
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