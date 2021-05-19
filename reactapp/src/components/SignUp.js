import React, { useState } from 'react';
import { Input } from 'antd';
import RedButton from '../components/RedButton';

const SignUp = () => {
    //STATE HOOKS
    const [firstName, setfirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const createUser = async() => {
        let rawResponse = await fetch('/')
    }

    return (
        <div style={ styles.container }>
            <div>

            </div>
            <h2 style={ styles.title }>S'inscrire</h2>
            <div style={ styles.column }>
                <Input
                type="text"
                name="firstName"
                placeholder="prénom"
                style={ styles.input }
                value={ firstName }
                onChange={ (e)=>setfirstName(e.target.value) } />
                <Input
                type="text"
                name="lastName"
                placeholder="nom"
                style={ styles.input }
                value={ lastName }
                onChange={ (e)=>setLastName(e.target.value) } />
                <Input
                type="text"
                name="pseudo"
                placeholder="pseudo"
                style={ styles.input }
                value={ lastName }
                onChange={ (e)=>setPseudo(e.target.value) } />                
                <Input
                type="text"
                name="email"
                placeholder="adresse mail"
                style={ styles.input }
                value={ lastName }
                onChange={ (e)=>setEmail(e.target.value) } />
                <Input.Password
                type="password"
                name="password" 
                placeholder="mot de passe"
                style={ styles.input }
                value={ password }
                onChange={ (e)=>setPassword(e.target.value) } />
                <RedButton title="créer mon compte" size="short" />
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
        width: '94%'
    },
    button: {
        padding: '1%',
        margin: '3%'
    },
    title: {
        color: 'white'
    }
}

export default SignUp;