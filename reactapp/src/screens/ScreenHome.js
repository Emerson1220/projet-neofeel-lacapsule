import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav'

import RedButton from '../components/RedButton'
import SearchModal from '../components/SearchModal'

function ScreenHome() {
    //STATE HOOKS
    const [visible, setVisible] = useState(false);

    //FUNCTIONS
    //modal
    const showModal = () => {
        setVisible(!visible);
    };

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
                            <RedButton title="Le Concept" size="small" />
                            </Link>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end', paddingBottom: '3%', paddingRight:'2%' }}>
                    <h2 style={{ color: '#FFF', paddingRight: '1%' }}>Découvrez la France autrement...</h2>
                        <RedButton title="Commencer l'aventure..." size="small" onSelect={ ()=>showModal() }/>
                    </div>
                </div>
            </div>
            <SearchModal visible={ visible } showModal={ ()=>showModal() }/>
        </div>

    )
}


export default ScreenHome;