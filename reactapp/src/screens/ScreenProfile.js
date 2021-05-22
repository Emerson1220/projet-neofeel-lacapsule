import React, { useState } from 'react';
import Nav from '../components/Nav'
import '../styles/profile.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase, faCommentDots, faPhotoVideo } from '@fortawesome/free-solid-svg-icons'

//REDUX
import { connect } from 'react-redux';

//ROUTER
import { Redirect } from 'react-router-dom';

const ScreenProfile = (props) => {
    return !props.user.token ?
    ( <Redirect to="/connexion" /> )
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


                        <img height='70%' src='../images/neopassRecto.png' style={{borderRadius: 15}} />
                        <div style={{ marginLeft: '1%' }}>
                            <h1 style={{ marginTop: '5%' }}>Votre Neopass</h1>
                            <h3>Region : Alsaces-Vosges</h3>
                            <h5>Date de Validité : 23/06/2022 </h5>
                            <h5>Numéro de votre Neopass : 123456</h5>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                            <h1 style={{ marginTop: '5%', marginLeft:'10%', alignSelf:'flex-start' }}>Mes Voyages Passés</h1>
                            <div className="tripSelect" style={{ display: 'flex', flexDirection: ' column', width: '80%', margin: '2%' }}>
                                <h2>Voyages en Alsaces-Vosges</h2>
                                <h3> Activitées Likés :</h3>
                                <div className='activitySelect'>
                                    <FontAwesomeIcon size='2x' style={{ marginRight: '5px' }} icon={faSuitcase} /><h3 style={{ width: '50%', marginBottom: '0px' }}>Les cabanes perchées du grand ballon</h3>
                                    <div style={{ display: 'flex', flexDirection: 'row', width: '75%', height: '100%', alignItems: 'center', justifyContent: 'flex-end' }} >
                                        <FontAwesomeIcon size='2x'  style={{ marginRight: '5px' }} icon={faCommentDots} />
                                        <FontAwesomeIcon size='2x'  style={{ marginRight: '5px' }} icon={faPhotoVideo} />
                                    </div>
                                </div>
                                <div className='activitySelect'>
                                    <FontAwesomeIcon size='2x'  style={{ marginRight: '5px' }} icon={faSuitcase} /><h3 style={{ width: '50%', marginBottom: '0px' }}>Fun Moving</h3>
                                    <div style={{ display: 'flex', flexDirection: 'row', width: '75%', height: '100%', alignItems: 'center', justifyContent: 'flex-end' }} >
                                        <FontAwesomeIcon size='2x'  style={{ marginRight: '5px' }} icon={faCommentDots} />
                                        <FontAwesomeIcon size='2x'  style={{ marginRight: '5px' }} icon={faPhotoVideo} />
                                    </div>
                                </div>
                                <div className='activitySelect'>
                                    <FontAwesomeIcon size='2x'  style={{ marginRight: '5px' }} icon={faSuitcase} /><h3 style={{ width: '50%', marginBottom: '0px' }}>Une Ferme à la Bassette</h3>
                                    <div style={{ display: 'flex', flexDirection: 'row', width: '75%', height: '100%', alignItems: 'center', justifyContent: 'flex-end' }} >
                                        <FontAwesomeIcon size='2x'  style={{ marginRight: '5px' }} icon={faCommentDots} />
                                        <FontAwesomeIcon size='2x'  style={{ marginRight: '5px' }} icon={faPhotoVideo} />
                                    </div>
                                </div>

                            </div>
                            <div className="tripSelect" style={{ display: 'flex', flexDirection: ' column', width: '80%', margin: '2%' }}>
                                <h2>Voyages en Alsaces-Vosges</h2>
                                <h3> Activitées Likés :</h3>
                                <div className='activitySelect'>
                                    <FontAwesomeIcon size='2x' style={{ marginRight: '5px' }} icon={faSuitcase} /><h3 style={{ width: '50%', marginBottom: '0px' }}>Les cabanes perchées du grand ballon</h3>
                                    <div style={{ display: 'flex', flexDirection: 'row', width: '75%', height: '100%', alignItems: 'center', justifyContent: 'flex-end' }} >
                                        <FontAwesomeIcon size='2x'  style={{ marginRight: '5px' }} icon={faCommentDots} />
                                        <FontAwesomeIcon size='2x'  style={{ marginRight: '5px' }} icon={faPhotoVideo} />
                                    </div>
                                </div>
                                <div className='activitySelect'>
                                    <FontAwesomeIcon size='2x'  style={{ marginRight: '5px' }} icon={faSuitcase} /><h3 style={{ width: '50%', marginBottom: '0px' }}>Fun Moving</h3>
                                    <div style={{ display: 'flex', flexDirection: 'row', width: '75%', height: '100%', alignItems: 'center', justifyContent: 'flex-end' }} >
                                        <FontAwesomeIcon size='2x'  style={{ marginRight: '5px' }} icon={faCommentDots} />
                                        <FontAwesomeIcon size='2x'  style={{ marginRight: '5px' }} icon={faPhotoVideo} />
                                    </div>
                                </div>
                                <div className='activitySelect'>
                                    <FontAwesomeIcon size='2x'  style={{ marginRight: '5px' }} icon={faSuitcase} /><h3 style={{ width: '50%', marginBottom: '0px' }}>Une Ferme à la Bassette</h3>
                                    <div style={{ display: 'flex', flexDirection: 'row', width: '75%', height: '100%', alignItems: 'center', justifyContent: 'flex-end' }} >
                                        <FontAwesomeIcon size='2x'  style={{ marginRight: '5px' }} icon={faCommentDots} />
                                        <FontAwesomeIcon size='2x'  style={{ marginRight: '5px' }} icon={faPhotoVideo} />
                                    </div>
                                </div>
                            </div>

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


    ) ;

}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(
    mapStateToProps,
    null
)(ScreenProfile);