import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function ErrorMessage(props) {
    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.page}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}

export default ErrorMessage;
