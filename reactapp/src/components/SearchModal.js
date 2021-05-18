import React, { useState, useEffect } from 'react';
import France from '@svg-maps/france.regions';
import { SVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css'
import { Modal, Button } from 'antd';
import RedButton from './RedButton';


const SearchModal = (props) => {
    //STATE HOOKS
    const [selection, setSelection] = useState('all');
    const [region, setRegion] = useState(null);
    const [activities, setActivities] = useState([]);

    useEffect(()=> {
        console.log(selection)
    }, [selection])

    //FUNCTIONS

    const handleCancel = () => {
        setSelection('all');
        setRegion(null);
        setActivities([])
        props.showModal();
    };

    //map
    const selectLocation = (e) => {
        setRegion(e.target.getAttribute('name'));
    };

    //voyages
    const filterTrips = (e) => {
        let temp = [...activities];
        let index = temp.findIndex(f => f === e)
        index > -1 ? temp.splice(index, 1) : temp.push(e);
        setActivities(temp);
    }

    //DISPLAY TREATMENT
    let activityList = [
        { name: 'Loisirs', id: 'loisirs', picto: '/images/pictos/loisirs-8.png'},
        { name: 'Gastronomie', id: 'gastronomie', picto: '/images/pictos/gastronomie-8.png'},
        { name: 'Musée', id: 'musee', picto: '/images/pictos/musee-8.png'},
        { name: 'Patrimoine', id: 'patrimoine', picto: '/images/pictos/patrimoine-8.png'},
        { name: 'Oénologie', id: 'oenologie', picto: '/images/pictos/oenologie-8.png'},
        { name: 'Hébergement insolite', id: 'hebergement-insolite', picto: '/images/pictos/hebergement-insolite-8.png'}
    ]

    let activityCards = activityList.map((e,i) => {
        return activities.find(f => f === e.id) 
        ? 
        <Button
        key={ i }
        style={ Object.assign({...styles.feeling}, { border: 'solid rgb(224, 104, 104) 2px' }) }
        onClick={ ()=>filterTrips(e.id) } >
            <img style={ styles.picto } src={ e.picto } alt={ e.name }/>
        </Button>
        : 
        <Button
        key={ i }
        style={ styles.feeling }
        onClick={ ()=>filterTrips(e.id) }>
            <img style={ styles.picto } src={ e.picto } alt={ e.name }/>
        </Button>
    })

    let selected = <h3>Choissisez votre destination</h3>;
    let selectRegionButton;
    if (region) {
        selected = <h3>{ region }</h3>
        selectRegionButton = <RedButton title="Allons-y!" size="small"/>
    };


    let modalContent;
    if(selection === 'all') {
        modalContent = 
            <div style={ styles.selectionContent }>
                <RedButton
                title="Découvrir une région"
                size="large"
                onSelect={ ()=>setSelection('region') }
                />
                <RedButton
                title="Parcourir nos suggestions de voyage"
                size="large"
                onSelect={ ()=>setSelection('trips') }
                />
            </div>
    } else if (selection === 'region') {
        modalContent =
            <div>
                { selected }
                <SVGMap
                map={ France }
                onLocationClick={ (e)=>selectLocation(e) }
                />
            { selectRegionButton }
            </div>
    } else if (selection === 'trips') {
        modalContent =
        <div>
            <h3>Sélectionnez vos envies</h3>
            <div style={ styles.feelingContainer }>
                { activityCards }
            </div>
        </div>
    }
    
    return (
        <div style={ styles.container }>
            <Modal
            title=''
            centered={ true }
            visible={ props.visible }
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
    picto: {
        height: '100%'
    },
    input: {
        width: '70%',
        borderRadius: '8px',
        color: 'grey',
        padding: 10,
    },
    feeling: {
        height: '100px',
        width: '100px',
        boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.6)',
        margin: '5%',
        whiteSpace: 'wrap',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    feelingContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: 'rgba(244, 244, 246, 0.5)',
        borderRadius: '15px',
    }
}

export default SearchModal;