import React from 'react';
import { Input } from 'antd';
import RedButton from '../components/RedButton'

const SignIn = () => {
    return (
        <div style={ styles.container }>
            <h2 style={ styles.title }>Se connecter</h2>
            <div style={ styles.column }>
                <Input type="text" name="email" placeholder="adresse mail" style={ styles.input }></Input>
                <Input.Password type="password" name="password" placeholder="mot de passe" style={ styles.input }></Input.Password>
                <RedButton title="Connexion" size="short" />
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

export default SignIn;