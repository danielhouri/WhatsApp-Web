import React, { useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ErrorMessage from '../../../ErrorMessage/ErrorMessage';
import { FetchAddNewContact, FetchSendInvitation } from '../../../Req';


function NewChat(props) {

    const nickname = useRef(null);
    const username = useRef(null);
    const server = useRef(null);

    const [show, setShow] = useState(false);
    const [messageErr, setMessageErr] = useState('');

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const handleAddClose = async () => {
        if (((await FetchSendInvitation(server.current.value, localStorage.getItem('userId'), username.current.value)) == 201) &&
            (await FetchAddNewContact(localStorage.getItem('token'), username.current.value, nickname.current.value, server.current.value) == 201)) {
            props.setRefresh(props.refresh + 1);
            await props.connection.invoke("ContactChanged", props.refresh, username.current.value);
            props.handleClose();
        }
        else {
            setMessageErr("Adding a new contact failed, check username and the server address");
            handleOpen();
        }

    };

    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Chat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="recipient-name" className="col-form-label">Enter the nickname:</label>
                    <input ref={nickname} className="form-control new_chat" onKeyPress={(e) => e.key === 'Enter' && handleAddClose()}></input>
                    <label htmlFor="recipient-name" className="col-form-label">Enter the username:</label>
                    <input ref={username} className="form-control new_chat" onKeyPress={(e) => e.key === 'Enter' && handleAddClose()}></input>
                    <label htmlFor="recipient-name" className="col-form-label">Enter the server address:</label>
                    <input ref={server} className="form-control new_chat" onKeyPress={(e) => e.key === 'Enter' && handleAddClose()}></input>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleAddClose}>
                        Add new contact
                    </Button>
                </Modal.Footer>
            </Modal>
            <ErrorMessage show={show} handleClose={handleClose} page={"Error Message"} message={messageErr} />

        </div>
    )
}

export default NewChat;
