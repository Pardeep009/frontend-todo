import React from 'react';
import './Button.css';

const Button = (props) => {
    return (
            <button type="button" className="btn" onClick={props.clickHandler} disabled={!props.disabled}>
                {props.text}
            </button>
    )
}

export default Button;