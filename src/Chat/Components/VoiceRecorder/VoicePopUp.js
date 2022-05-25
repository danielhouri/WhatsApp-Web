import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import useRecorder from './UseRecorder';
import './VoicePopUp.css';


function VoicePopUp(props) {
    let [audioURL, isRecording, startRecording, stopRecording] = useRecorder(props.username, props.refresh, props.setRefresh, props.ownerUsername);

    const handleStopRecording = () => {
        stopRecording();
        props.handleClose();
    }

    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose} className="modal_record">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="danger" onClick={startRecording} disabled={isRecording} className="modal_record_btnrecord">
                        Record
                    </Button>
                    <Button variant="secondary" onClick={handleStopRecording} disabled={!isRecording} className="modal_record_btnstop">
                        Stop Recording
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default VoicePopUp;
