import React, { useState, useEffect } from 'react';

//MAP
import France from '@svg-maps/france.departments';
import { SVGMap } from 'react-svg-map';
import '../styles/map.css'

//UI
import { Modal, Button } from 'antd';
import RedButton from './RedButton';

//REDUX
import { connect } from 'react-redux';


const SearchModal = (props) => {
    //STATE HOOKS
    const [selection, setSelection] = useState('all');
    const [region, setRegion] = useState(null);
    const [activities, setActivities] = useState([]);
    const [options, setOptions] = useState([]);

    //EFFECT HOOKS
    useEffect(()=> {
        getOptions();
    }, [])

    //FUNCTIONS
    //select region
    var selectRegion = async () => {
        let rawResponse = await fetch('/searchregions', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body : `region=${props.region}`
        })
        let response = await rawResponse.json();
        props.onSearch(response.data)
    }

    //select activities
    var selectActivity = async () => {
        let rawResponse = await fetch('/searchtrips', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body : `activities=${JSON.stringify(props.activities)}`
        });
        let response = await rawResponse.json();
        props.onSearch(response.data)
    }

    //get list activity options from back
    const getOptions = async () => {
        let rawResponse = await fetch('/activities');
        let response = await rawResponse.json();
        setOptions(response.data);
    } 

    //close modal
    const handleCancel = () => {
        setSelection('all');
        setRegion(null);
        setActivities([])
        props.showModal();
    };

    //map
    const selectLocation = (e) => {
        setRegion({ name: e.target.getAttribute('name'), id: e.target.getAttribute('id') });
        props.onRegionClick(e.target.getAttribute('id'));
    };

    //manage list of activities
    const filterTrips = (e) => {
        let temp = [...activities];
        let index = temp.findIndex(f => f === e)
        index > -1 ? temp.splice(index, 1) : temp.push(e);
        setActivities(temp);
        props.onActivityClick(temp)
    }

    //DISPLAY TREATMENT
    let activityCards = options.map((e,i) => {
        return activities.find(f => f === e) 
        ? 
        <Button
        key={ i }
        style={ Object.assign({...styles.feeling}, { border: 'solid rgb(224, 104, 104) 2px' }) }
        onClick={ ()=>filterTrips(e) } >
            <img style={ styles.picto } src={ `images/pictos/${e}-8.png` } alt={ e }/>
        </Button>
        : 
        <Button
        key={ i }
        style={ styles.feeling }
        onClick={ ()=>filterTrips(e) }>
            <img style={ styles.picto } src={ `images/pictos/${e}-8.png` } alt={ e }/>
        </Button>
    })

    let selected = <h3>Choisissez votre destination</h3>;
    let selectButton;
    if (region) {
        selected = <h3>{ region.name }</h3>
        selectButton = <RedButton title="Allons-y!" size="small" onSelect={()=> selectRegion()} />
    }else if (activities.length > 0){
        selected = <h3>{ region }</h3>
        selectButton = <RedButton title="Allons-y!" size="small" onSelect={()=> selectActivity()}/>
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
                locationClassName=''
                />
            { selectButton }
            </div>
    } else if (selection === 'trips') {
        modalContent =
        <div style={ styles.activityModal }>
            <h3>Sélectionnez vos envies</h3>
            <div style={ styles.feelingContainer }>
                { activityCards }
            </div>
            { selectButton }
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
            maskStyle={ styles.modalMask }
            width={ selection === 'trips' ? "54%" : "520px" }
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
    selectButton: {
        alignSelf: 'center'
    },
    feeling: {
        height: '100px',
        width: '100px',
        boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.6)',
        margin: '2%',
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
    },
    modalMask: {
        backgroundColor: "rgba(133, 187, 197, 0.6)"
    },
    activityModal: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    tripsModal: {
        backgroundColor: 'rgba(244, 244, 246, 0.5)',
        borderRadius: '15px',
        minWidth: '70%',
        maxHeight: '50%'
    },
}

function mapDispatchToProps(dispatch) {
    return {
        onRegionClick: function(region) {
            dispatch({ type: 'selectRegion', region: region })
        },
        onActivityClick: function(activities) {
            dispatch({ type: 'selectActivities', activities: activities })
        },
        onSearch: function(data) {
            dispatch({ type: 'search', experiences: data })
        }
    }
}

function mapStateToProps(state) {
    return { activities: state.activities, region: state.region }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchModal);