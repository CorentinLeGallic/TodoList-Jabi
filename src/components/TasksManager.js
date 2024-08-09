import React, { Fragment, useReducer, useState, useContext, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import Task from './Task';
import { ModalContext } from '../contexts/Contexts';
import FormModal from './FormModal';
import ConfirmationModal from './ConfirmationModal';
import tasksReducer from '../reducers/tasksReducer';

const TasksManager = () => {

    // Retrieve the showModal function from the ModalContext to display modals
    const { showModal } = useContext(ModalContext);

    // Initialize state management for tasks using useReducer
    const [tasks, tasksDispatch] = useReducer(tasksReducer, {
        maxId: 3,
        values: [
            {
                name: "Acheter du pain",
                description: "Aller à la boulangerie, acheter du pain",
                deadline: new Date(2024, 7, 8, 17, 11),
                state: "COMPLETED",
                id: 1
            },
            {
                name: "Faire le ménage",
                description: "Prendre un balais, balayer, ranger le balais.",
                deadline: new Date(2024, 7, 8, 17, 15),
                state: "EXPIRED",
                id: 2
            },
            {
                name: "Todo List Jabi",
                description: "Développer une petite Todo List avec React pour Jabi",
                deadline: new Date(2024, 7, 9, 17, 0),
                state: "PENDING",
                id: 3
            }
        ]
    });

    // Update tasks state every minutes
    useEffect(() => {
        // Update tasks state on first render
        tasksDispatch({ type: 'UPDATE_STATES' });

        // Calculate time remaining until the next minute
        const now = new Date();
        const msBeforeNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

        // Schedule an update the next minute
        setTimeout(() => {
            tasksDispatch({ type: 'UPDATE_STATES' });

            // Set up an interval to update task states every minute
            const intervalId = setInterval(() => {
                tasksDispatch({ type: 'UPDATE_STATES' });
            }, 60000);

            return () => clearInterval(intervalId);
        }, msBeforeNextMinute);
    }, []);

    // Set up transitions for animating task elements using react-spring
    const tasksTransitions = useTransition(tasks.values, {
        from: { maxHeight: 135 },
        enter: { maxHeight: 135 },
        leave: { maxHeight: 0 },
        keys: tasks.values.map(task => task.id),
        config: {
            duration: 150
        }
    })

    // State for managing the search input value
    const [searchValue, setSearchValue] = useState("");

    // Handle adding a new task
    const handleAddSubmit = (data) => {
        tasksDispatch({ type: "ADD", payload: data })
    }

    // Handle editing an existing task
    const handleEditSubmit = (data, task) => {
        tasksDispatch({
            type: "EDIT",
            payload: {
                task: task,
                data: data
            }
        })
    }

    // Handle deleting an existing task
    const handleDeleteSubmit = (task) => {
        tasksDispatch({ type: "DELETE", payload: task });
    }

    // Open a modal to add a new task
    const handleAdd = () => {
        const AnimatedFormModal = animated(FormModal)
        showModal(<AnimatedFormModal modalTitle="Ajouter une tâche" handleSubmit={handleAddSubmit} />);
    }

    // Open a modal to edit an existing task
    const handleEdit = (task) => {
        const AnimatedFormModal = animated(FormModal)
        showModal(<AnimatedFormModal modalTitle="Modifier une tâche" handleSubmit={(data) => handleEditSubmit(data, task)} defaultValues={{
            name: task.name, description: task.description, date: { day: (task.deadline.getDate() < 10 ? '0' : '') + task.deadline.getDate(), month: (task.deadline.getMonth() + 1 < 10 ? '0' : '') + (task.deadline.getMonth() + 1), year: task.deadline.getFullYear(), time: `${(task.deadline.getHours() < 10 ? '0' : '') + task.deadline.getHours()}:${(task.deadline.getMinutes() < 10 ? '0' : '') + task.deadline.getMinutes()}` }
        }} />);
    }

    // Open a modal to confirm deletetion an existing task
    const handleDelete = (task) => {
        const AnimatedConfirmationModal = animated(ConfirmationModal)
        showModal(<AnimatedConfirmationModal modalTitle="Supprimer une tâche" modalQuestion="Êtes-vous sûr de vouloir supprimer cette tâche ?" handleSubmit={() => handleDeleteSubmit(task)} />);
    }

    // Check or uncheck a task
    const handleCheckChange = (task) => {
        tasksDispatch({ type: "CHECK_CHANGE", payload: task })
    }

    // Create an animated version of the Task component to use with react-spring transitions
    const AnimatedTask = animated(Task);

    return (
        <div id="tasks-manager">
            <input type="text" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} id="search-bar" placeholder="Rechercher..." />
            <ul id="tasks-container">
                {tasksTransitions((style, task) => (
                    task.name.includes(searchValue) &&
                    <Fragment key={task.id}>
                        <hr className="task-separator" />
                        <AnimatedTask key={task.id} style={style} task={task} handleEdit={() => handleEdit(task)} handleDelete={() => handleDelete(task)} handleCheckChange={handleCheckChange} />
                    </ Fragment>
                ))}
                <hr className="task-separator" />
            </ul>
            <button onClick={handleAdd} id="add-task">Ajouter</button>
        </div >
    );
};

export default TasksManager;