import React from 'react';
// import Input from './Input/Input';
import './TaskInput.css';

const TaskInput = (props) => {

    return (
        <div>
            <div className="form-group">
                <label htmlFor="usr" >Title:</label>
                <input type="text" className="form-control" value={props.title} onChange={props.titleInputHandler} placeholder="Enter Title" id="usr" maxLength="20" />
            </div>
            <div className="form-group">
                <label htmlFor="usr" >Description:</label>
                <textarea id="usr" rows="3" className="form-control" value={props.description} onChange={props.descriptionInputHandler} placeholder="Enter Description" maxLength="250" />
            </div>
        </div>
    )

};

export default TaskInput;