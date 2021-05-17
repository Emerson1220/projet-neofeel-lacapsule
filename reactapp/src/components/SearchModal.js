import React, { useState } from 'react';
import France from '@svg-maps/france.regions';
import { SVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css'
import { Modal, Button } from 'antd';


const SearchModal = () => {
    //TODO: fetch agglom de régions depuis BDD, liste de tags

    //STATE HOOKS
    const [visible, setVisible] = useState(false);
    const [selection, setSelection] = useState('all');
    const [region, setRegion] = useState(null);
    const [activity, setActivity] = useState(null);

    //FUNCTIONS
    //modal
    const showModal = () => {
        setVisible(!visible);
    };

    const handleCancel = () => {
        setSelection('all');
        setRegion(null);
        setActivity(null)
        setVisible(false);
    };

    //map
    const selectLocation = (e) => {
        setRegion(e.target.getAttribute('name'));
    };

    //voyages
    const filterTrips = (e) => {
        setActivity(e.target.value)
    }

    let selected = <h3>Allons-y!</h3>;
    if (region || activity) {
        region && !activity ? selected = <h3>{ region }</h3> : selected = <h3>{ activity }</h3> ;
    }

    let modalContent;
    if(selection === 'all') {
        modalContent = 
            <div style={ styles.selectionContent }>
                <Button style={ styles.button } onClick={ ()=>setSelection('region') }>Choisir un région</Button>
                <Button style={ styles.button } onClick={ ()=>setSelection('trips') }>Parcourir nos voyages recommendés</Button>
            </div>
    } else if (selection === 'region') {
        modalContent =
            <div>
                <SVGMap
                map={ France }
                onLocationClick={ (e)=>selectLocation(e) }
                />
            </div>
    } else if (selection === 'trips') {
        modalContent =
            <div style={ styles.feelingContainer }>
            <Button style={ styles.feeling } onClick={ (e)=>filterTrips(e.target.value) } value="loisirs">Loisirs</Button>
            <Button style={ styles.feeling } onClick={ (e)=>filterTrips(e.target.value) } value="gastronomie">Gastronomie</Button>
            <Button style={ styles.feeling } onClick={ (e)=>filterTrips(e.target.value) } value="nature">Nature</Button>
            <Button style={ styles.feeling } onClick={ (e)=>filterTrips(e.target.value) } value="aventure">Aventure</Button>
            <Button style={ styles.feeling } onClick={ (e)=>filterTrips(e.target.value) } value="vin">Dégustations de vin</Button>
            </div>
    }
    
    return (
        <div style={ styles.container }>
            <Button style={ styles.button } onClick={ ()=>showModal() }>GO</Button>        
            <Modal
            title=''
            centered={ true }
            visible={ visible }
            footer={ null }
            onCancel={ ()=>handleCancel() }
            bodyStyle={ styles.modal }
            >  
                { modalContent }
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
    Button: {
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
        textAlign: 'center',
        whiteSpace: 'wrap'
    },
    feelingContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: 'rgba(244, 244, 246, 0.5)',
        borderRadius: '15px'
    }
}

export default SearchModal;