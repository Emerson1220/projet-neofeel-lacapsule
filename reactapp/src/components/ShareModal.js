import React, { useState } from 'react';

//UI
import { Modal, notification } from 'antd';
import RedButton from './RedButton';

//REDUX
import { connect } from 'react-redux';

const ShareModal = (props) => {
    const [tripData, setTripData] = useState({});
    console.log(props.roadtrip)
    //HTTP REQUESTS
    const shareTrip = async() => {
        let data = JSON.stringify({
            token: props.user.token,
            roadtripID: props.roadtrip.id,
            roadtripName: props.roadtrip.name,
            comment: tripData.comment,
            duration: tripData.duration
        })
        let rawResponse = await fetch('/sharetrip', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `data=${data}`
        });
        let response = await rawResponse.json();
        if (response.result === true) {
            openNotification('success', 'Voyage partagé!')
        } else if (response.message === 'not authorized') {
            openNotification('error', 'Vous ne pouvez que partager vos propre voyages.', 'Erreur')
        } else {
            openNotification('warning', "Le partage de voyage n'a pas pu aboutir. Veuillez réessayer.", 'Erreur')
        }
    }

    //FUNCTIONS
    const openNotification = (type, message, title) => {
        notification[type] ({
            description: message,
            placement: 'bottomRight',
            message: title
        })
    };

    const changeTripData = (field, value) => {
        let tripCopy = {tripData};
        tripCopy[field] = value;
        setTripData(tripCopy)
    }

    return (
        <div style={ styles.container } >
            <Modal
            title="Partager mon expérience NEOFEEL"
            centered={ true }
            visible={ props.visible }
            handleCancel={ ()=>props.toggleModal() }
            footer={ null }
            maskClosable={ true }
            >
                <h3>{ props.roadtrip.name }</h3>
                <form style={ styles.form}>
                    <label for='duration'>Durée</label>
                    <div>
                        <input name='duration' type="number" onChange={ (e)=>changeTripData('duration', e.target.value)}></input><span> jours</span>
                    </div>
                    <label for='comment' onChange={ (e)=>changeTripData('comment', e.target.value) }>Commentaire</label>
                    <textarea name='comment'></textarea>
                    <label for='photos'>Photos</label>
                    <input name="photos" type="file" accept="image/png, image/jpeg" multiple onChange={ (e)=>changeTripData('photos', e.target.files) }></input>
                </form>
                    <RedButton
                        title="Confirm"
                        onSelect={ ()=>shareTrip() }
                    />
            </Modal>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    null
)(ShareModal);

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        alignItems: 'center'
    },
}