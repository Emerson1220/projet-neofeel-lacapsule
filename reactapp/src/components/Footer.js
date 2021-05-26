import React from 'react';

const Footer = () => {
    return (
        <div style={ styles.main_footer }>
            <div style={ styles.body }>
                <div style={ styles.col }>
                    <h3 style={ styles.header }>S'ORIENTER</h3>
                    <ul style={ styles.list_unstyled }>
                        <li>Accueil</li>
                        <li>La boutique</li>
                        <li>Le réseau</li>
                        <li>Le concept</li>
                    </ul>
                </div>
                <div style={ styles.col }>
                    <h3 style={ styles.header }>NOUS CONTACTER</h3>
                    <ul style={ styles.list_unstyled }>
                        <li>FAQ</li>
                        <li>Nous contacter</li>
                        <li>Devenir partenaire</li>
                    </ul>
                </div>
                <div style={ styles.col }>
                    <h3 style={ styles.header }>LES NEOPASS</h3>
                    <ul style={ styles.list_unstyled }>
                        <li>Qu'est que le Neopass?</li>
                        <li>Quels sont les avantages?</li>
                        <li>Comment bénéficier des mon avantage</li>
                    </ul>
                </div>
            </div>
            <div style={ styles.foot }>
                    <p><span>©La Capsule 2021</span> | All rights reserved NEOFEEL SAS | <span>Mentions légales</span> | <span>CGV/CGU</span> | <span>Confidentialité</span> | <span>Politique de cookies</span></p>
                    <p>L'abus d'alcool est dangereux pour la santé, à consommer avec modération.</p>
            </div>
        </div>
    )
}

export default Footer;

const styles = {
    main_footer: {
        backgroundColor: 'rgba(16,98,113, 1)',
        color: '#fff',
        display: 'grid',
        gridTemplateRows: '2fr 1fr',
        zIndex: '2'
    },
    body: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        borderBottom: '1px solid #fff',
        paddingTop: '2rem'
    },
    foot: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: '1px solid #fff'
    },
    col: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    list_unstyled: {
        listStyleType: 'none'
    },
    header: {
        color: '#fff'
    }
}