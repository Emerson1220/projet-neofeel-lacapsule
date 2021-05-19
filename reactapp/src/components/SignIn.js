import React, { useState} from 'react';
import { Input, Checkbox } from 'antd';
import RedButton from '../components/RedButton'

const SignIn = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [isChecked, setIsChecked] = useState(false);

    const signinUser = async() => {
        let rawResponse = await fetch('/users/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `email=${data.email}&password=${data.password}`
        });
        let response = await rawResponse.json();
        if (response.result)
    };

    return (
        <div style={ styles.container }>
            <h2 style={ styles.title }>Se connecter</h2>
            <div style={ styles.column }>
                <Input
                type="text"
                name="email"
                placeholder="adresse mail"
                style={ styles.input } 
                onChange={ (e)=>setData(Object.assign({ ...data }, { email: e.target.value }))}/>
                <Input.Password
                type="password"
                name="password"
                placeholder="mot de passe"
                style={ styles.input } 
                onChange={ (e)=>setData(Object.assign({ ...data }, { password: e.target.value }))}/>
                <div style={ styles.checkContainer }>
                    <Checkbox
                    onChange={ (e)=>setIsChecked(e.target.checked) }
                    style={ styles.checkbox } />
                    <span style={{ color: 'white', whiteSpace: 'nowrap' }}>Rester connecter</span>
                </div>
                <RedButton title="Connexion" size="short" onSelect={ ()=>signinUser() }/>
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
        alignSelf: 'start'
    }
}

export default SignIn;