import React from 'react';
import { Button, Modal } from 'react-bootstrap';
export const ConfirmDeleteDialog = ({
    show, onClose,
    onConfirm
}) => {
    function handleConfirm() {
        onConfirm(...arguments);
        onClose();
    }

    function handleClose() {
        onClose();
    }

    return <>
        {show && <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Підтвердіть дію</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Скасувати
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Видалити
                </Button>
            </Modal.Footer>
        </Modal>}
    </>;
};
