import React, { useRef, useState } from 'react';
import "./Messages.css";
import MessagesBody from './MessagesBody';
import VoicePopUp from '../VoiceRecorder/VoicePopUp';
import ImagePopUp from './ImagePopUp';
import VideoPopUp from './VideoPopUp';
import userDefualt from '../../../avatar/user.png';
import avatar from '../../../avatar/avatar1.png';

import { FetchAddNewMessage, FetchSendMessage } from '../../../Req';

function Messages(props) {

  const [voiceMessage, setVoiceMessage] = useState(false);
  const chatBox = useRef(null);

  const handleSendMessage = async () => {
    if (chatBox.current.value != "") {
      if ((await FetchSendMessage(props.contactServer, localStorage.getItem('userId'), props.contactUsername, chatBox.current.value) == 201)
        && (await FetchAddNewMessage(localStorage.getItem('token'), props.contactUsername, chatBox.current.value)) == 201) {
        chatBox.current.value = '';
        props.setRefresh(props.refresh + 1);
        await props.connection.invoke("ContactChanged", props.refresh, props.contactUsername);
      }
    }
  };

  const handleEnterMessage = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage()
    }
  }

  const handleOpenVoice = () => {
    setVoiceMessage(true)
  }

  const handleCloseVoice = () => {
    setVoiceMessage(false)
  }


  return (
    <div className="messages">
      <div className='messages_header'>
        <img className='avatar1' src={avatar} alt="avatar" />
        <div className='messages_header_info'>
          <h3>{props.contactUsername}</h3>
        </div>
      </div>
      <MessagesBody contactUsername={props.contactUsername} refresh={props.refresh} />
      <div className='messages_footer'>
        <i className="bi bi-mic-fill" onClick={handleOpenVoice}> </i>
        <div className="dropdown messages_footer">
          <i className="bi bi-paperclip" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></i>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <i className="bi bi-image dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
            <i className="bi bi-camera-reels dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal1"></i>
          </ul>
        </div>
        <form>
          <input ref={chatBox} placeholder='Type a Message' onKeyPress={handleEnterMessage} />
        </form>
        <i onClick={handleSendMessage} type="submit" className="bi bi-send-fill"> </i>
      </div>
      <VoicePopUp show={voiceMessage} handleClose={handleCloseVoice} contactUsername={props.contactUsername} refresh={props.refresh} setRefresh={props.setRefresh} />
      <ImagePopUp contactUsername={props.contactUsername} refresh={props.refresh} setRefresh={props.setRefresh} />
      <VideoPopUp contactUsername={props.contactUsername} refresh={props.refresh} setRefresh={props.setRefresh} />
    </div>
  )
}

export default Messages;