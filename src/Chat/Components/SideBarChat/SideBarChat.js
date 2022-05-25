import React from 'react';
import './SideBarChat.css';
import userDefualt from '../../../avatar/user.png';
import avatar1 from '../../../avatar/avatar1.png';

function SideBarChat(props) {
    const handleClicked = function () {
        props.setBackgroundShow({ 'username': props.username, 'server': props.server, 'name': props.nickname });
        props.setRefresh(props.refresh + 1);
    }
    return (
        <div className='sidebarchat container' onClick={handleClicked}>
            <div className='row'>
                <div className='col col-2 sidebarchat_avatar'>
                    {props.src ? <img className='avatar' src={props.src} /> : <img className='avatar' src={avatar1} />}
                </div>
                <div className='col col-8'>
                    <div className='sidebarchat_info'>
                        <h2>{props.nickname}</h2>
                        <p>{props.message_content}</p>
                    </div>
                </div>
                <div className='col col-2'>
                    <div className="sidebarchat_time"> {props.message_time} </div>
                </div>
            </div>
        </div>
    )
}

export default SideBarChat;