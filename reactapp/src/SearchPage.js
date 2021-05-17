import React, { useState, useRef } from 'react';
import France from '@svg-maps/france.regions';
import { SVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css'
import { Modal, Button } from 'antd';
import { parse } from 'svgson'

const SearchPage = () => {
    //TODO: fetch agglom de régions depuis BDD, liste de tags

    //STATE HOOKS
    const [visible, setVisible] = useState(false);
    const [selection, setSelection] = useState('all');
    const [region, setRegion] = useState(null);

    //REFERENCE HOOKS
    const locationRef = useRef();

    //FUNCTIONS
    //modal
    const showModal = () => {
        setVisible(!visible);
    };

    const handleCancel = () => {
        setVisible(false);
        setSelection('all');
    };

    //map
    const selectLocation = (e) => {
        locationRef.current.focus();
        console.log(locationRef)
        // setRegion(locationRef.current.id)
    }

    let modal;
    if(selection === 'all') {
        modal = 
            <div style={ styles.selectionContent }>
                <button style={ styles.button } onClick={ ()=>setSelection('region') }>Choisir un région</button>
                <button style={ styles.button } onClick={ ()=>setSelection('trips') }>Parcourir nos voyages recommendés</button>
            </div>
    } else if (selection === 'region') {
        modal =
            <div>
                <SVGMap
                map={ France }
                onLocationClick={ (e)=>selectLocation(e) }/>
            </div>
    } else if (selection === 'trips') {
        modal =
            <div style={ styles.feelingContainer }>
            <button style={ styles.feeling }>Loisirs</button>
            <button style={ styles.feeling }>Gastronomie</button>
            <button style={ styles.feeling }>Nature</button>
            <button style={ styles.feeling }>Aventure</button>
            <button style={ styles.feeling }>Aventure</button>
            </div>
    }
    
    return (
        <div style={ styles.container }>
            <Button style={ styles.button } onClick={ ()=>showModal() }>GO</Button>        
            <Modal
            title='Allons-y!'
            centered={ true }
            visible={ visible }
            footer={ null }
            onCancel={ ()=>handleCancel() }
            >
                { modal }
            </Modal>
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
    selectionContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    label: {
        alignSelf: 'center',
        color: 'white'
    },
    button: {
        width: '60%',
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
    },
    feeling: {
        height: '110px',
        width: '110px',
        boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.6)',
        margin: '5%',
        textAlign: 'center'
    },
    feelingContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
}

export default SearchPage;