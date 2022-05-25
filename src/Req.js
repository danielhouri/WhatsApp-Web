
let url = 'https://localhost:';
let port = 7156;

export async function FetchSignin(username, password, navigate, handleShow, start) {
    let req = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': username,
            'password': password,
            'name': ""
        }),
    };

    await fetch(url + port + '/api/Users/signin', req)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .then(token => {
            if (token != undefined) {
                localStorage.setItem('token', token);
                localStorage.setItem('userId', username);
                start(username);
                navigate('/chat');
            }
            else {
                handleShow();
            }
        })
};

export async function FetchSignup(username, name, password, navigate, handleShow, start) {
    let req = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': username,
            'password': password,
            'name': name
        }),
    };
    await fetch(url + port + '/api/Users/signup', req)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .then(token => {
            if (token != undefined) {
                localStorage.setItem('token', token);
                localStorage.setItem('userId', username);
                start(username);
                navigate('/chat');
            }
            else {
                handleShow("Username or password isn't valid");
            }
        })
};

export async function FetchGetAllContacts(token) {
    let req = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    let response = await fetch(url + port + '/api/Contacts', req)
    if (response.ok) {
        return await response.json();
    }
};


export async function FetchGetAllMessages(token, contactId) {
    let req = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    let response = await fetch(url + port + '/api/Contacts/' + contactId + '/messages/', req)
    if (response.ok) {
        return await response.json();
    }
};

export async function FetchAddNewMessage(token, contactId, content) {
    let req = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            'content': content
        })
    };
    let response = await fetch(url + port + '/api/Contacts/' + contactId + '/messages/', req)
    return response.status;
};

export async function FetchAddNewContact(token, contactId, name, server) {
    let req = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            'id': contactId,
            'name': name,
            'server': server
        })
    };
    let response = await fetch(url + port + '/api/Contacts/', req)
    return response.status;
};

export async function FetchSendInvitation(server, from, to) {
    let req = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'from': from,
            'to': to,
            'server': url + port + '/'
        })
    };
    let response = await fetch(server + 'api/Invitations/', req)
    return response.status;
};

export async function FetchSendMessage(server, from, to, content) {
    let req = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'from': from,
            'to': to,
            'content': content
        })
    };
    let response = await fetch(server + 'api/Transfer/', req)
    return response.status;
};