import React, { useState } from 'react';
import Nav from '../components/Nav'

const SignUp = () => {
    return (
        <div>
        <div>
            <input type="text" name="firstName" placeholder="prénom"></input>
            <input type="text" name="lastName" placeholder="nom"></input>
            <input type="text" name="pseudo" placeholder="pseudo"></input>
            <input type="text" name="email" placeholder="adresse mail"></input>
            <input type="text" name="password" placeholder="mot de passe"></input>
        </div>
        <div>
            <button>S'inscrire avec Google</button>
            <button>S'inscrire avec Facebook</button>
        </div>
        </div>
    )
};

const SignIn = () => {
    return (
        <div>
            <div>
                <input type="text" name="email" placeholder="adresse mail"></input>
                <input type="text" name="password" placeholder="mot de passe"></input>
            </div>
            <div>
                <button>S'inscrire avec Google</button>
                <button>S'inscrire avec Facebook</button>
            </div>
        </div>
    )
}

const ScreenLogin = () => {
    //STATE HOOKS
    const [display, setDisplay] = useState('signin')

    let input = <SignIn />
    if (display === "signup") {
        input = <SignUp />
    }
    return (
        <div>
            <Nav></Nav>
            <div style={ styles.container }>
                { input }
            </div>
        </div>
    )
}

styles = {
    container: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export default ScreenLogin;