import React, { useEffect, useState } from 'react'
import './SideBar.css'
import { Button } from 'react-bootstrap';
import SideBarChatResults from '../SideBarChat/SideBarChatResults';
import Search from '../SideBarChat/Search';
import NewChat from './NewChat';
import userDefualt from '../../../avatar/user.png';
import avatar from '../../../avatar/beard.png';
import { FetchGetAllContacts } from '../../../Req';

function SideBar(props) {

    const [contactList, setContactList] = useState(0);
    const [searchQuery, setSearchQuery] = useState([]);
    const [newChat, setNewChat] = useState(false);

    useEffect(() => {
        async function GetAllContacts() {
            let x = await FetchGetAllContacts(localStorage.getItem('token'))
            setContactList(x);
            setSearchQuery(x);
        }
        GetAllContacts();
    }, [props.refresh])

    const doSearch = function (q) {
        let res = (contactList.filter((index) => index.name.toLowerCase().includes(q)));
        setSearchQuery(res);
    }

    const handleOnShow = () => {
        props.setRefresh(props.refresh);
        setNewChat(true);
    };
    const handleOnClose = () => {
        setNewChat(false);
    };

    return (
        <div className='sidebar'>
            <div className='sidebar_header'>
                {props.loginDetails['src'] ? <img className='avatar' src={props.loginDetails['src']} alt="Avatar" /> : <img className='avatar' src={avatar} alt="Avatar" />}
                <h4 className='avatar2'>Hi {localStorage.getItem('userId')}</h4>
                <Button variant="outline-secondary" onClick={handleOnShow}>
                    <i className="bi bi-chat-right-dots"></i>
                </Button>
            </div>
            <Search doSearch={doSearch} />
            <SideBarChatResults chatList={searchQuery} setBackgroundShow={props.setBackgroundShow} refresh={props.refresh} setRefresh={props.setRefresh}/>
            <NewChat username={props.loginDetails.username} show={newChat} handleClose={handleOnClose} page={"New Chat"} setSearchQuery={setSearchQuery} refresh={props.refresh} setRefresh={props.setRefresh} connection={props.connection}/>
        </div>
    )
}

export default SideBar;