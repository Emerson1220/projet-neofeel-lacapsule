import React from 'react';
import './App.css';

import { Button } from 'antd';



function Nav() {

    return (
        <div style={{ width: '100%', height:'80px', display: 'flex', flexDirection: 'row', border: 2, borderColor:'red', justifyContent: 'space-between' }}>
            <div style={{display:'flex',height:'100%', alignItems:'center',marginLeft:'1%'}}>
                <img
                    // width={'auto'}
                    height={'90%'}
                    src="/images/LOGO.png" />


                <div style={{ display: "flex", flexDirection: 'column',height:'90%', justifyContent:'space-around', }}>
                    <img
                        height={'20%'}
                        style={{  marginLeft: '10px' }}
                        src="/images/facebookColor.png" />
                    <img
                        height={'20%'}
                        style={{ marginLeft: '10px', color: '#FF0000' }}
                        src="/images/youtubeColor.png" />

                    <img
                        height={'20%'}
                        style={{ marginLeft: '10px' }}
                        src="/images/instagramColor.png" />
                </div>
            </div>
            <div style={{ display: "flex", justifyContent:'space-between', alignItems: 'center', marginRight:'1%', height:'100%', width:'40%' }}>
                <Button className='devenezPartenaireButton' > Devenez Partenaire </Button>

                <div className='listNav' style={{display: 'flex', alignItems: 'center', flexDirection:'column', marginLeft:'11%',marginTop:'6%', marginBottom:0, height:'100%'}}>
                    <h4 height={'33%'} style={{ color: '#106271', marginBottom: 0, whiteSpace:'nowrap' }}>Mon Voyage</h4>
                    <h4 height={'33%'} style={{ color: '#106271', marginBottom: 0, whiteSpace:'nowrap' }}>Recherche</h4>
                    <h4 height={'33%'} style={{ color: '#106271', marginBottom: 0, whiteSpace:'nowrap' }}>Connexion</h4>
                </div>
            </div>
        </div>
    )
}
export default Nav;