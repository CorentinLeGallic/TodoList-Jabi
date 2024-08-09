import { createContext, useState, useMemo, cloneElement } from "react";
import { useTransition } from "react-spring";

// Create a context for managing modal visibility and content
export const ModalContext = createContext();

// Provider component for managing modals
export const ModalProvider = ({ children }) => {
    // State to hold the current modal component
    const [modal, setModal] = useState(null);

    // Define transition effects on modal using react-spring
    const modalTransition = useTransition(modal, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: {
            duration: 150
        }
    })

    return (
        <ModalContext.Provider value={
            useMemo(() => ({
                showModal: setModal,
                hideModal: () => setModal(null)
            }), [])
        }>
            {children}
            {modalTransition((style, item) =>
                item && cloneElement(item, { style: { ...item.props.style, ...style } })
            )}
        </ModalContext.Provider>
    );
}