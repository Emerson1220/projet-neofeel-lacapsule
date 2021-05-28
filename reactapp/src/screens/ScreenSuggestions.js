import React, { useEffect } from 'react';
import Nav from '../components/Nav'
import { Card, Collapse, notification } from 'antd';
import '../styles/suggestion.css'
import RedButton from '../components/RedButton';

//REDUX
import { connect } from 'react-redux';

const { Panel } = Collapse;

function callback(key) {
    console.log(key);
}

const openNotification = (type, message) => {
    notification[type] ({
        description: message,
        placement: 'bottomRight'
    })
};

const ScreenSuggestions = (props) => {
    //EFFECT HOOKS
    useEffect(() => {
        props.activities.length > 0 ? filterTrips() : getSuggestions();
    }, [props.activities])

    //HTTP REQUESTS
    const getSuggestions = async () => {
        let rawResponse = await fetch('/roadtrips')
        let response = await rawResponse.json();
        props.loadSuggestions(response.roadtrips)
    };

    const filterTrips = async () => {
        let activityList = JSON.stringify(props.activities)
        let rawResponse = await fetch('/searchtrips', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `activities=${activityList}`
        })
        let response = await rawResponse.json();
        props.loadSuggestions(response.roadtrips);
    };

    const addTrip = async(suggestion) => {
        if (props.user.token) {
            let rawResponse = await fetch('/addtrip', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.user.token}&roadtripID=${suggestion._id}`
            });
            let response = await rawResponse.json();
            if(response.result === true) {
                props.saveSuggestion(suggestion);
                openNotification('success', 'Voyage ajouté à votre profil!')
            }
        }
    }


    /* Map sur suggestions List _____________*/

    var SuggestionList = [];
    if (props.suggestions) {

        SuggestionList = props.suggestions.map((suggestion, i) => {
            const button = 
            <div style={{display:'flex', width:'100%' }}>
                <h3 style={{display:'flex', margin:0, paddingRight:'2%', whiteSpace:'nowrap', justifyContent:'center', alignItems:'center', fontWeight:'bold'}}>Durée du séjour: {suggestion.duration} jours</h3>
                <RedButton onSelect={ ()=>addTrip(suggestion) } title='Ajouter ce voyage'></RedButton>
                </div>
            var total = 0;
            var pictos = suggestion.tags.map((image, j) => {
                return (<img key={j} src={`/images/pictos/${image}-8.png`} alt={image} />)
            })
            var daySuggestionList = suggestion.days.map((day, k) => {

                var dayExperienceList = day.experiences.map((experience, l) => {
                    /* experience */
                    total = (total + experience.advantageAmount)
                    return (<Panel key={l} header={experience.name} style={{}}>
                        <div style={{ width: '1100px' }}>
                            <p style={{ maxWidth: '1000px' }}>{experience.description.review.split('<br/>')[0]}</p>
                            <div style={{ maxWidth: '1200px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', color: 'red', flexDirection: 'column', }}>
                                <h3 style={{ color: 'rgba(224, 104, 104)', fontWeight: 'bold' }}> Avantages</h3>
                                <h4>{experience.advantage}</h4>
                            </div>
                        </div>
                    </Panel>)
                })
                /* Days */
                return (<Panel key={k} className="site-collapse-custom-panel" showArrow='false' header={day.name} style={{ width: '1200px', maxWidth: '100%'}}>
                    <Collapse defaultActiveKey="0" style={{}}>
                        {dayExperienceList}
                    </Collapse>
                </Panel>)
            })
            /* CARD */
            return (
                <div key={i} className="site-card-border-less-wrapper">
                    <Card title={suggestion.name}
                        headStyle={{ fontSize: '1.3rem', fontWeight: 'bold', width:'100%' }}
                        bordered={true}
                        bodyStyle={{ width: '100%' }}
                        size='default'
                        extra={button}
                    >
                        <div style={{ fontWeight: 'bold', height: '90px', marginBottom: '23px', display: 'flex', justifyContent: 'space-between', maxWidth: '1200px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', backgroundColor: 'rgba(224, 104, 104, 0.8)', width: '50%', height: '100%' }}>
                                <h3 style={{ margin: 0, whiteSpace: 'nowrap', color: '#fff' }}>Vous économiserez {total}€ avec le NeoPass Alsaces-Vosges !</h3>
                            </div>
                            <div style={{ height: '100%', width: '50%', display: 'flex', justifyContent: 'flex-end' }} >
                                {pictos}
                            </div>
                        </div>
                        <Collapse onChange={callback} style={{ width: '1200px', maxWidth: '100%' }}>
                            {daySuggestionList}
                        </Collapse>
                    </Card>
                </div>
            )
        })
    }

    return (

        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff', height: '100vh', overflow: 'scroll' }}>
            <Nav />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3%', marginBottom: '3%' }}><h1>Nos Suggestions de Voyages</h1></div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                {SuggestionList}
            </div>
        </div>

    )

}

function mapDispatchToProps(dispatch) {
    return {
        loadSuggestions: function(roadtrips) {
            dispatch({ type: 'loadSuggestions', suggestions: roadtrips })
        },
        saveSuggestion: function(suggestion) {
            dispatch({ type: 'saveSuggestion', suggestion: suggestion })
        }
    }
}

function mapStateToProps(state) {
    return {
        roadtrips: state.roadtrips, activities: state.activities, suggestions: state.suggestions, user: state.user
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenSuggestions);