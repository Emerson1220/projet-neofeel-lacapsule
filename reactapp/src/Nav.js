import React from 'react';
import './App.css';

import { Button } from 'antd';



function Nav() {

    return (
        <nav style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <img
                    width={'332px'}
                    height={'117px'}
                    src="/images/LOGO.png" />

            </div>
            <div style={{ display: "flex", flexDirection: 'column' }}>
                <img
                    width={'38px'}
                    height={'36px'}
                    style={{ marginTop: '5px', marginLeft: '10px' }}
                    src="/images/facebookColor.png" />
                <img
                    width={'38px'}
                    height={'36px'}
                    style={{ marginTop: '5px', marginLeft: '10px', color: '#FF0000' }}
                    src="/images/youtubeColor.png" />

                <img
                    width={'38px'}
                    height={'36px'}
                    style={{ marginTop: '5px', marginLeft: '10px' }}
                    src="/images/instagramColor.png" />
            </div>
            <div style={{}}>
                <Button className ='devenezPartenaireButton' > Devenez Partenaire </Button>
            </div>
            <div className='listNav'>
                <h3 style={{color: '#106271' }}>Mon Voyage</h3>
                <h3 style={{color: '#106271' }}>Recherche</h3>
                <h3 style={{color: '#106271' }}>Connexion</h3>
            </div>

        </nav>
    )
}
export default Nav;