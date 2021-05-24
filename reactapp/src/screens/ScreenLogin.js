import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

//COMPONENTS
import Nav from '../components/Nav'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

//UI
import RedButton from '../components/RedButton'

//REDUX
import { connect } from 'react-redux';

//COOKIE MANAGEMENT
import Cookie from 'universal-cookie';
const cookies = new Cookie();

const ScreenLogin = (props) => {
    //STATE HOOKS
    const [display, setDisplay] = useState('signin');

    
    const fetchUser = async(token) => {
        let rawResponse = await fetch('/users/staylogged', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `token=${token}`
        })
        let response = await rawResponse.json();
        if (response.result === true) {
            props.stayLogged(response.user)
        }
    }
    
    if (cookies.get('token')) {
        fetchUser(cookies.get('token'));
    }
    
    let input = <SignIn />
    if (display === "signup") {
        input = <SignUp />
    }

    return props.user.token ? (
        <Redirect to='/profil' />
    )
    : (
        <div className="home">
            <Nav></Nav>
            <div style={ styles.container }>
                <div style={ styles.box }>
                <div style={ styles.switchContainer }>
                    <RedButton title='Se connecter' onSelect={ ()=>setDisplay('signin') } />
                    <RedButton title="S'inscrire" onSelect={ ()=>setDisplay('signup') } />
                </div>
                <div style={ styles.inputContainer }>
                    { input }
                </div>
                </div>
            </div>
        </div>
    ) ;
}

let styles = {
    container: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        backgroundColor: 'rgba(16, 98, 113, 0.9)',
        borderRadius: '5px',
        width: '30vw'
    },
    switch: {
        color: 'rgba(224, 104, 104, 0.8)',
    },
    switchContainer: {
        width: '102%',
        display: 'flex',
        justifyContent: 'end',
        marginLeft: '1%',
        marginTop: '1%',
        paddingTop: '1%',
        paddingRight: '4%'
    },
    inputContainer: {
        padding: '10%',
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

function mapDispatchToProps(dispatch) {
    return {
        stayLogged: function(user) {
            dispatch({ type: 'stayLogged', user: user })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenLogin);