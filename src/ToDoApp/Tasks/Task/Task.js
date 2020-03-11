import React from 'react';

import Button from '../../Button/Button';
import './Task.css';

const Task = (props) => {
    
    return (
        <li>
            <div className="row task-li">
                <div className="col-sm-4 task-title" onClick={props.viewDescriptionHandler} >
                    <h3>{props.title}</h3>
                </div>
                <div className="col-sm-4">
                    <Button text={"Edit"} class={"btn-info"} clickHandler={props.editHandler} disabled={true} />
                    <Button text={"Delete"} class={"btn-danger"} clickHandler={props.deleteHandler} disabled={true} />
                </div>
                <div className="col-sm-4">

                </div>
            </div>
            
        </li>
    )
}

export default Task;