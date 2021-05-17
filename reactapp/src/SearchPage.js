import React, { useState } from 'react';

const SearchPage = () => {
    //TODO: fetch agglom de régions depuis BDD

    //STATE HOOKS
    const [region, setRegion] = useState('');
    const [tripType, setTripType] = useState('');
    
    return (
        <div style={ styles.container }>
            <div style={ styles.searchbar }>
            <select value={ region }
            onChange={ (e)=>setRegion(e.target.value) }
            style={ styles.input }
            >
                <option value='' disabled>Choisissez votre région. . .</option>
                <option value="Alsace">Alsace</option>
                <option value="Ile-de-France">Ile-de-France</option>
                <option value="Aveyron">Aveyron</option>
                <option value="Pyrénées">Pyrénées</option>
            </select>
            <h3 style={ styles.label }>OU</h3>
            <select value={ tripType }
            onChange={ (e)=>setTripType( e.target.value) }
            style={ styles.input }>
                <option value='' disabled>Voir un de nos voyages recommendés. . .</option>
                <option value="vinobles de bordeaux">Vinobles de Bordeaux</option>
                <option value="randonees gorges">Randoneés dans les Gorges du Tarn</option>
            </select>
            <button 
            name="search"
            type="submit"
            style={ styles.button }
            hoverBackground="rgb(0, 119, 255)"
            pressedBackground="rgb(0, 136, 255)"
            >
                Neofeel t'emporte!
            </button>
            </div>
        </div>
    )
};

let styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        alignItems: 'center'
    },
    searchbar: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '10%',
        backgroundColor: 'rgba(16, 98, 113, 0.8)',
        padding: '5%',
        borderRadius: '8px',
        boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.5)',
        alignItems: 'center'
    },
    label: {
        alignSelf: 'center',
        color: 'white'
    },
    button: {
        borderRadius: '8px',
        backgroundColor: 'rgb(224, 104, 104)',
        color: 'white',
        fontSize: '16px',
        padding: 10,
        marginTop: '3%',
    },
    input: {
        width: '70%',
        borderRadius: '8px',
        color: 'grey',
        padding: 10,
    }
}

export default SearchPage;