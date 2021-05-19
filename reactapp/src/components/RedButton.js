import React, { useState } from 'react';
import '../App.css';

import { Button } from 'antd';

const RedButton = (props) => {
    //STATE HOOKS
    const [hover, setHover] = useState(false);


    //DISPLAY MANAGEMENT
    if(props.size === "large") {
        styles.button = {
            height: '100px',
            width: '75%',
            border: 'none',
            margin: '2%',
            backgroundColor: "rgba(224, 104, 104, 1)",
            boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.1)',
            borderRadius: '7px'
        }
        styles.buttonHover = {
            height: '100px',
            width: '75%',
            border: 'none',
            margin: '2%',
            backgroundColor: "rgba(224, 104, 104, 0.8)",
            boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.1)',
            borderRadius: '7px',
            transform: `scale(1.05)`
        }
        styles.buttonText = {
            color: 'white',
            whiteSpace: 'wrap',
            flexWrap: 'wrap',
            padding: 0,
            lineHeight: '1.6rem',
            fontSize: '0.8rem',
            fontWeight: 'bold'
        }
    } else if (props.size === 'small') {
        styles.button = {
            backgroundColor: 'rgb(224, 104, 104)',
            border: 'none',
            margin: '2%',
            boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.1)',
            borderRadius: '7px'
        }
        styles.buttonHover = {
            border: 'none',
            margin: '2%',
            backgroundColor: "rgba(224, 104, 104, 0.8)",
            boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.1)',
            borderRadius: '7px',
            transform: `scale(1.05)`
        }
    } else if (props.size === 'short') {
        styles.button = {
            backgroundColor: 'rgb(224, 104, 104, 0.9)',
            border: 'none',
            margin: '2%',
            boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.1)',
            borderRadius: '7px',
            width: '60%'
        }
        styles.buttonHover = {
            backgroundColor: "rgba(224, 104, 104)",
            border: 'none',
            margin: '2%',
            boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.1)',
            borderRadius: '7px',
            transform: `scale(1.05, 1)`
        }
    }

    let title = <h2 style={ styles.buttonText }>{ props.title }</h2>;
    if (props.title.split(' ').length > 3) {
        title = <h2 style={ styles.buttonText }>{ props.title.split(' ').slice(0, 3).join(' ')}<br/>{ props.title.split(' ').slice(3).join(' ')}</h2>
    }

    return(
    <Button
    style={ hover ? styles.buttonHover : styles.button }
    onMouseEnter={ ()=>setHover(true) }
    onMouseLeave={ ()=>setHover(false) }
    onClick={ ()=>props.onSelect() }>
        { title }
    </Button>
    )
}

const styles = {
    button: {
        backgroundColor: 'rgb(224, 104, 104)',
        border: 'none',
        margin: '2%',
        boxShadow: '2px, 2px, 2px rgba(0, 0, 0, 0.5)',
        borderRadius: '5px'
    },
    buttonHover: {
        border: 'none',
        margin: '2%',
        backgroundColor: "rgba(224, 104, 104, 0.8)",
        borderRadius: '5px',
        transform: `scale(1.05)`
    },
    buttonText: {
        color: 'white',
        whiteSpace: 'wrap',
        flexWrap: 'wrap',
        padding: 0,
        lineHeight: '1.6rem',
        fontSize: '0.8rem',
    }
}

export default RedButton;