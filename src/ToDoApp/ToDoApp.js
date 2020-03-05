import React, { Component } from 'react';
import { isAuthenticated } from "../auth";
import TaskInput from './TaskInput/TaskInput';
import Button from './Button/Button';
import Tasks from './Tasks/Tasks';
import Modal from './Modal/Modal';

import './ToDoApp.css';

const token = isAuthenticated().token;
const tasks_On_One_Page = 10;

class ToDoApp extends Component {

    constructor() {
        super();
        this.state = {
            task_title : '',
            task_description : '',
            tasks : [],
            is_Editing_Task : false,
            Editing_Task_Index : -1,
            is_Viewing_Task_Description : false,
            viewing_Task_Description_Index : -1,
            current_page_no : 0,
            show_Next_Tasks : false,
            show_Prev_Tasks : false,
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/getTasks`, {
            method : 'POST',
            headers : {
                Accept : "application/json",
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            },
            body : JSON.stringify({
                user_id : this.props.match.params.userid,
                skip_count : this.state.current_page_no*10,
            }),
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            let next_tasks = false;
            if(response.tasks.length > tasks_On_One_Page) {
                response.tasks.splice(tasks_On_One_Page,1);
                next_tasks = true;
            }
            this.setState({
                show_Next_Tasks : next_tasks,
                tasks : response.tasks,
            })
        })
        .catch(err => console.log(err));
    }

    handleClick = () => {
        if(this.state.is_Editing_Task === true) {
            this.updateTask()
        }
        else {
            this.addTask();
        }
    }

    addTask = () => {
        let new_task_title = this.state.task_title;
        let new_task_description = this.state.task_description;
        if(new_task_title === '' || new_task_description === '') {
            alert('Enter all fields');
            return;
        }
        fetch(`http://localhost:5000/addTask`, {
            method : 'POST',
            headers : {
                Accept : "application/json",
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            },
            body : JSON.stringify({
                user_id : this.props.match.params.userid,
                new_task_title : this.state.task_title,
                new_task_description : this.state.task_description
            }),
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            let next_tasks = false;
            let new_tasks = [...this.state.tasks];
            if(this.state.tasks.length < 10)
            {
                let task = {
                    _id : response.task_id,
                    title : new_task_title,
                    description : new_task_description,
                }
                new_tasks.push(task);
            }
            else {
                next_tasks = true;
            }
            this.setState({
                task_title : '',
                task_description : '',
                show_Next_Tasks : next_tasks,
                tasks : new_tasks,
            })
        })
        .catch(err => console.log(err));
    }

    deleteTask = (index,task_id) => {
        fetch(`http://localhost:5000/deleteTask`, {
            method : 'POST',
            headers : {
                Accept : "application/json",
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            },
            body : JSON.stringify({
                user_id : this.props.match.params.userid,
                task_id : task_id
            }),
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            let updated_tasks = [...this.state.tasks];
            updated_tasks.splice(index,1);
            this.setState({
                tasks : updated_tasks,
            },() => {

            })
        })
        .catch(err => console.log(err));
    }

    modalCloseHandler = () => {
        this.setState({
            is_Viewing_Task_Description : false,
            viewing_Task_Description_Index : -1
        })
    }

    updateTask = () => {
        fetch(`http://localhost:5000/updateTask`, {
            method : 'POST',
            headers : {
                Accept : "application/json",
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            },
            body : JSON.stringify({
                task_id : this.state.tasks[this.state.Editing_Task_Index]._id,
                task_title_new : this.state.task_title,
                task_description_new : this.state.task_description
            }),
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            let updated_tasks = [...this.state.tasks];
            updated_tasks[this.state.Editing_Task_Index].title = this.state.task_title;
            updated_tasks[this.state.Editing_Task_Index].description = this.state.task_description;
            this.setState({
                tasks : updated_tasks,
                task_title : '',
                task_description : '',
                is_Editing_Task : false,
                Editing_Task_Index : -1,
            })
        })
        .catch(err => console.log(err));
    }

    editTask = (index) => {
        this.setState({
            task_title : this.state.tasks[index].title,
            task_description : this.state.tasks[index].description,
            is_Editing_Task : true,
            Editing_Task_Index : index,
        })
    }

    showTaskDescription = (index) => {
        this.setState({
            is_Viewing_Task_Description : true,
            viewing_Task_Description_Index : index
        })
    }

    showNextTasks = () => {
        fetch(`http://localhost:5000/getTasks`, {
            method : 'POST',
            headers : {
                Accept : "application/json",
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            },
            body : JSON.stringify({
                user_id : this.props.match.params.userid,
                skip_count : (this.state.current_page_no+1)*10,
            }),
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            let next_tasks = false
            if(response.tasks.length > tasks_On_One_Page) {
                response.tasks.splice(tasks_On_One_Page,1);
                next_tasks = true;
            } 

            this.setState({
                show_Prev_Tasks : true,
                current_page_no : this.state.current_page_no + 1,
                show_Next_Tasks : next_tasks,
                tasks : response.tasks
            })
        })
        .catch(err => console.log(err));
    }

    showPrevTasks = () => {
        fetch(`http://localhost:5000/getTasks`, {
            method : 'POST',
            headers : {
                Accept : "application/json",
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            },
            body : JSON.stringify({
                user_id : this.props.match.params.userid,
                skip_count : (this.state.current_page_no-1)*10,
            }),
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            let prev_tasks = true;
            let next_tasks = false;
            if(response.tasks.length > tasks_On_One_Page) {
                response.tasks.splice(tasks_On_One_Page,1);
                next_tasks = true;
            } 
            if(this.state.current_page_no-1 == 0)
            {   
                prev_tasks = false;
            }
            this.setState({
                current_page_no : this.state.current_page_no - 1,
                show_Next_Tasks : next_tasks,
                tasks : response.tasks,
                show_Prev_Tasks : prev_tasks,
            })
        })
        .catch(err => console.log(err));
    }

    render() {
        let btnText = 'Add Task';
        let modalContent = null;

        if(this.state.is_Editing_Task === true) {
            btnText = 'Update Task';
        }

        if(this.state.is_Viewing_Task_Description === true) {
            modalContent =  <>
                                <p> Title :&nbsp;
                                    {
                                        this.state.tasks[this.state.viewing_Task_Description_Index].title
                                    }
                                </p>

                                <p> Description :&nbsp; 
                                    {
                                        this.state.tasks[this.state.viewing_Task_Description_Index].description
                                    }
                                
                                </p>
                            </>
        }

        return (
            <div className="row">
                <div className="col-sm-3"></div>
                
                <div className="col-sm-6">
                    <div className="container todo">

                        <Modal show={this.state.is_Viewing_Task_Description} modalClosed={this.modalCloseHandler}>
                            {modalContent}
                        </Modal>
                        <TaskInput 
                            title={this.state.task_title} 
                            description={this.state.task_description}
                            titleInputHandler={(event) => this.setState({task_title : event.target.value})}
                            descriptionInputHandler={(event) => this.setState({task_description : event.target.value})} />
                        <Button
                            text = {btnText}
                            clickHandler = {this.handleClick}
                            disabled= {true}
                            class = {"btn-success"} />
                        {
                            !this.state.is_Editing_Task ? 
                            <>
                                <Tasks 
                                tasks = {this.state.tasks}
                                editHandler = {this.editTask}
                                deleteHandler = {this.deleteTask}
                                viewDescriptionHandler = {this.showTaskDescription} />
                                <Button 
                                    text={"Prev"}
                                    class={"btn-primary"} 
                                    disabled={this.state.show_Prev_Tasks} clickHandler={this.showPrevTasks}/>
                                <Button 
                                    text={"Next"}
                                    class={"btn-primary"} 
                                    disabled={this.state.show_Next_Tasks} clickHandler={this.showNextTasks} />
                            </>
                            : null 
                        }

                    </div>
                </div>

                <div className="col-sm-3"></div>

            </div>
        )
    }

}

export default ToDoApp;