import React from 'react';
import './Message.css';

function VideoMessage(props) {

  return (
    <p className={props.side ? 'messages_body_message message_receiver' : 'messages_body_message'}>
      <video src={props.videoSrc} controls />
      <span className="sidebarchat_time noselect"> {props.message_time} </span>
    </p>
  )
}

export default VideoMessage;
