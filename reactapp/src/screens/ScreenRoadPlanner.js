/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import '../App.css';


//COMPONENTS
import Nav from '../components/Nav';
import Map from '../components/Map';
import CardRoadPlanner from '../components/CardRoadPlanner';

//REDUX
import { connect } from 'react-redux';

function ScreenRoadPlanner(props) {
    //Etats
    const [experienceList, setExperienceList] = useState([]);

    //EFFECT HOOKS
    useEffect(() =>{
        if(props.roadplanner.experiences) {
            setExperienceList(props.roadplanner.experiences)
        }
    },  [props.roadplanner])
git
    //DISPLAY
    let cards = []
    if (experienceList.length > 0) {
        experienceList.map((e, i)=> 
                <CardRoadPlanner key={i}
                    id={ e._id } 
                    name={e.name} 
                    activity={e.activity} 
                    activityType={e.activityType} 
                    region={e.region}
                    tags={e.tags}
                    subtitle={e.subtitle}
                    activityTime={e.activityTime}
                    budget={e.budget}
                    imageBannerUrl={e.description.imageBannerUrl}
                    city={e.partner.addresses[0].city}
                    coordinate={e.coordinate}
                    >
                </CardRoadPlanner>
        )
    }
    console.log({ cards: cards })

    return (	
        <div>
            <Nav />

            <div style={ styles.container }>
                <div style={{ display: 'flex', justifyContent: 'center', width: '2%' }}>
                    <Map></Map>
                </div>

                <div style={ styles.row }>
                    <div style={ styles.col_xl_9}>                           
                        <div style={{ marginBottom:'40px' }}> {/* Filters */}
                            <div style={ styles.avantage}>
                                <h3>Vous avez cumulé<span> 100€</span> d'avantages dans votre séléction</h3>
                                <button>Achetez votre Neopass pour seulement 60€</button>
                            </div>
                        </div> 
                        
                        <div style={ styles.experiences_list_area }> 
                            {cards}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};


function mapStateToProps(state) {
    console.log(state)
    return { user: state.user, roadplanner: state.roadplanner }
}

export default connect(
    mapStateToProps,
    null
)(ScreenRoadPlanner);

let styles = {

    // CSS - ARCHITECTURE//

    container: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr', 
        paddingTop: '1rem',       
        marginRight: '1rem',
        marginLeft: '1rem',
    },

    row:{
        display: 'flex',
        flexWrap: 'wrap',
        padding: '1rem',
    },

    col_xl_9:{
        position: 'relative',
        width: '100%',
        minHeight: '.1rem',
        paddingRight: '1.5rem',
        paddingLeft: '1.5rem',
        },

        avantage:{
            background: '#e06868',
            textAlign: 'center',
            color: '#fff', 
            width: '100%',
            marginBottom: '1rem', 
            padding: '.5rem',
        },

    single_input_wrap:{
        position: 'relative',
        width: '100%',
        marginBottom: '18px',
        display: 'inline-block',        
    },

    single_input_wrap_input:{
        background: '#ffffff',
        border: '1px solid #EAEAEA',
        height: '52px',
        width: '100%',       
    },

    display_inline:{
        display: 'inline-flex',
    },

    text_align_center:{
        textAlign:'center',
    },

    // CSS - MAP //

    map:{
        width:'50%', 
        height:'auto', 
        position: 'fixed',
        top: '100px',
        left: '10px',
        padding:'1rem',
    },


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
        // margin: '0 0 30px 0',
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










}        
