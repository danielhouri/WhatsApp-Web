import React from 'react';
import SideBarChat from './SideBarChat';

function SideBarChatResults({ chatList, setBackgroundShow, refresh, setRefresh }) {
    return (
        <div className='sidebar_chats overflow-auto'>
            {chatList != [] ? chatList.map((item, key) => {
                let time = item.lastDate.substring(11, 16)
                return <SideBarChat nickname={item.name ? item.name : item.id} username={item.id} message_content={item.last} src={null} message_time={time} key={key} setBackgroundShow={setBackgroundShow} server={item.server} refresh={refresh} setRefresh={setRefresh} />;
            }) : null}
        </div>
    )
}

export default SideBarChatResults;