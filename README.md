# WhatsAppWeb (React)

This project use react and bootstrap. The client is connected to the WebAPI where the data is stored.</br> 
The WebApi address is: https://localhost:7156/.</br></br>
**If you want to change it, go to the req.js file and change the port variable.**

## Code Structure

The Webclient contains 3 main section:
- Signin - Default page, If the connection succeeds there is a fluid transfer to the 'Chat' page, otherwise an error will appear. If the user is not registered there is a button that transfers to the 'Signup' page.
- Signup - The registration page where the user needs to insert a user name and a password that contains digits and letters both.
- Chat - The main part of the Web client, this section contains the following components: SideBar and Message (where the messages are shown). This Message's components support the following type of content: text, voice, image, and video.

#### Technologies:
- JWT
- SignalR
- React
- Bootstrap

## Run the project
To run the project you need to open the terminal and to install the following before running: node JS, npm, react-router-dom, react-bootstrap.
If it's already installed, enter in the terminal and type "npm start".</br></br>

Open [http://localhost:3000](http://localhost:3000), and enjoy.

## Submitting

- Daniel Houri: 314712563
- Dor Huri: 209409218
