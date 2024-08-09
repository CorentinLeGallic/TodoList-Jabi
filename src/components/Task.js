import React, { useState } from 'react';
import formatDateTime from '../utils/formatDateTime';
import formatTaskState from '../utils/formatTaskState';

const Task = ({ task, handleEdit, handleDelete, handleCheckChange, style = {} }) => {

    // State to manage the visibility of the task details
    const [detailsAreVisible, setDetailsAreVisible] = useState(false);

    // Toggles the visibility of task details.
    const changeDetailsVisibility = () => {
        setDetailsAreVisible(!detailsAreVisible);
    };

    return (
        <li className="task" style={style}>
            <div className="task-header">
                <input onChange={() => handleCheckChange(task)} type="checkbox" className="task-checkbox" {...(task.state === "COMPLETED" ? { checked: true } : { checked: false })} />
                <div className="task-infos">
                    <h3 className="task-title">{task.name.toString()}</h3>
                    <p className="task-deadline">{formatDateTime(task.deadline)}</p>
                </div>
                <div className={"task-state " + task.state.toLowerCase()}>{formatTaskState(task)}</div>
                <button className="task-reveal" onClick={changeDetailsVisibility}>
                    <svg className={"task-reveal-icon" + (detailsAreVisible ? " active" : "")} xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                        <rect x="0" fill="none" width="24" height="24" />
                        <g>
                            <path d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586" />
                        </g>
                    </svg>
                </button>
            </div>
            <div className={"task-details" + (detailsAreVisible ? " visible" : "")}>
                <p className="task-description">{task.description}</p>
                <div className="task-actions">
                    <button onClick={handleEdit} className="task-action edit-task">Modifier</button>
                    <button onClick={handleDelete} className="task-action delete-task">Supprimer</button>
                </div>
            </div>
        </li >
    );
};

export default Task;