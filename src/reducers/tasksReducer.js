/**
 * Reducer function for managing tasks. This function processes different types of actions to update the state of tasks.
 * @param {Object} tasks - The current state of tasks.
 * @param {Object} action - The action to be processed.
 * @param {string} action.type - The type of action to be performed. It can be one of:
 *   - "ADD" : Adds a new task.
 *   - "EDIT" : Edits an existing task.
 *   - "CHECK_CHANGE" : Toggles the completion state of a task.
 *   - "DELETE" : Deletes a task.
 *   - "UPDATE_STATES" : Updates the states of tasks based on their deadlines.
 * @param {Object} [action.payload] - The data associated with the action. The structure depends on the action type:
 *   - For 'ADD': { name: string, description: string, year: string, month: string, day: string, time: string }
 *   - For 'EDIT': { task: Object, data: { name: string, description: string, year: string, month: string, day: string, time: string } }
 *   - For 'CHECK_CHANGE': { task: Object }
 *   - For 'DELETE': { task: Object }
 * @returns {Object} The updated state of tasks.
 * @returns {number} return.maxId - The updated maximum ID for tasks.
 * @returns {Array<Object>} return.values - The list of tasks, each represented by:
 *   - { name: string, description: string, deadline: Date, state: string, id: number }
 *   - `name`: The name of the task.
 *   - `description`: The description of the task.
 *   - `deadline`: The deadline of the task as a `Date` object.
 *   - `state`: The current state of the task, which can be 'PENDING', 'COMPLETED', or 'EXPIRED'.
 *   - `id`: The unique identifier for the task.
 */

const tasksReducer = (tasks, action) => {
    switch (action.type) {

        // Handles adding a new task
        case 'ADD':
            return {
                maxId: tasks.maxId + 1,
                values: [...tasks.values, {
                    name: action.payload.name,
                    description: action.payload.description,
                    deadline: new Date(action.payload.year, Number(action.payload.month) - 1, action.payload.day, action.payload.time.split(":")[0], action.payload.time.split(":")[1]),
                    state: "PENDING",
                    id: tasks.maxId + 1
                }]
            }

        // Handles editing an existing task
        case 'EDIT':
            return {
                ...tasks,
                values: tasks.values.map(task => task === action.payload.task ? {
                    ...task,
                    name: action.payload.data.name,
                    description: action.payload.data.description,
                    deadline: new Date(action.payload.data.year, action.payload.data.month - 1, action.payload.data.day, action.payload.data.time.split(":")[0], action.payload.data.time.split(":")[1]),
                    state: "PENDING"
                } : task)
            };

        // Handles changing the completion status of a task
        case 'CHECK_CHANGE':
            return {
                ...tasks,
                values: tasks.values.map(task => task === action.payload ? { ...task, state: (task.state !== "COMPLETED") ? "COMPLETED" : (task.deadline > new Date()) ? "PENDING" : "EXPIRED" } : task)
            };

        // Handles deleting a task
        case 'DELETE':
            return {
                ...tasks,
                values: tasks.values.filter(task => task !== action.payload)
            };

        // Handles updating the states of tasks based on deadlines
        case 'UPDATE_STATES':
            return {
                ...tasks,
                values: tasks.values.map((task) => {
                    if (task.state !== "COMPLETED" && task.deadline < new Date()) {
                        return { ...task, state: "EXPIRED" };
                    }
                    return task;
                })
            };

        // Return the current state if the action type is not recognized
        default:
            return tasks;
    }
};

export default tasksReducer;