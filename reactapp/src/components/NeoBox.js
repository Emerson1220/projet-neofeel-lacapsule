import React from 'react';
import '../styles/neobox.css'

import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faHeart, faAddressCard, faWallet,faGift} from '@fortawesome/free-solid-svg-icons'
import { icons } from 'antd/lib/image/PreviewGroup';


const Neobox = () => {


    return (
        
            <div className='Neobox' style={{ display: 'flex', marginLeft: '1%', marginRight: '1%', height: '100%', width: '400px', flexDirection: 'column', alignItems: 'center', borderRadius: '15px' }}>

                <div style={{ display: 'flex', width: 'auto', height: '12%', justifyContent: 'center', alignItems: 'center', marginTop: '2%', marginBottom: '2%', borderRadius: '15px' }}>
                    <h2 className='title' style={{ marginRight: '5%', fontWeight: 'bold', color: '#fff' }}>NEOBOX</h2>
                    <img style={{ width: '25%' }} src='../images/pictos/avantage-particulier-8.png' />
                </div>

                <Card
                    style={{ display: 'flex', flexDirection: 'column', width: '90%' }}
                    bodyStyle={{ borderRadius: '15px' }}
                    cover={
                        <img
                            alt="image"
                            src="../images/BOX-v2.jpg.webp"
                        />
                    }
                >
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                        <h2 className='subtitle'>A partir de 45€</h2>
                        <div className='div-picto'>
                            <FontAwesomeIcon icon={faHeart} style={{ color: '#e06868' }} size='3x' />
                            <h3 className='h3'>Une sélection de produits artisanaux de nos partenaires</h3>
                        </div>
                        <div className='div-picto'>
                            <FontAwesomeIcon icon={faAddressCard} style={{ color: '#e06868' }} size='3x' />
                            <h3 className='h3'>Une carte Neopass physique.</h3>
                        </div>
                        <div className='div-picto'>
                            <FontAwesomeIcon icon={faWallet} style={{ color: '#e06868' }} size='3x' />
                            <h3 className='h3'>1 guide avec toutes les expériences.</h3>
                        </div>
                        <div className='div-picto'>
                            <FontAwesomeIcon icon={faGift} style={{ color: '#e06868' }} size='3x' />
                            <h3 className='h3'>Des avantages particuliers à chaque rencontre.</h3>
                        </div>
                        <div className='div-picto'>
                            <img src='./images/pictos/mondial-relay-logo.png' style={{ color: '#106271', width:'60px' }}  />
                            <h3 className='h3'>Livraison gratuite</h3>
                        </div>

                    </div>
                </Card>

            </div>
        
    )
}



export default Neobox