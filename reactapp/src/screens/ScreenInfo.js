import React from 'react';
import Neopass from '../components/Neopass'
import NeoBox from '../components/NeoBox'
import Nav from '../components/Nav'
import '../styles/info.css'

import { Timeline } from 'antd';


const ScreenInfo = () => {
    return (
        <div >
            <Nav />
            <div className='info' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <div style={{ display: 'flex', width: '80%', flexDirection: 'row', marginTop: '2%', marginBottom: '1%', justifyContent: 'center' }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        // backgroundColor: 'rgba(16, 98, 113, 0.3)',
                        padding: '2%',
                        margin: '2%',
                        border:'2px solid rgba(16, 98, 113, 0.4)',
                        borderRadius: '20px',
                        boxShadow: '1px 0px 45px rgba(16, 98, 113, 0.4)'
                        
                    }}>
                        <h2 style={{fontSize:'2Rem', color:'rgba(16, 98, 113, 1)', fontWeight:'bold'}}>Des expériences uniques</h2>
                        <h4 style={{fontSize:'1.2Rem', textAlign:'justify'}}>Neofeel développe une tendance innovante du tourisme éthique en privilégiant les relations humaines et le savoir-faire.
                        <br/>Profitez de notre carnet d’adresses variées (gastronomie, loisirs, hébergements insolites, artisanat, musées…).<br />
                        L’esprit libre, vous organisez votre programme selon la durée de votre séjour et vos centres d’intérêts !
                        Présentez votre NeoPass lors de vos visites pour bénéficier de vos Avantages Particuliers (réductions, cadeaux, prestations surclassées, attentions particulières…).<br />
                        Vous rentabiliserez votre NeoPass en quelques utilisations seulement et vivrez des expériences uniques.
                    </h4>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img style={{ display: 'flex', width: '70%', marginBottom: '2%', }} src='./images/carte2.jpg ' alt="carte de France NEOFEEL"></img>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '90%', alignItems: 'center', justifyContent:'center', marginLeft: '8%' }}>
                <div style={{display:'flex', width:'40%'}}>
                    <Neopass />
                    <NeoBox />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '80%', alignItems: 'center', margin: '6%' }}>
                    <h2 style={{ marginBottom: '6%', fontSize: '40px', color: '#106271', fontWeight: 'bold' }}>Les Valeurs</h2>
                    <Timeline color='#106271'>
                        <Timeline.Item dot={<img className='picto' src='./images/pictos/solidaire-8.png' alt="picto valeur solidaire"/>} >
                            <div classname='valeurs'>
                                <h3 className='h3'>
                                    LE RESEAU ETHIQUE & SOLIDAIRE</h3>
                                <h4 style={{ margin: '3%' }} >Nous rencontrons tous nos Partenaires et nous les sélectionnons sur les principes d’échanges, de respect et d’intégrité.
                                Producteurs, artisans, artistes, hôtes d’hébergements insolites, restaurateurs, aubergistes, acteurs du loisir, etc…
                                Ces adresses représentent un savoir-faire, parfois unique, de la culture et du patrimoine.
                            Leurs garants ont a coeur de faire découvrir leur métier auprès voyageurs curieux.</h4>
                            </div>
                        </Timeline.Item>

                        <Timeline.Item dot={<img className='picto' src='./images/pictos/partagez-8.png' alt="picto valeur partage du savoir"/>}>
                            <div classname='valeurs'>
                                <h3 className='h3'>
                                    LE PARTAGE DU SAVOIR</h3>
                                <h4 style={{ margin: '3%' }} >La France est riche de savoir-faire et de traditions.
                                En véritables passionnés, nos Partenaires ont à cœur de vous faire partager leur connaissance et leur passion au travers des métiers qui les anime.</h4>
                            </div>
                        </Timeline.Item>

                        <Timeline.Item dot={<img className='picto' src='./images/pictos/prix-juste-8.png' alt="picto valeur prix juste"/>}>
                            <div classname='valeurs'>
                                <h3 className='h3'>
                                    LE PRIX JUSTE</h3>
                                <h4 style={{ margin: '3%' }}>Les prix sont libres mais respectueux. Ils sont le reflet du travail et de la passion.
                        Nous n’imposons aucune contrainte tarifaire à nos Partenaires.</h4>
                            </div>
                        </Timeline.Item>

                        <Timeline.Item dot={<img className='picto' src='./images/pictos/rencontrez-8.png' alt="picto valeur l'esprit donnant"/>}>
                            <div classname='valeurs'>
                                <h3 className='h3'>
                                    L'ESPRIT "DONNANT-DONNANT"</h3>
                                <h4 style={{ margin: '3%' }}>
                                    La mise en avant de nos Partenaires est entièrement gratuite et sans engagement.
                                    Aucune commission ne leur est demandée non plus.
                                    En échange, l’Avantage Particulier proposé librement, permet aux voyageurs de rentabiliser leur Neopass en seulement quelques utilisations.
                        Les circuits courts et directs sont privilégiés afin de garantir des retombées économiques locales.</h4>
                            </div>
                        </Timeline.Item>

                        <Timeline.Item dot={<img className='picto' src='./images/pictos/reseau-solidaire-8.png' alt="picto valeur relations humaines et environnementales"/>}>
                            <div classname='valeurs'>
                                <h3 className='h3'>
                                    LES RELATIONS HUMAINES ET ENVIRONNEMENTALES</h3>
                                <h4 style={{ margin: '3%' }}>
                                    Le respect et la convivialité sont l’essence même du réseau NEOFEEL. Pas de tourisme de masse, ni de décors de papier mâché.
                                    L’authenticité et la congruence sont la vitrine de chacun de nos Partenaires.
                                    Il y a ainsi, des rencontres, des échanges, des sensations qui font que l’expérience devienne unique.
                                    La préservation de nos ressources est un enjeu essentiel. La nature est fragile et est également traitée avec respect.</h4>
                            </div>
                        </Timeline.Item>
                    </Timeline>
                </div>
            </div>
        </div >

    )
}

export default ScreenInfo;