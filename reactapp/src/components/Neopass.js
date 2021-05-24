import React from 'react';
import '../styles/neopass.css'
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faAward, faGift, faThumbsUp, faWallet } from '@fortawesome/free-solid-svg-icons'

const { Meta } = Card;

const Neopass = () => {

    return (
        

            <div className='Neopass' style={{ display: 'flex', height: '100%', width: '400px', flexDirection: 'column', alignItems: 'center', borderRadius: '15px' }}>

                <div style={{ display: 'flex', width: 'auto', height: '12%', justifyContent: 'center', alignItems: 'center', marginTop: '4%', marginBottom: '4%', borderRadius:'15px' }}>
                    <h2 className='title' style={{ marginRight: '5%', fontWeight: 'bold', color: '#fff' }}>NEOPASS</h2>
                    <img style={{ width: '25%' }} src='../images/pictos/voyagez-8.png' />
                </div>

                <Card
                    style={{ display: 'flex', flexDirection: 'column', width: '90%' }}
                    bodyStyle={{borderRadius:'15px'}}
                    cover={
                        <img
                            alt="image"
                            src="../images/CARTE.png.webp"
                        />
                    }
                >
                    <div style={{display:'flex', flexDirection:'column', width:'100%',alignItems:'center' }}>
                        <h2 className='h2'>A partir de 60€</h2>
                        <div className='div-picto'>
                            <FontAwesomeIcon icon={faAddressCard} style={{color:'#106271'}} size='3x' />
                            <h3 className='h3'>Le Neopass physique.</h3>
                        </div>
                        <div className='div-picto'>
                            <FontAwesomeIcon icon={faWallet} style={{color:'#106271'}} size='3x' />
                            <h3 className='h3'>1 guide avec toutes les expériences.</h3>
                        </div>
                        <div className='div-picto'>
                            <FontAwesomeIcon icon={faThumbsUp} style={{color:'#106271'}} size='3x' />
                            <h3 className='h3'>Des avantages particuliers à chaque rencontre.</h3>
                        </div>
                        <div className='div-picto'>
                            <FontAwesomeIcon icon={faGift} style={{color:'#106271'}} size='3x' />
                            <h3 className='h3'>Option coffret cadeau disponible.</h3>
                        </div>
                        <div className='div-picto'>
                            <FontAwesomeIcon icon={faAward} style={{color:'#106271'}} size='3x' />
                            <h3 className='h3'>Livraison gratuite</h3>
                        </div>
                      
                    </div>
                </Card>

            </div>
        

    )



}
export default Neopass;