import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn/SignIn';
import SignUn from './SignUp/SignUp';
import Chat from "./Chat/Chat";
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

function App() {
  const [loginDetails, setLoginDetails] = useState('');
  const [connection, setConnection] = useState(false);
  const [refresh, setRefresh] = useState(2);

  async function start(username) {
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7156/ContactHub")
      .configureLogging(LogLevel.Information)
      .build();

    await connection.start()
      .then(() => {
        console.log("SignalR Connected.");
        setConnection(connection);

        connection.on("ChangeRecived", (value) => {
          setRefresh(value);
        });
        connection.invoke("Connect", username);
      })
      .catch((e) => {
        console.log(e);
      })
  };

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<SignIn setLoginDetails={setLoginDetails} start={start} />}></Route>
            <Route path='/signup' element={<SignUn setLoginDetails={setLoginDetails} start={start} />}></Route>
            <Route path='/chat' element={<Chat loginDetails={loginDetails} refresh={refresh} setRefresh={setRefresh} connection={connection} />}></Route>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
