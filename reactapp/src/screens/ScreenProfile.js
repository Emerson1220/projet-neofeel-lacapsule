import React from 'react';
import '../styles/profile.css'

//COMPONENTS
import Nav from '../components/Nav'

//UI
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase, faCommentDots, faPhotoVideo } from '@fortawesome/free-solid-svg-icons'
import RedButton from '../components/RedButton';
import { notification } from 'antd';

//REDUX
import { connect } from 'react-redux';

//ROUTER
import { Redirect } from 'react-router-dom';

const ScreenProfile = (props) => {
    //HTTP REQUESTS
    const shareTrip = async(token, roadtripID) => {
        let rawResponse = await fetch('/sharetrip', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `token=${token}&roadtripID=${roadtripID}`
        });
        let response = await rawResponse.json();
        if (response.result === true) {
            openNotification('success', 'Voyage partagé!')
        } else if (response.message === 'not authorized') {
            openNotification('error', 'Vous ne pouvez que partager vos propre voyages.', 'Erreur')
        } else {
            openNotification('warning', "Le partage de voyage n'a pas pu aboutir. Veuillez réessayer.", 'Erreur')
        }
    }

    //FUNCTIONS
    const openNotification = (type, message, title) => {
        notification[type] ({
            description: message,
            placement: 'bottomRight',
            message: title
        })
    };

    var tripLiked = [];
    if (props.user.roadtrips && props.user.roadtrips.length > 0) {

        tripLiked = props.user.roadtrips.map((roadtrip, i) => {

        var styleTripPerso = { display: 'flex', flexDirection: ' column', width: '80%', margin: '2%', border: '2px solid rgba(80, 80, 80, 0.7)' }
        var styleTripSuggest = { display: 'flex', flexDirection: ' column', width: '80%', margin: '2%', border: '2px solid rgba(224, 104, 104, 0.8)' }

        var suggestionNeofeel = <></>
        if (roadtrip.type) {
            suggestionNeofeel = <h3 style= {{color:'rgba(224, 104, 104, 0.8)'}}>Suggestion NEOFEEL</h3>
        }

            var daySuggestionList = roadtrip.days.map((day, k) => {


                var ExperienceList = day.experiences.map((experience, j) => {

                    return (<div key={j} className='activitySelect'>
                        <FontAwesomeIcon size='2x' style={{ marginRight: '5px' }} icon={faSuitcase} />
                        <h3 style={{ width: '50%', marginBottom: '0px' }}>{experience.name}</h3>                       
                        <div style={{ display: 'flex', flexDirection: 'row', width: '75%', height: '100%', alignItems: 'center', justifyContent: 'flex-end' }} >
                            <FontAwesomeIcon size='2x' style={{ marginRight: '5px' }} icon={faCommentDots} />
                            <FontAwesomeIcon size='2x' style={{ marginRight: '5px' }} icon={faPhotoVideo} />
                        </div>
                    </div>)
                })
                return (<div key={k}>
                    <h3> {day.name} :</h3>
                    {ExperienceList} </div>)

            })
            return (
                <div key={i} className="tripSelect" style={roadtrip.type === 'admin' ? styleTripSuggest : styleTripPerso}>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                    <h2>{roadtrip.name}</h2>
                    {suggestionNeofeel}
                    </div>
                    
                    {daySuggestionList}
                    <div style={{display:'flex', alignItems: 'end', justifyContent:'flex-end'}}>
                        <RedButton title='Partager' onSelect={ ()=>shareTrip(props.user.token, roadtrip._id)}></RedButton> 
                        <RedButton title='Supprimer'></RedButton>
                        </div>
                </div>)
        })

    }





    return !props.user.token ?
        (<Redirect to="/connexion" />)
        : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Nav />
                <div style={{
                    width: '100%', height: '100vh', display: 'grid',
                    gridTemplateColumns: '80% 20%'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

                        <div style={{
                            height: '35%',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(224, 104, 104, 0.8)',

                        }}>


                            <img height='70%' src='../images/neopassRecto.png' style={{ borderRadius: 15 }} alt="neopass" />
                            <div style={{ marginLeft: '1%' }}>
                                <h1 style={{ marginTop: '5%' }}>Votre Neopass</h1>
                                <h3>Region : Alsaces-Vosges</h3>
                                <h5>Date de Validité : 23/06/2022 </h5>
                                <h5>Numéro de votre Neopass : 123456</h5>
                            </div>
                        </div>


                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                                <h1 style={{ marginTop: '5%', marginLeft: '10%', alignSelf: 'flex-start' }}>Mes Voyages Passés</h1>
                                {tripLiked}

                            </div>
                        </div>

                    </div>


                    <div style={{ flexDirection: 'row', backgroundColor: 'rgb(16, 98, 113, 0.7)', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: '2%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end', padding: '3%' }}>
                            <h2 className='margeTitle'>Mes commandes</h2>
                            <h2 className='margeTitle'>Mes abonnements</h2>
                            <h2 className='margeTitle'>Mes accés</h2>
                            <h2 className='margeTitle'>Mes téléchargements</h2>
                            <h2 className='margeTitle'>Mes adresses</h2>
                        </div>
                    </div>
                </div>
            </div>


        );

}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(
    mapStateToProps,
    null
)(ScreenProfile);