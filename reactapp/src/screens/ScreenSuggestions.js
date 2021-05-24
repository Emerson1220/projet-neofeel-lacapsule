import React, { useState } from 'react';
import Nav from '../components/Nav'
import { Card, Collapse } from 'antd';
import '../styles/suggestion.css'
import RedButton from '../components/RedButton';

const { Panel } = Collapse;

function callback(key) {

    
    console.log(key);
}

const ScreenSuggestions = () => {

    const button = <RedButton title = 'Ajouter ce voyage'></RedButton>


    return (

        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff', height: '100vh' }}>
            <Nav />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3%', marginBottom:'3%' }}><h1>Nos Suggestions de Voyages</h1></div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                <div className="site-card-border-less-wrapper">
                    <Card title="Séjour de 3 jours en Alsace-Vosges"
                        headStyle={{ fontSize: '1.3rem', fontWeight: 'bold',  }}
                        bordered={true}
                        bodyStyle={{ width: '100%' }}
                        size='default'
                        extra ={button}
                        bordered = {true}
                        >

                        <div style={{ fontWeight: 'bold', height: '90px', marginBottom: '23px', display:'flex', justifyContent:'space-between', maxWidth:'1200px'}}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', backgroundColor: 'rgba(224, 104, 104, 0.8)', width: '50%', height: '100%' }}>
                                <h3 style={{ margin: 0,whiteSpace:'nowrap', color:'#fff' }}>Vous économiserez 130€ avec le NeoPass Alsaces-Vosges !</h3>
                            </div>
                            <div style={{ height:'100%', width:'50%', display:'flex', justifyContent:'flex-end'}} >
                                <img src='/images/pictos/bar-a-vin-8.png'/>
                                <img src='/images/pictos/bistro-8.png'/>
                                <img src='/images/pictos/epicerie-8.png'/>
                                <img src='/images/pictos/fromagerie-8.png'/>
                            </div>
                        </div>

                        <Collapse onChange={callback} style={{ width: '1200px', maxWidth: '100%' }}>
                            <Panel className="site-collapse-custom-panel" showArrow='false' header="Jour 1" key="1" style={{ width: '1200px', maxWidth: '100%' }}>
                                <Collapse defaultActiveKey="1" style={{}}>
                                    <Panel header="Vino Varlot" key="1" style={{}}>
                                        <div style={{ width: '1100px' }}>
                                            <p style={{ maxWidth: '1000px' }}>Paul de Vino Varlot vous fera découvrir la route des vins d’Alsace à bord de son combi VW des années 70’s.<br />
                                                    Une expérience unique et gastronomique au rendez-vous. </p>
                                            <div style={{ maxWidth: '1200px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', color: 'red', flexDirection: 'column', }}>
                                                <h3 style={{ color: 'rgba(224, 104, 104)', fontWeight: 'bold' }}> Avantages</h3>
                                                <h4>-20% sur les nuitées</h4>
                                            </div>
                                        </div>
                                    </Panel>
                                    <Panel header="Abracadabaume" key="2">
                                        <p style={{ maxWidth: '1000px' }}>Ayez les yeux grands ouverts et les poumons remplis d’air frais.<br />
                                            La balade de Caroline est un excellent moyen de découvrir, d’apprendre, de rencontrer et de partager avec des passionnés.<br />
                                            Les valeurs de NEOFEEL sont bien là…​ </p>
                                    </Panel>
                                    <Panel header="Domaine Zeyssolff" key="3">
                                        <p style={{ maxWidth: '1000px' }}>Cette maison à la fois historique et moderne offre tous ce que l’on peut chercher dans l’oeuno-tourisme : des vins excellents, un personnel accueillant, un endroit où l’on se sent bien.<br />
                                            Chaque particularité du lieu offre une explication claire pour apprendre et découvrir. Le partage, le goût et la connaissance sont mis à l’honneur dans cet endroit plein de surprise. </p>
                                    </Panel>
                                </Collapse>
                            </Panel>
                            <Panel className="site-collapse-custom-panel" header="Jour 2" key="2">
                                <Collapse defaultActiveKey="1" style={{ width: '100%', minWidth: '100%' }}>
                                    <Panel showArrow='false' header="les Cabanes du Goutty" key="1">
                                        <p>Ma rencontre avec Barbara, Jean-Christophe et leurs cabanes ne m’a pas laissé de marbre. Dans cet écrin de verdure, j’ai pu y retrouver la tranquillité, le confort mais surtout la gentillesse et la convivialité de deux passionnées. Merci à vous.</p>
                                    </Panel>
                                    <Panel header="Sandra Reti Creations" key="2">
                                        <p>La gentillesse de Sandra, sa passion, ses créations, son atelier-boutique, tout est parfait.J’ai rencontré une passionnée avec de l’or au bout des doigts.Merci Sandra pour vos bijoux et le moment de convivialité que vous m’avez offert.​</p>
                                    </Panel>
                                    <Panel header="Une Ferme a la Bassette" key="3">
                                        <p>Mariane et Nicolas sont des personnes généreuses, pédagogues et passionnées. Dans ce cadre très bucolique qui respire la tranquillité, la convivialité et la simplicité sont les maîtres mots.</p>
                                    </Panel>
                                </Collapse>
                            </Panel>
                            <Panel className="site-collapse-custom-panel" header="Jour 3" key="3">
                                <Collapse defaultActiveKey="1" style={{ width: '100%', minWidth: '100%' }}>
                                    <Panel showArrow='false' header="Les cabanes perchées du grand ballon" key="1">
                                        <p>Notre passion des voyages a définitivement fait basculer notre cœur pour ces cabanes si différentes de toutes les autres. La gentillesse de Loïc n’en n’est pas moins responsable dans ce coup de cœur.</p>
                                    </Panel>
                                    <Panel header="Fun moving" key="2">
                                        <p>Les ballades entre les vignes de la route du vin d’ Alsace, les magnifiques paysages avec vues panoramiques, les arrêts dégustations, sans oublier les explications d’un passionné, Léopold est simplement le guide parfait pour créer des souvenirs impérissables. Merci</p>
                                    </Panel>
                                    <Panel header="Les coccinelles" key="3">
                                        <p>Le lieu est étonnant et le calme vraiment appréciable. Les enfants adoreront le passage suspendu entre les deux chambres du grand gîte.​</p>
                                    </Panel>
                                </Collapse>
                            </Panel>
                        </Collapse>


                    </Card>
                </div>
            </div>
        </div>

    )

}

export default ScreenSuggestions;