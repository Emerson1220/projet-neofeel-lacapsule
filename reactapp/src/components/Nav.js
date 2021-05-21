import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

//UI
import { Button, Badge } from 'antd';

//REDUX
import { connect } from 'react-redux';

function Nav(props) {

    return (
        <div style={{ width: '100%', height: '90px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor:'#FFF' }}>
            <div style={{ display: 'flex', height: '100%', alignItems: 'center', marginLeft: '1%' }}>
                <Link style={{ height: '100%' }} to={'/'}>
                    <img

                        height={'90%'}
                        src="/images/LOGO.png" alt="logo"/>
                </Link>

                <div style={{ display: "flex", flexDirection: 'column', height: '90%', justifyContent: 'space-around', }}>
                    <a style={{ height: '20%', padding: 0, display:'flex', alignItems:'center',justifyContent:'center' }} href="https://www.facebook.com/lespritdepartage/">
                        <img
                            height={'100%'}
                            style={{ marginLeft: '10px',padding: 0 }}
                            src="/images/facebookColor.png"
                            alt='picto facebook'
                        />
                    </a>
                    <a style={{ height: '20%', padding: 0, display:'flex', alignItems:'center',justifyContent:'center'}} href="https://www.youtube.com/channel/UCHdHavcCfpXR8wLhgK3t0qQ">
                        <img
                            height={'100%'}
                            style={{ marginLeft: '10px', color: '#FF0000' }}
                            src="/images/youtubeColor.png"
                            alt="picto youtube"
                        />
                    </a>
                    <a style={{height: '20%', padding: 0, display:'flex', alignItems:'center',justifyContent:'center'}} href="https://www.instagram.com/neofeeltravel/">
                        <img
                            height={'100%'}
                            style={{ marginLeft: '10px' }}
                            src="/images/instagramColor.png"
                            alt="picto instagram"
                        />
                    </a>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', marginRight: '1%', height: '100%', width: '40%' }}>
                <Link to={'/partenaire'}>
                    <Button className='devenezPartenaireButton' > Devenez Partenaire </Button>
                </Link>
                <div className='listNav' style={{ display: 'flex', alignItems: 'center',justifyContent:'flex-end', flexDirection: 'row', marginLeft: '11%', marginBottom: 0, height: '100%', width:'100%' }}>
                    <Badge count={ props.roadplanner.length } >
                        <Link to={'/roadPlanner'}  >
                            <h2 height={'33%'} style={{ color: '#106271', marginBottom: 0, whiteSpace: 'nowrap' }}>Mon Voyage</h2>
                        </Link>
                    </Badge>
                    <Link to={'/recherche'} style={{ marginRight:'3%', marginLeft:'3%'}}>
                        <h2 height={'33%'} style={{ color: '#106271', marginBottom: 0, whiteSpace: 'nowrap' }}>Recherche</h2>
                    </Link>
                    <Link to={'/connexion'} style={{ marginRight:'3%'}}>
                        <h2 height={'33%'} style={{ color: '#106271', marginBottom: 0, whiteSpace: 'nowrap' }}>Connexion</h2>
                    </Link>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        roadplanner: state.roadplanner
    }
} 

export default connect(
    mapStateToProps,
    null
)(Nav);