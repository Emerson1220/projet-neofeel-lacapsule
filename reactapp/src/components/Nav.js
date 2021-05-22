import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

//UI
import { Button, Badge } from 'antd';

//REDUX
import { connect } from 'react-redux';

//COOKIE MANAGEMENT
import Cookie from 'universal-cookie';
const cookies = new Cookie();

function Nav(props) {
    const [isLogged, setIsLogged] = useState(false)

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const fetchUser = async(token) => {
        let rawResponse = await fetch('/users/staylogged', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `token=${token}`
        })
        let response = await rawResponse.json();
        console.log(response)
        if (response.result === true) {
            props.stayLogged(response.user)
            setIsLogged(true)
            props.onSigninClick(token)
        }
    }

    const logOut = () => {
        cookies.remove('token');
        props.deleteToken();
        props.onLogoutClick();
        setIsLogged(false);
    }

    useEffect(()=> {
        console.log({
            user: props.user,
            isLogged: isLogged
        })
        if (props.user) {
            setIsLogged(true)
        } else {
            let accessToken;
            let cookieToken = cookies.get('token');
            console.log(accessToken)
            if (cookieToken) {
                accessToken = cookieToken;
            } else {
                accessToken = props.user.token;
            }
            if (accessToken) {
                fetchUser(accessToken);
            }
        }
    }, [props.user, isLogged]);
    
    let connectButton;
    let greeting;

    if(isLogged === true) {
        connectButton = 
        <h2 height={'33%'} style={{ color: '#106271', marginBottom: 0, whiteSpace: 'nowrap', marginRight:'3%'}} onClick={ ()=>logOut() }>Déconnexion</h2>
        greeting = <h2>Bienvenue, { props.user.firstName }!</h2>
    } else {
        connectButton = 
        <Link to={'/connexion'} style={{ marginRight:'3%'}}>
        <h2 height={'33%'} style={{ color: '#106271', marginBottom: 0, whiteSpace: 'nowrap' }}>Connexion</h2>
        </Link>
    }

    return (
        <div style={{ width: '100%', height: '90px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor:'#FFF' }}>
            <div style={{ display: 'flex', height: '100%', alignItems: 'center', marginLeft: '1%' }}>
                <Link style={{ height: '100%' }} to={'/'}>
                    <img

                        height={'90%'}
                        src="/images/LOGO.png" alt="logo"/>
                </Link>

                <div style={{ display: "flex", flexDirection: 'column', height: '90%', justifyContent: 'space-around', }}>
                    <a 
                    style={{ height: '20%', padding: 0, display:'flex', alignItems:'center',justifyContent:'center' }}
                    onClick={ ()=>openInNewTab("https://www.facebook.com/lespritdepartage/") }>
                        <img
                            height={'100%'}
                            style={{ marginLeft: '10px',padding: 0 }}
                            src="/images/facebookColor.png"
                            alt='picto facebook'
                        />
                    </a>
                    <a
                    style={{ height: '20%', padding: 0, display:'flex', alignItems:'center',justifyContent:'center'}}
                    onClick={ ()=>openInNewTab("https://www.youtube.com/channel/UCHdHavcCfpXR8wLhgK3t0qQ")} >
                        <img
                            height={'100%'}
                            style={{ marginLeft: '10px', color: '#FF0000' }}
                            src="/images/youtubeColor.png"
                            alt="picto youtube"
                        />
                    </a>
                    <a
                    style={{height: '20%', padding: 0, display:'flex', alignItems:'center',justifyContent:'center'}}
                    onClick={ ()=>openInNewTab("https://www.instagram.com/neofeeltravel/")}
                    >
                        <img
                            height={'100%'}
                            style={{ marginLeft: '10px' }}
                            src="/images/instagramColor.png"
                            alt="picto instagram"
                        />
                    </a>
                </div>
                { greeting }
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
                    { connectButton }
                </div>
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        stayLogged: function(user) {
            dispatch({ type: 'stayLogged', user: user })
        },
        onSigninClick: function(data) {
            dispatch({ type: 'signin', token: data })
        },
        deleteToken: function(data) {
            dispatch({ type: 'delete', token: data })
        },
        onLogoutClick: function(data) {
            dispatch({ type: 'logout' })
        }
    }
}

function mapStateToProps(state) {
    return {
        roadplanner: state.roadplanner, token: state.token, user: state.user
    }
} 

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav);