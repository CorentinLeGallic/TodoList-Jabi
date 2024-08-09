/**
 * An object representing a task.
 * @typedef {Object} Task
 * @property {String} name - The name of the task.
 * @property {String} description - A brief description of the task.
 * @property {Date} deadline - The deadline for the task.
 * @property {String} state - The current state of the task (e.g., "PENDING", "COMPLETED", "EXPIRED").
 * @property {Number} id - A unique identifier for the task.
 */

/**
 * Converts a task.state value into a readable string.
 * @param {Task} task - The task object containing the state to be formatted.
 * @return {String} - A readable string representing the task's state.
 */

const formatTaskState = (task) => {

    switch (task.state) {
        case "COMPLETED":
            return "Complétée";
        case "PENDING":
            return "En cours";
        case "EXPIRED":
            return "En retard";
        default:
            return "";
    }
}

export default formatTaskState;