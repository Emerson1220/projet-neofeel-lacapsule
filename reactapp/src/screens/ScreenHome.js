import React from 'react';
import '../App.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
<<<<<<< HEAD:reactapp/src/ScreenHome.js
import Nav from './Nav'
import { icons } from 'antd/lib/image/PreviewGroup';
=======
import Nav from '../components/Nav'
>>>>>>> 1c5f088062bdd816541a4e77f4ec3466f3083756:reactapp/src/screens/ScreenHome.js


function ScreenHome() {
    return (
        <div style={{ display: "flex", flexDirection: 'column', height: '100%' }}>
            <Nav />
            <div style={{ display: "flex", flexDirection: 'column', height: '100%' }} >
                <div style={{
                    backgroundImage: `url("images/BanniereHome.jpg")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',

                }} >
                    <div style={{
                        width: '70%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(16, 98, 113, 0.3)',

                    }}>
                        <h5 style={{ color: '#FFF', marginLeft: '6%', marginRight: '3%' }}>
                            Neofeel développe une tendance innovante du tourisme éthique.
                            L’esprit libre, profitez de notre carnet d’adresses variées.
                        </h5>
                        <div style={{ display: 'flex', flexDirection: 'row', height: '35%', width: '80%', justifyContent: 'space-around', alignItems: 'center' }}>
                            <img
                                style={{ height: '45%', width: 'auto', borderRadius: 3, marginRight: '3%' }}
                                src='/images/neopassRecto.png'
                            />
                            <h6 style={{ color: '#FFF' }}>
                                Bénéficiez d’avantages <br />particuliers avec le Neopass...
                            </h6>
                        </div>
                        <div style={{paddingTop:'1%'}}>
                            <Link to ={'/info'}>
                            <Button className='ensavoirplusButton' > Le Concept   </Button>
                            </Link>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end', paddingBottom: '3%', paddingRight:'2%' }}>
                    <h2 style={{ color: '#FFF', paddingRight: '1%' }}>Découvrez la France autrement...</h2>
                        <Button className='ensavoirplusButton' >Commencer l'aventure... </Button>
                        

                    </div>
                </div>
                {/* <div className ="cards">
                    <article className="card">                       
                        <img src="/images/ALSA-CYCLO-TOURS-6-min.jpg" alt="Alsa Cyclo Tours"></img>
                    </article>
                    <article className="card">
                        <img src="/images/domaines-schlumberger-entree-min.jpg.webp" alt="Alsa Cyclo Tours"></img>
                    </article>
                </div> */}

            </div>
        </div>




    )
}


export default ScreenHome;