import React, { useContext, useState } from 'react';
import ModalOverlay from './ModalOverlay';
import { ModalContext } from '../contexts/Contexts';
import getInputErrors from '../utils/getInputErrors';

const FormModal = ({ modalTitle, handleSubmit, defaultValues = { name: "", description: "", date: { day: "", month: "", year: "", time: "" } }, style = {} }) => {

    // Retrieve the hideModal function from the ModalContext to hide modals
    const { hideModal } = useContext(ModalContext);

    // State to manage form input errors
    const [error, setError] = useState({
        nameError: null,
        descriptionError: null,
        dateError: null
    });

    // Handle form submission: validate inputs and either submit the form or show errors
    const handleSubmitAndClose = (e) => {
        e.preventDefault();

        // Retrieve the inputs data and store them in an object
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Get errors in inputs data
        const errors = getInputErrors(data);

        // Check if there are no errors in the inputs data
        if (Object.values(errors).every(el => el === null)) {

            // Reset errors
            setError({
                nameError: null,
                descriptionError: null,
                dateError: null
            });

            // Ccall the submit handler
            handleSubmit(data);

            // Close the modal
            hideModal();
        } else {
            // Set errors to display validation messages
            setError(errors);
        }
    }

    return (
        <ModalOverlay>
            <div className="form-modal" style={style}>
                <h2 className="form-modal-title">{modalTitle}</h2>
                <hr className="form-modal-separator" />
                <form action="" className="modal-form" onSubmit={handleSubmitAndClose}>
                    <div className="modal-form-input-container">
                        <label htmlFor="name" className="modal-form-label">Nom :</label>
                        <input defaultValue={defaultValues.name} type="text" name="name" id="modal-form-name" maxLength="25" className="modal-form-input" required />
                    </div>
                    {error.nameError && <p role="alert" className="input-error">{error.nameError}</p>}
                    <div className="modal-form-input-container">
                        <label htmlFor="description" className="modal-form-label">Description :</label>
                        <textarea defaultValue={defaultValues.description} name="description" id="modal-form-description" maxLength="45" cols="30" rows="2" spellCheck="false" className="modal-form-input" required></textarea>
                    </div>
                    {error.descriptionError && <p role="alert" className="input-error">{error.descriptionError}</p>}
                    <div className="modal-form-input-container">
                        <label className="modal-form-label">Date (JJ/MM/AA) :</label>
                        <div className="modal-form-date-container">
                            <input defaultValue={defaultValues.date.day} type="number" name="day" min="1" max="31" id="modal-form-day" minLength="2" maxLength="2" className="modal-form-date modal-form-input" required />
                            <span className="date-separator">/</span>
                            <input defaultValue={defaultValues.date.month} type="number" name="month" min="1" max="12" id="modal-form-month" minLength="2" maxLength="2" className="modal-form-date modal-form-input" required />
                            <span className="date-separator">/</span>
                            <input defaultValue={defaultValues.date.year} type="number" name="year" min={new Date().getFullYear()} id="modal-form-year" minLength="4" maxLength="4" className="modal-form-date modal-form-input" required />
                            <span className="date-separator">à</span>
                            <input defaultValue={defaultValues.date.time} type="time" name="time" id="modal-form-time" className="modal-form-input" required />
                        </div>
                    </div>
                    {error.dateError && <p role="alert" className="input-error">{error.dateError}</p>}
                    <div className="modal-form-actions">
                        <button type="button" onClick={hideModal} id="cancel-modal-form" className="modal-form-action">Annuler</button>
                        <button type="submit" id="submit-modal-form" className="modal-form-action">Valider</button>
                    </div>
                </form>
            </div>
        </ModalOverlay>
    );
};

export default FormModal;