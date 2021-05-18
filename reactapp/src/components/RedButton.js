import React, { useState } from 'react';
import '../App.css';

import { Button } from 'antd';

const RedButton = (props) => {
    //STATE HOOKS
    const [hover, setHover] = useState(false);

    //DISPLAY MANAGEMENT
    if (props.transparent) {
        styles.button = {
            width: '30%',
            backgroundColor: 'rgba(224, 104, 104, 0.7)',
            color: 'white',
            border: 'none',
            margin: '2%',
        }        
        styles.buttonHover = {
            width: '30%',
            backgroundColor: 'rgba(224, 104, 104, 0.9)',
            color: 'white',
            border: 'none',
            margin: '2%',
        }
    };

    if(props.size === "large") {
        styles.buttonHover = {
            height: '130px',
            width: '75%',
            color: 'white',
            border: 'none',
            margin: '2%',
            backgroundColor: "rgba(224, 104, 104, 0.8)",
        }
        styles.button = {
            height: '130px',
            width: '75%',
            color: 'white',
            border: 'none',
            margin: '2%',
            backgroundColor: "rgba(224, 104, 104, 1)",
        }
    } else if (props.size === 'small') {
        styles.button = {
            width: '30%',
            backgroundColor: 'rgb(224, 104, 104)',
            color: 'white',
            border: 'none',
            margin: '2%',
        }
        styles.buttonHover = {
            width: '40%',
            color: 'white',
            border: 'none',
            margin: '2%',
            backgroundColor: "rgba(224, 104, 104, 0.8)",
        }
    }

    if (props.length === 'short' ) {
        styles.button = {
            width: '150px',
            backgroundColor: 'rgb(224, 104, 104)',
            color: 'white',
            border: 'none',
            margin: '2%',
        }
        styles.buttonHover = {
            width: '160px',
            color: 'white',
            border: 'none',
            margin: '2%',
            backgroundColor: "rgba(224, 104, 104, 0.8)",
        }
    } else if (props.length === 'medium') {
        styles.button = {
            width: '280px',
            backgroundColor: 'rgb(224, 104, 104)',
            color: 'white',
            border: 'none',
            margin: '2%',
        }
        styles.buttonHover = {
            width: '290px',
            color: 'white',
            border: 'none',
            margin: '2%',
            backgroundColor: "rgba(224, 104, 104, 0.8)",
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
        width: '120px',
        backgroundColor: 'rgb(224, 104, 104)',
        color: 'white',
        border: 'none',
        margin: '2%',
    },
    buttonHover: {
        width: '40%',
        color: 'white',
        border: 'none',
        margin: '2%',
        backgroundColor: "rgba(224, 104, 104, 0.8)",
    },
    buttonText: {
        color: 'white',
        whiteSpace: 'wrap',
        flexWrap: 'wrap'
    }
};

export default RedButton;