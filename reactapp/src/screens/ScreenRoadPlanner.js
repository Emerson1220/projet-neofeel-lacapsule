import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

//UI
import { Button } from 'antd';

//COMPONENTS
import Nav from '../components/Nav';
import Map from '../components/Map';
import CardRoadPlanner from '../components/CardRoadPlanner';

//REDUX
import { connect } from 'react-redux';

function ScreenRoadPlanner(props) {
    //Etats
    const [experienceList, setExperienceList] = useState([{ partner: { addresses: [{ city: '' }] }, tags: [], description: {imageBannerUrl:''} }])
    const [experiences, setExperience] = useState([]);

    // let roadplanner = [];
    useEffect(() =>{
        setExperienceList(props.roadplanner)
},  [props.roadplanner])

    const deleteBDD = async(data) => {
        let rawResponse = await fetch(`/myroadplanner/${data.roadtripID}/${data.experienceID}`);
        let response = await rawResponse.json();
    }

    //select expérience
    var selectExperience = async (experience) => {
        let rawResponse = await fetch('/roadtrips', {
            method: 'PUT',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body : `experience=${JSON.stringify(experience)}`
        })
        let response = await rawResponse.json();
    }

    var selectExperience = async (experience) => {
        let rawResponse = await fetch('/roadtrips/60a4d8695e61b2c452d97b78', {
            method: 'DELETE',
        })
        let response = await rawResponse.json();
    }

    let cards = experienceList.map((e, i)=>

        
        <CardRoadPlanner key={i} 
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
            tags={e.tags}>
            
        </CardRoadPlanner>
    )

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

        experiences_list_area:{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',        
            boxSizing: 'border-box',
            outline: 'none',
            paddingLeft: '1rem',
            paddingRight: '1rem',
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
)(ScreenRoadPlanner);