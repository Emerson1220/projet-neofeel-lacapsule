import React, { useState, useEffect } from 'react';
import '../styles/Home.css'
import '../styles/login.css'

//REDUX
import { connect } from 'react-redux';

//UI
import { Input, Checkbox, Divider } from 'antd';
import RedButton from '../components/RedButton';

//COOKIE MANAGEMENT
import Cookie from 'universal-cookie';

//PLUGINS
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login'

const SignUp = (props) => {
    //STATE HOOKS
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        pseudo: ''
    });
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState('');

    useEffect(()=> {
        console.log(props.user)
    }, [props.user])
    //COOKIE MANAGEMENT
    const cookies = new Cookie();

    //FUNCTIONS
    //signin request
    const createUser = async() => {
        let roadplanner = null;
        if (props.roadplanner !== {} && props.roadplanner.experiences) {
            roadplanner = {
                name: 'mon voyage',
                experiences: props.roadplanner.experiences.map(e => e._id)
            }
        }

        let data = JSON.stringify({
            user: user,
            roadplanner: roadplanner
        })
        let rawResponse = await fetch('/users/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `data=${data}`
        })
        let response = await rawResponse.json();
        if (response.result === true) {
            props.stayLogged(response.user)
            if (response.newRoadplanner !== null) {
                props.loadRoadplanner({
                    id: response.newRoadplanner,
                    experiences: props.roadplanner.experiences
                })
            }
            if (isChecked) {
                cookies.set('token', response.token, { path: '/', maxAge: 604800 });
            }
        } else {
            setError(response.message);
        }
    }

    // Facebook/Google logins
    const responseFacebook = async(res) => {
        let rawResponse = await fetch(`/users/auth/facebook/signup/${res.accessToken}`);
        let response = await rawResponse.json();
        if (response.result === true) {
            props.stayLogged(response.user)
            if (isChecked) {
                cookies.set('token', response.user.token, { path: '/', maxAge: 604800 })
            }
        } else {
            setError(response.message);
        }
    }

    const responseGoogle = async (res) => {
        let rawResponse = await fetch(`/users/auth/google/signup/${res.accessToken}`);
        let response = await rawResponse.json();
        if (response.result === true) {
            props.stayLogged(response.user)
            if (isChecked) {
                cookies.set('token', response.user.token, { path: '/', maxAge: 604800 })
            }
        } else {
            setError(response.message)
        }
    }

    return (
        <div style={ styles.container }>
            <h2 style={ styles.title }>S'inscrire</h2>
            <div style={ styles.column }>
                <p style={{ color: 'white' }}>{ error }</p>
                <Input
                type="text"
                name="firstName"
                placeholder="prénom"
                style={ styles.input }
                value={ user.firstName }
                onChange={ (e)=>setUser(Object.assign({ ...user }, { firstName: e.target.value })) } />
                <Input
                type="text"
                name="lastName"
                placeholder="nom"
                style={ styles.input }
                value={ user.lastName }
                onChange={ (e)=>setUser(Object.assign({ ...user }, { lastName: e.target.value })) } />
                <Input
                type="text"
                name="pseudo"
                placeholder="pseudo"
                style={ styles.input }
                value={ user.pseudo }
                onChange={ (e)=>setUser(Object.assign({ ...user }, { pseudo: e.target.value })) } />
                <Input
                type="text"
                name="email"
                placeholder="adresse mail"
                style={ styles.input }
                value={ user.email }
                onChange={ (e)=>setUser(Object.assign({ ...user }, { email: e.target.value })) } />
                <Input.Password
                type="password"
                name="password" 
                placeholder="mot de passe"
                style={ styles.input }
                value={ user.password }
                onChange={ (e)=>setUser(Object.assign({ ...user }, { password: e.target.value })) } />
                <div style={ styles.checkContainer }>
                <Checkbox
                    onChange={ (e)=>setIsChecked(e.target.checked) }
                    style={ styles.checkbox } />
                    <span style={{ color: 'white', whiteSpace: 'nowrap' }}>Rester connecter</span>
                </div>
                <RedButton title="créer mon compte" onSelect={ ()=>createUser() } />
                <Divider style={ styles.divider }>OU</Divider>
            </div>
            <div style={ styles.buttonContainer }>
                    <FacebookLogin
                    appId='509585980227274'
                    fields="name, email, picture"
                    textButton="S'inscrire avec Facebook"
                    callback={ responseFacebook }
                    language="fr-FR"
                    size="small"
                    icon="fa-facebook"
                    className="facebook"
                    />
                    <GoogleLogin
                    clientId="884422014939-bu63e3eoqfgv1vrmsn01qd0ukfl2uumf.apps.googleusercontent.com"
                    buttonText="S'inscrire avec Google"
                    onSuccess={ responseGoogle }
                    onFailure={ responseGoogle }
                    cookiePolicy={'single_host_origin'}
                    />
            </div>
        </div>
    )
};

let styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center'
    },
    input: {
        padding: '1%',
        margin: '3%',
    },
    button: {
        padding: '1%',
        margin: '3%'
    },
    title: {
        color: 'white'
    },
    checkbox: {
        marginRight: '3%',
    },
    checkContainer: {
        display: 'flex',
        alignSelf: 'start',
        marginBottom: '2%'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: '20%'
    },
    divider: {
        color: 'white'
    }
}

function mapDispatchToProps(dispatch) {
    return {
        stayLogged: function(user) {
            dispatch({ type: 'stayLogged', user: user })
        },
        loadRoadplanner: function(roadplanner) {
            dispatch({ type: 'loadRoadplanner', roadplanner: roadplanner})
        }
    }
}

function mapStateToProps(state) {
    return {
        roadplanner: state.roadplanner
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);