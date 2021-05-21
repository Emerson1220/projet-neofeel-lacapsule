import React, { useState } from 'react';
import Nav from '../components/Nav'
import '../App.css';
import '../styles/partner.css'



const ScreenPartner = () => {
    return (
        <div>
            <Nav />
            <div style={{
                display: "flex", flexDirection: 'column', height: '100vh', width: '100%',
            }} >
                <div style={{ display: 'flex', backgroundColor: 'rgba(224, 104, 104, 0.8)', margin: '1%', padding: ' 4px', width: ' 25%', justifyContent: 'center', borderRadius: ' 10px' }}>
                    <h1 style={{ color: '#FFF' }}> Les Coccinelles</h1>
                </div>

                <div style={{
                    display: 'grid',
                    grid: 'auto-flow dense / 1fr 2fr',
                    
                    

                }}>
                    <div style={{ flexDirection: 'column', alignItems: 'center', borderRadius:'10px', margin:'2%' }}>
                        <img display='flex' width='100%' src='../images/domaines-schlumberger-entree-min.jpg.webp' />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(224, 104, 104, 1)', opacity: 0.9, borderRadius: '10px', padding: '10px', margin:'1%' }}>
                        <h2 style={{  }}><img style={{ marginRight: '4px' }} src="images/icone-geo.png" alt="map" /> Vosges-Alsace</h2>
                        <h2 style={{ fontWeight: 'bold' }}>Review</h2>
                        <h4>Le lieu est étonnant et le calme vraiment appréciable.<br /> Les enfants adoreront le passage suspendu entre les deux chambres du grand gîte.​</h4>

                    </div>
                </div>
                    <div style={{ display: 'flex', backgroundColor: '#106271', opacity: 0.9, borderRadius: '10px', margin: '1%' }}>
                        <h2 style={{ padding: '10px', color: '#FFF', justifyContent: 'center' }}>Voyage insolite au cœur de l’Alsace</h2>
                        <h5 style={{ padding: '10px', color: 'black' }}>Situés dans un éco quartier ces maisons d’architecte en bois de formes arrondies sont toutes douces et toutes rondes.<br />Perchés sur pilotis, les gîtes s’intègrent dans un paysage verdoyant, avec une vue dégagée sur le jardin. Une impression de vacances et de communion avec la nature, parfaitement situé à proximité des sites touristiques du centre Alsace, sur les contres-forts du parc naturel régional du massif des Vosges.<br />Olivier et Cindy auront grand plaisir à vous accueillir dans ces charmants gîtes tout confort au design cosy et moderne.<br />Le gîte les Coccinelles respecte son environnement et communie avec la nature.<br />Une fois l’entrée passée, vous n’en ressortirez plus. Le bois, la décoration et les courbes arrondies de l’intérieur apportent sérénité et chaleur.<br />Les enfants adoreront passer d’une chambre à l’autre par le passage suspendu.<br />Pas plus de commentaire, nous vous laissons admirer les photos et vous projeter dans cet écrin de douceur.<br />Le grand gîte d’une surface de 80m2 à une capacité de 5 personnes. Deux chambres avec lit double 160×200 et une mezzanine avec un lit 90×200 La cuisine est toute équipée et ouverte sur le séjour. La salle de bain privée est design avec douche à l’italienne. Le jardin est paysagé avec des carrés potagers et un tipi en bois pour barbecue. Il y a une terrasse couverte de 60m2 avec espace détente et jeux en bois.<br />Le petit gîte d’une surface de 40m2 à une capacité de 2 à 4 personnes Une chambre cocon pour 2 personnes en hauteur et un canapé lit confortable pour 2 personnes La cuisine équipée est ouverte sur un séjour atypique avec des murs arrondis. La salle de bain privée est design avec douche à l’italienne. Une terrasse de 20m2 avec vue sur la montagne.<br />Pour ces deux cottages, le parking est privé, l’accès à la piste cyclable est direct et le linge de lits et serviettes sont fournis.</h5>
                    </div>


            </div>
        </div>

    )

}

export default ScreenPartner;
