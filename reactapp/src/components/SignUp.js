import React, { useState } from 'react';

//REDUX
import { connect } from 'react-redux';

//UI
import { Input, Checkbox } from 'antd';
import RedButton from '../components/RedButton';

//COOKIE MANAGEMENT
import Cookie from 'universal-cookie';

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

    //COOKIE MANAGEMENT
    const cookies = new Cookie();

    const createUser = async() => {
        let rawResponse = await fetch('/users/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `firstName=${user.firstName}&lastName=${user.lastName}&email=${user.email}&password=${user.password}&pseudo=${user.pseudo}`
        })
        let response = await rawResponse.json();
        console.log(response);
        if (response.result === true) {
            props.onSignupClick({ token: response.token, pseudo: response.pseudo });
            if (isChecked) {
                cookies.set('token', response.token, { path: '/', maxAge: 604800 })
            }
        } else {
            setError(response.message);
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
                <RedButton title="créer mon compte" size="short" onSelect={ ()=>createUser() } />
            </div>
            <div style={ styles.row }>
                <button style={ styles.button }>S'inscrire avec Google</button>
                <button style={ styles.button }>S'inscrire avec Facebook</button>
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
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSignupClick: function(data) {
            dispatch({ type: 'signup', user: data })
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(SignUp);