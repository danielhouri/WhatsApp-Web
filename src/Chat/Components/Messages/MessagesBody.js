import React, { useState, useEffect } from 'react'
import Message from '../Message/Message';

import { FetchGetAllMessages } from '../../../Req';

function MessagesBody(props) {

    const [listMessage, setListMessage] = useState([]);

    useEffect(() => {
        async function GetAllMessages() {
            let x = await FetchGetAllMessages(localStorage.getItem('token'), props.contactUsername);
            setListMessage(x);
        }
        GetAllMessages();
    }, [props.refresh])


    const showMessageList = listMessage.map((element, key) => {
        if ((element.contenet != "")) {
            let time = element.created.substring(11, 16)
            return <Message side={element.send} message_content={element.content} key={key} message_time={time} />
        }
    });

    return (
        <div className='messages_body overflow-auto'>
            {showMessageList}
        </div>
    )
}

export default MessagesBody;