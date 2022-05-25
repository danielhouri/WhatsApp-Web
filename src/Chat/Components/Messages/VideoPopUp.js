import React, { useState } from 'react';
import './VideoPopUp.css';

function VideoPopUp(props) {
    const [videoSrc, setVideoSrc] = useState("");

    const handleVideo = () => {
        const d = new Date();
        let time = d.getHours() + ":" + d.getMinutes();
        let temp = URL.createObjectURL(videoSrc);
        //addNewMessage(props.username, 'video', true, time, temp, props.ownerUsername);
        props.setRefresh(props.refresh + 1);
    }

    const handleUpload = (e) => {
        setVideoSrc(e.target.files[0]);
    }

    return (
        <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                    </div>
                    <div className="modal-body button_image">
                        <input type="file" accept='video/*' className="form-control" id="inputGroupFile02" onChange={handleUpload} />
                        <button className="input-group-text" htmlFor="inputGroupFile02" data-bs-dismiss="modal" onClick={handleVideo}>Upload</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoPopUp;
