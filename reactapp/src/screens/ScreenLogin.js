import React, { useState } from 'react';

//COMPONENTS
import Nav from '../components/Nav'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

//UI
import RedButton from '../components/RedButton'

const ScreenLogin = () => {
    //STATE HOOKS
    const [display, setDisplay] = useState('signin');

    let input = <SignIn />
    if (display === "signup") {
        input = <SignUp />
    }
    return (
        <div>
            <Nav></Nav>
            <div style={ styles.container }>
                <div style={ styles.box }>
                <div style={ styles.switchContainer }>
                    <RedButton title='Se connecter' size="short" onSelect={ ()=>setDisplay('signin') } />
                    <RedButton title="S'inscrire" size="short" onSelect={ ()=>setDisplay('signup') } />
                </div>
                <div style={ styles.inputContainer }>
                    { input }
                </div>
                </div>
            </div>
        </div>
    )
}

let styles = {
    container: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        backgroundColor: 'rgba(16, 98, 113, 0.7)',
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

export default ScreenLogin;