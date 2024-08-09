import React, { useContext, useRef } from 'react';
import { ModalContext } from '../contexts/Contexts';

const ModalOverlay = ({ children }) => {

    // Retrieve the hideModal function from the ModalContext to hide modals
    const { hideModal } = useContext(ModalContext);

    // Create a reference for the overlay element
    const overlay = useRef();

    // Close the modal in the overlay is clicked
    const handleOverlayClick = (e) => {
        if (e.target === overlay.current) {
            hideModal();
        }
    }

    return (
        <div ref={overlay} className="modal-overlay" onClick={handleOverlayClick}>
            {children}
        </div>
    );
};

export default ModalOverlay;