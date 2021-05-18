import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { Button } from 'antd';



function Nav() {

    return (
        <div style={{ width: '100%', height: '80px', display: 'flex', flexDirection: 'row', border: 2, borderColor: 'red', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', height: '100%', alignItems: 'center', marginLeft: '1%' }}>
                <Link style={{ height: '100%' }} to={'/'}>
                    <img

                        height={'90%'}
                        src="/images/LOGO.png" />
                </Link>

                <div style={{ display: "flex", flexDirection: 'column', height: '90%', justifyContent: 'space-around', }}>
                    <a style={{ height: '20%', padding: 0, display:'flex', alignItems:'center',justifyContent:'center' }} href="https://www.facebook.com/lespritdepartage/">
                        <img
                            height={'100%'}
                            style={{ marginLeft: '10px',padding: 0 }}
                            src="/images/facebookColor.png"
                        />
                    </a>
                    <a style={{ height: '20%', padding: 0, display:'flex', alignItems:'center',justifyContent:'center'}} href="https://www.youtube.com/channel/UCHdHavcCfpXR8wLhgK3t0qQ">
                        <img
                            height={'100%'}
                            style={{ marginLeft: '10px', color: '#FF0000' }}
                            src="/images/youtubeColor.png" />
                    </a>


                    <a style={{height: '20%', padding: 0, display:'flex', alignItems:'center',justifyContent:'center'}} href="https://www.instagram.com/neofeeltravel/">
                        <img
                            height={'100%'}
                            style={{ marginLeft: '10px' }}
                            src="/images/instagramColor.png" />
                    </a>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', marginRight: '1%', height: '100%', width: '40%' }}>
                <Link to={'/partenaire'}>
                    <Button className='devenezPartenaireButton' > Devenez Partenaire </Button>
                </Link>
                <div className='listNav' style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginLeft: '11%', marginTop: '6%', marginBottom: 0, height: '100%' }}>
                    <Link to={'/roadPlanner'}>
                        <h4 height={'33%'} style={{ color: '#106271', marginBottom: 0, whiteSpace: 'nowrap' }}>Mon Voyage</h4>
                    </Link>
                    <Link to={'/recherche'}>
                        <h4 height={'33%'} style={{ color: '#106271', marginBottom: 0, whiteSpace: 'nowrap' }}>Recherche</h4>
                    </Link>
                    <Link to={'/connexion'}>
                        <h4 height={'33%'} style={{ color: '#106271', marginBottom: 0, whiteSpace: 'nowrap' }}>Connexion</h4>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Nav;