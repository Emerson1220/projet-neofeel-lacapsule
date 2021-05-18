import React, { useState, useEffect } from 'react';
import France from '@svg-maps/france.regions';
import { SVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css'
import { Modal, Button } from 'antd';


const SearchModal = () => {
    //STATE HOOKS
    const [visible, setVisible] = useState(false);
    const [selection, setSelection] = useState('all');
    const [region, setRegion] = useState(null);
    const [activities, setActivities] = useState([]);
    const [regionHover, setRegionHover] = useState(false);
    const [activityHover, setActivityHover] = useState(false);

    //EFFECT HOOKS
    useEffect(()=> {
        console.log(activities)
    }, [activities])

    //FUNCTIONS
    //modal
    const showModal = () => {
        setVisible(!visible);
    };

    const handleCancel = () => {
        setSelection('all');
        setRegion(null);
        setActivities([])
        setVisible(false);
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

    let selected = <h3>Allons-y!</h3>;
    if (region) {
        selected = <h3>{ region }</h3>
    };


    let modalContent;
    if(selection === 'all') {
        modalContent = 
            <div style={ styles.selectionContent }>
                <Button
                style={ regionHover ? styles.buttonHover : styles.button }
                onClick={ ()=>setSelection('region') }
                onMouseEnter={ ()=>setRegionHover(true) }
                onMouseLeave={ ()=>setRegionHover(false) }>
                    <h2 style={ styles.buttonText }>Choisir une région</h2>
                </Button>
                <Button
                style={ activityHover ? styles.buttonHover : styles.button }
                onClick={ ()=>setSelection('trips') }
                onMouseEnter={ ()=>setActivityHover(true) }
                onMouseLeave={ ()=>setActivityHover(false) }>
                    <h2 style={ styles.buttonText }>Parcourir nos voyages<br/> recommendés</h2>
                </Button>
            </div>
    } else if (selection === 'region') {
        modalContent =
            <div>
                { selected }
                <SVGMap
                map={ France }
                onLocationClick={ (e)=>selectLocation(e) }
                />
            </div>
    } else if (selection === 'trips') {
        modalContent =
        <div>
            <h3>Quoi comme voyages?</h3>
            <div style={ styles.feelingContainer }>
                { activityCards }
            </div>
        </div>
    }
    
    return (
        <div style={ styles.container }>
            <Button onClick={ ()=>showModal() }></Button>
            <Modal
            title=''
            centered={ true }
            visible={ visible }
            footer={ null }
            onCancel={ ()=>handleCancel() }
            bodyStyle={ styles.modal }
            closable={ false }
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
    button: {
        width: '75%',
        height: '130px',
        backgroundColor: 'rgb(224, 104, 104)',
        color: 'white',
        border: 'none',
        margin: '2%',
    },
    buttonHover: {
        width: '80%',
        height: '130px',
        color: 'white',
        border: 'none',
        margin: '2%',
        backgroundColor: "rgba(224, 104, 104, 0.8)",
    },
    buttonText: {
        color: 'white',
        whiteSpace: 'wrap'
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