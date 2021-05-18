import React, { useState } from 'react';
import '../App.css';

import { Button } from 'antd';

const RedButton = (props) => {
    //STATE HOOKS
    const [hover, setHover] = useState(false);

    //DISPLAY MANAGEMENT
    if (props.transparent) {
        Object.assign({ ...styles.button }, { backgroundColor: 'rgba(224, 104, 104, 0.7)' })
    }
    if(props.size === "large") {
        Object.assign({ ...styles.button }, { height: '130px' })
    }

    return(
    <Button
    style={ hover ? styles.buttonHover : styles.button }
    onMouseEnter={ ()=>setHover(true) }
    onMouseLeave={ ()=>setHover(false) }>
        <h2 style={ styles.buttonText }>{ props.title }</h2>
    </Button>
    )
}

const styles = {
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
        color: 'white',
        border: 'none',
        margin: '2%',
        backgroundColor: "rgba(224, 104, 104, 0.8)",
    },
    buttonText: {
        color: 'white',
        whiteSpace: 'wrap'
    }
};

export default RedButton;