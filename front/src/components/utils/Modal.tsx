import React, { ReactNode } from 'react';

interface ModalProps {
    title: string;
    onClose: () => void;
    children: ReactNode;

}

const ModalComponent: React.FC<ModalProps> = ({ title, onClose, children }) => {
    return (
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{title}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
};

export default ModalComponent;
