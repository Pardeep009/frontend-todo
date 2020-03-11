import React from 'react';

const Button = (props) => {
    // let class = "btn " + props.class
    return (
        <button type="button" className={"btn " + props.class} onClick={props.clickHandler} disabled={!props.disabled}>
            {props.text}
        </button>
    )
}

export default Button;