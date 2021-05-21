import React, { useState } from 'react';
import Nav from '../components/Nav'
import '../styles/profile.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase, faCommentDots, faPhotoVideo } from '@fortawesome/free-solid-svg-icons'


const ScreenProfile = () => {
    return (
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


                        <img height='70%' src='../images/neopassRecto.png' borderRadius='10px' />
                        <div style={{ marginLeft: '1%' }}>
                        <h1 style={{ marginTop: '5%' }}>Votre Neopass</h1>
                            <h3>Region : Alsaces-Vosges</h3>
                            <h5>Date de Validité : 23/06/2022 </h5>
                            <h5>Numéro de votre Neopass : 123456</h5>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                            <h1 style={{ marginTop: '5%' }}>Mes Voyages Passés</h1>
                            <div className="tripSelect" style={{ display: 'flex', flexDirection: ' column', width: '80%', margin: '2%' }}>
                                <h2>Voyages en Alsaces-Vosges</h2>
                                <h3> Activitées Likés :</h3>
                                <div className='activitySelect'>
                                    <FontAwesomeIcon className='logo' style={{ marginRight: '5px' }} icon={faSuitcase} /><h4 style={{width:'50%'}}>Les cabanes perchées du grand ballon</h4>
                                    <div style={{display:'flex',flexDirection:'row', width:'75%', height:'100%', alignItems:'center', justifyContent:'flex-end'}} >
                                        <FontAwesomeIcon className='logo' style={{ marginRight: '5px' }} icon={faCommentDots} />
                                        <FontAwesomeIcon className='logo' style={{ marginRight: '5px' }} icon={faPhotoVideo} />
                                    </div>
                                </div>
                                <div className='activitySelect'>
                                    <FontAwesomeIcon className='logo' style={{ marginRight: '5px' }} icon={faSuitcase} /><h4 style={{width:'50%'}}>Fun Moving</h4>
                                    <div style={{display:'flex',flexDirection:'row', width:'75%', height:'100%', alignItems:'center', justifyContent:'flex-end'}} >
                                        <FontAwesomeIcon className='logo' style={{ marginRight: '5px' }} icon={faCommentDots} />
                                        <FontAwesomeIcon className='logo' style={{ marginRight: '5px' }} icon={faPhotoVideo} />
                                    </div>
                                </div>
                                <div className='activitySelect'>
                                    <FontAwesomeIcon className='logo' style={{ marginRight: '5px' }} icon={faSuitcase} /><h4 style={{width:'50%'}}>Une Ferme à la Bassette</h4>
                                    <div style={{display:'flex',flexDirection:'row', width:'75%', height:'100%', alignItems:'center', justifyContent:'flex-end'}} >
                                        <FontAwesomeIcon className='logo' style={{ marginRight: '5px' }} icon={faCommentDots} />
                                        <FontAwesomeIcon className='logo' style={{ marginRight: '5px' }} icon={faPhotoVideo} />
                                    </div>
                                </div>

                            </div>
                            <div className="tripSelect" style={{ display: 'flex', flexDirection: ' column', width: '80%', margin: '2%' }}>
                                <h2>Voyages en Alsaces-Vosges</h2>
                                <h3> Activitées Likés :</h3>
                                <div className='activitySelect'>
                                    <FontAwesomeIcon className='logo' style={{ marginRight: '5px' }} icon={faSuitcase} /><h4 style={{width:'50%'}}>Les cabanes perchées du grand ballon</h4>
                                    <div style={{display:'flex',flexDirection:'row', width:'75%', height:'100%', alignItems:'center', justifyContent:'flex-end'}} >
                                        <FontAwesomeIcon className='logo' style={{ marginRight: '5px' }} icon={faCommentDots} />
                                        <FontAwesomeIcon className='logo' style={{ marginRight: '5px' }} icon={faPhotoVideo} />
                                    </div>
                                </div>
                                <div className='activitySelect'>
                                    <FontAwesomeIcon className='logo' style={{ marginRight: '5px' }} icon={faSuitcase} /><h4 style={{width:'50%'}}>Fun Moving</h4>
                                    <div style={{display:'flex',flexDirection:'row', width:'75%', height:'100%', alignItems:'center', justifyContent:'flex-end'}} >
                                        <FontAwesomeIcon className='logo' style={{ marginRight: '5px' }} icon={faCommentDots} />
                                        <FontAwesomeIcon className='logo' style={{ marginRight: '5px' }} icon={faPhotoVideo} />
                                    </div>
                                </div>
                                <div className='activitySelect'>
                                    <FontAwesomeIcon className='logo' style={{ marginRight: '5px' }} icon={faSuitcase} /><h4 style={{width:'50%'}}>Une Ferme à la Bassette</h4>
                                    <div style={{display:'flex',flexDirection:'row', width:'75%', height:'100%', alignItems:'center', justifyContent:'flex-end'}} >
                                        <FontAwesomeIcon className='logo' style={{ marginRight: '5px' }} icon={faCommentDots} />
                                        <FontAwesomeIcon className='logo' style={{ marginRight: '5px' }} icon={faPhotoVideo} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>




                <div style={{ flexDirection: 'row', backgroundColor: 'rgb(16, 98, 113, 0.7)', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: '2%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end', padding: '3%' }}>
                        <h3>Mes commandes</h3>
                        <h3>Mes abonnements</h3>
                        <h3>Mes accés</h3>
                        <h3>Mes téléchargements</h3>
                        <h3>Mes adresses</h3>
                    </div>
                </div>
            </div>
        </div>




    )

}

export default ScreenProfile;