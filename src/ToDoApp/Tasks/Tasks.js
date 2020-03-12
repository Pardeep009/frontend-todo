import React from 'react';

import Task from './Task/Task';
import './Tasks.css';

const Tasks = (props) => {
    
    let tasks = props.tasks.map((task,index) => {
        return (                
                <Task 
                key={index}
                title={task.title}
                viewDescriptionHandler = {() => props.viewDescriptionHandler(index)}
                editHandler={() => props.editHandler(index)}
                deleteHandler={() => props.deleteHandler(index,task._id)} />
        );
    })
    
    return (
        <ul>
             <li key={"headline"}>
                    <div className="row">
                        <div className="col-sm-4 task-title-headline">
                            <h1 className="">Title</h1>
                            <h6>(Click on Titles to view Description)</h6>
                        </div>
                        <div className="col-sm-4 task-action-headline">
                            <h1 className="">Actions</h1>
                        </div>
                        <div className="col-sm-4">

                        </div>

                    </div>
                </li>
            {tasks}
        </ul>
    )
}

export default Tasks;