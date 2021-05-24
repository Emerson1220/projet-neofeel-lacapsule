import React from 'react';
import Neopass from '../components/Neopass'
import NeoBox from '../components/NeoBox'
import Nav from '../components/Nav'
import '../styles/info.css'


const ScreenInfo = () => {
    return (
        <div >
            <Nav />
            <div className='info' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <div style={{ display: 'flex', width: '80%', flexDirection: 'row', marginTop: '2%', marginBottom: '1%',justifyContent:'center'}}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center' ,width:'70%' }}>
                        <h2>Des expériences uniques</h2>
                        <h4>Neofeel développe une tendance innovante du tourisme éthique en privilégiant les relations humaines et le savoir-faire.
                        Profitez de notre carnet d’adresses variées (gastronomie, loisirs, hébergements insolites, artisanat, musées, …).
                        L’esprit libre, vous organisez votre programme selon la durée de votre séjour et vos centres d’intérêts !
                        Présentez votre NeoPass lors de vos visites pour bénéficier de vos Avantages Particuliers (réductions, cadeaux, prestations surclassées, attentions particulières, …)
                        Vous rentabiliserez votre NeoPass en quelques utilisations seulement et vivrez des expériences uniques.
                    </h4>
                    </div>
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <img style={{ display: 'flex',width:'60%', marginBottom: '2%', }} src='./images/carte2.jpg '></img>
                        </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Neopass />
                <NeoBox />
            </div>
        </div>

    )
}

export default ScreenInfo;