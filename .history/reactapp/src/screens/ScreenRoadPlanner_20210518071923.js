import React from 'react';
import './App.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import Nav from './Nav'


function ScreenRoadPlanner() {
    return (
        <div style={{ display: "flex", flexDirection: 'column' }}>
            <Nav />
            <div style={{ display: "flex", flexDirection: 'column', height: '100%' }} >
                <div style={{
                    backgroundImage: `url("images/BanniereHome.jpg")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }} >
                    <div style={{
                        width: '34%',
                        height: '280px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(16, 98, 113, 0.3)'
                    }}>
                        <h5 style={{ color: '#FFF', marginLeft:'6%', marginRight:'3%' }}>
                            Neofeel développe une tendance innovante du tourisme éthique.
                            L’esprit libre, profitez de notre carnet d’adresses variées.
                        </h5>
                        <div style={{ display: 'flex', flexDirection: 'row', height: '35%', width: '80%', justifyContent: 'space-around', alignItems:'center' }}>
                            <img
                                style={{ height: '55%', width: '36%', borderRadius: 3 }}
                                src='/images/neopassRecto.png'
                            />
                            <h6 style={{ color: '#FFF' }}>
                                Bénéficiez d’avantages <br />particuliers avec le Neopass
                            </h6>
                        </div>
                        <div>
                        <Button className='ensavoirplusButton' > En savoir plus.. </Button>
                        </div>

                    </div>
                </div>

            </div>
        </div>




    )
}


export default ScreenRoadPlanner;