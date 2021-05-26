import React, { useState } from 'react';
import Nav from '../components/Nav'
import '../App.css';
import '../styles/partner.css'
import RedButton from '../components/RedButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faBookmark, faEye, faHandsHelping,FaCreativeCommonsNceu } from '@fortawesome/free-solid-svg-icons'



const ScreenPartner = () => {

    const [hover, setHover] = useState(false);

    //FUNCTIONS
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <div>
            <Nav />

            <div className='container'>
                <h1>Devenir Partenaire</h1>
                <div className='encart'>
                    <div className='becomePartner'>
                        <h2>Qui peut devenir partenaire?</h2>
                        <h4>Vous avez un métier qui vous passionne et vous voulez le faire partager.<br/>
                        Vous souhaitez donner de la visibilité à votre entreprise.<br/><br/>
                        Vous connaissez ou vous êtes apiculteur, vigneron, châtelain privé, ostréiculteur, loueur de vélo, table d’hôtes, producteur de spécialités régionales, parapentiste, créateur, épicier, fin gastronome, bar à vin, éleveur, gérant de gîte ou d’hôtel, et tout ces métiers du loisir, de la culture et du savoir-faire.
                            Rejoignez-nous sans attendre pour profiter des avantages du réseau</h4>
                    </div>
                    <div className='whyPartner'>
                        <h2>Pourquoi devenir partenaire ?</h2>
                        <div className='description'>
                        <FontAwesomeIcon size="2x" icon={faBookmark} style={{marginRight:'2%', marginBottom:'5%', color:'#106271'}} />
                            <h4>100% gratuit et sans engagement de durée</h4>
                        </div>
                        <div className='description'>
                        <FontAwesomeIcon size="2x" icon={faBookmark} style={{marginRight:'2%', marginBottom:'5%', color:'#106271'}} />
                            <h4 className='description'>Partagez avec des visiteurs curieux et engagés</h4>
                        </div>
                        <div className='description'>
                        <FontAwesomeIcon size="2x" icon={faEye} style={{marginRight:'2%', marginBottom:'5%', color:'#106271'}} />
                            <h4 className='description'>Donnée une visibilité nationale à votre entreprise</h4>
                        </div>
                        <div className='description'>
                        <FontAwesomeIcon size="2x" icon={faHandsHelping} style={{marginRight:'2%', marginBottom:'5%', color:'#106271'}} />
                            <h4 className='description'>Intégrez un réseau solidaire pour de nouvelles opportunités</h4>
                        </div>
                    </div>

                </div>
                <div className='bottomInfo'>
                    <h2 style={{display:'flex', justifyContent:'center', alignItems:'center', paddingTop:'2%'}}>Comme notre équipe, nos partenaires sont tous de grands passionnés, 
                    alors rejoignez les !</h2>
                    <button 
                    onMouseEnter={ ()=>setHover(true) }
                    onMouseLeave={ ()=>setHover(false) }
                    style={ hover ? styles.buttonHover : styles.button }                      
                    onClick={()=>openInNewTab("https://share.hsforms.com/16R3eptHFSYOjiQWoURY1Cw3uh5p")} ><h2 style={styles.buttonText}>Formulaire de Contact</h2> </button>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center', paddingBottom:'2%'}}>
                        <FontAwesomeIcon size="2x" icon={faPhoneAlt} style={{marginRight:'4%', marginBottom:'10%', color:'#106271'}} />
                        <h2>06.19.40.54.10</h2>
                    </div>
                </div>
            </div>
        </div>
    )

}
const styles = {
    button: {
        backgroundColor: 'rgb(224, 104, 104)',
        border: 'none',
        margin: '2%',
        boxShadow: '2px, 2px, 2px rgba(0, 0, 0, 0.5)',
        borderRadius: '5px'
    },
    buttonHover: {
        border: 'none',
        margin: '2%',
        backgroundColor: "rgba(224, 104, 104, 0.8)",
        borderRadius: '5px',
        transform: `scale(1.07)`
    },
    buttonText: {
        color: 'white',
        whiteSpace: 'nowrap',
        flexWrap: 'nowrap',
        padding: 6,
        margin: 0,
        lineHeight: '1.6rem',
        fontSize: '0.9rem',
        fontWeight: 'bold'
    }
}

export default ScreenPartner;
