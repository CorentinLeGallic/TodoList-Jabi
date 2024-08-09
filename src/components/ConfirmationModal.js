import React, { useContext } from 'react';
import ModalOverlay from './ModalOverlay';
import { ModalContext } from '../contexts/Contexts';

const ConfirmationModal = ({ modalTitle, modalQuestion, handleSubmit, style = {} }) => {

    // Retrieve the hideModal function from the ModalContext to hide modals
    const { hideModal } = useContext(ModalContext);

    // Handle form confirmation and close the modal
    const handleSubmitAndClose = (e) => {
        e.preventDefault();
        handleSubmit();
        hideModal();
    }

    return (
        <ModalOverlay>
            <div className="confirmation-modal" style={style}>
                <h2 className="confirmation-modal-title">{modalTitle}</h2>
                <hr className="confirmation-modal-separator" />
                <form action="" className="confirmation-modal-form" onSubmit={handleSubmitAndClose}>
                    <p className="confirmation-question">{modalQuestion}</p>
                    <div className="confirmation-modal-actions">
                        <button type="button" onClick={hideModal} id="cancel-confirmation-modal" className="confirmation-modal-action">Annuler</button>
                        <button type="submit" id="submit-confirmation-modal" className="confirmation-modal-action">Valider</button>
                    </div>
                </form>
            </div>
        </ModalOverlay>
    );
};

export default ConfirmationModal;