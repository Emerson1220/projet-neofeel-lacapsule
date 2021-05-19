import React, { useState } from 'react';
import Nav from '../components/Nav'

const ScreenLogin = () => {

    return (
        <div>
            <Nav></Nav>
            <div>
                <div>
                    <input type="text" name="firstName" placeholder="prénom"></input>
                    <input type="text" name="lastName" placeholder="nom"></input>
                    <input type="text" name="pseudo" placeholder="pseudo"></input>
                    <input type="text" name="email" placeholder="adresse mail"></input>
                    <input type="text" name="password" placeholder="mot de passe"></input>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}