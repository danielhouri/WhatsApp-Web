import React, { useState } from 'react';
import './Chat.css';
import Messages from './Components/Messages/Messages';
import SideBar from './Components/SideBar/SideBar';
import Background from './Components/Background/Background';

function Chat(props) {
    const [backgroundShow, setBackgroundShow] = useState(false);

    return (
        <div className='chat_main'>
            <div className="chat_body">
                <SideBar loginDetails={props.loginDetails} setBackgroundShow={setBackgroundShow} refresh={props.refresh} setRefresh={props.setRefresh} connection={props.connection}/>
                {backgroundShow ? <Messages contactName={backgroundShow.nickname} contactServer={backgroundShow.server} contactUsername={backgroundShow.username} refresh={props.refresh} setRefresh={props.setRefresh} connection={props.connection} /> : <Background />}
            </div>
        </div>
    );
}

export default Chat;
