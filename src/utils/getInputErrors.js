/**
 * An object that contains input errors
 * @typedef {Object} InputErrors
 * @property {String|undefined} nameError - Error message if the name field is invalid.
 * @property {String|undefined} descriptionError - Error message if the description field is invalid.
 * @property {String|undefined} dateError - Error message if the date fields are invalid.
 */

/**
 * Checks that the input values are correct.
 * @param {Object} data - The input data to validate.
 * @param {String} data.name - The name value to validate.
 * @param {String} data.description - The description value to validate.
 * @param {String} data.year - The year of the date to validate.
 * @param {String} data.month - The month of the date to validate.
 * @param {String} data.day - The day of the date to validate.
 * @param {String} data.time - The time of the date to validate.
 * @return {InputErrors} - An object containing validation errors.
 */

const getInputErrors = (data) => {

    // Set an object to store potential errors
    const errors = {
        nameError: null,
        descriptionError: null,
        dateError: null
    }

    // Validate the "name" field
    if (data.name.length < 1) {
        errors.nameError = "Ce champ est obligatoire.";
    } else if (data.name.length > 25) {
        errors.nameError = "Le nom ne doit pas dépasser 25 caractères.";
    }

    // Validate the "description" field
    if (data.description.length < 1) {
        errors.descriptionError = "Ce champ est obligatoire.";
    } else if (data.description.length > 45) {
        errors.descriptionError = "La description ne doit pas dépasser 45 caractères.";
    }

    // Create a Date object from the provided data
    const date = new Date(data.year, data.month - 1, data.day, data.time.split(":")[0], data.time.split(":")[1])

    // Validate the "date" fields
    if (isNaN(date)) {
        errors.dateError = "Veuillez saisir une date valide.";
    } else if (new Date() > date) {
        errors.dateError = "Veuillez saisir une date ultérieure.";
    }

    return errors;
}

export default getInputErrors;