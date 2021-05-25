import React, { useState } from 'react';
import '../App.css';


const RedButton = (props) => {
    //STATE HOOKS
    const [hover, setHover] = useState(false);

    let title = <h2 style={ styles.buttonText }>{ props.title }</h2>;
    // if (props.title && props.title.split(' ').length > 3) {
    //     title = <h2 style={ styles.buttonText }>{ props.title.split(' ').slice(0, 3).join(' ')}<br/>{ props.title.split(' ').slice(3).join(' ')}</h2>
    // }

    
    return(
    <button
    style={ hover ? styles.buttonHover : styles.button }
    disabled={ props.disabled ? props.disabled : false }
    onMouseEnter={ ()=>setHover(true) }
    onMouseLeave={ ()=>setHover(false) }
    onClick={ props.onSelect ? ()=>props.onSelect() : null }>
        
        { title }
    </button>
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
        transform: `scale(1.07)`
    },
    buttonText: {
        color: 'white',
        whiteSpace: 'nowrap',
        flexWrap: 'nowrap',
        padding: 6,
        margin: 0,
        lineHeight: '1.6rem',
        fontSize: '0.9rem',
        fontWeight: 'bold'
    }
}

export default RedButton;