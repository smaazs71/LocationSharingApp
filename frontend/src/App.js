import './App.css';
import MapComponent from './components/MapComponent';
import { useState, useEffect } from 'react';

import { socket } from './socket/socket.js'
import { ConnectionManager } from './socket/ConnectionManager';
import { ConnectionState } from './socket/ConnectionState';


function App() {

  const longitude = 72.8747 + Math.random()/3 
  const latitude = 19.0111 + Math.random()/2 

  const [isConnected, setIsConnected] = useState(false);
  const [userData, setUserData] = useState( {_id: 'id', userName:'', role: 'passenger', location:{type: 'Point',coordinates: [ longitude, latitude ]} } )

  const [otherUsersData, setOtherUsersData] = useState({})
  

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onWelcomeEvent(value) {
      console.log(JSON.stringify(value) +' MyData');
      console.log(value._id+" : Id");
      setUserData(value)
    }
    function onTestMsgEvent(value) {
      console.log(value);
    }
    function onNewDriverEvent(value) {
      console.log(value);
      setOtherUsersData((prevData)=>({
        ...prevData,
        [value._id]: value
    }))
    }
    function onNewPassengerEvent(value) {
      console.log(value);
      setOtherUsersData((prevData)=>({
        ...prevData,
        [value._id]: value
    }))
    }

    function onPassengerMoveEvent(value) {
      console.log(value);

      setOtherUsersData((prevData)=>({
        ...prevData,
        [value._id]: value
    }))
    }
    function onDriverMoveEvent(value) {
      console.log(value);

      setOtherUsersData((prevData)=>({
        ...prevData,
        [value._id]: value
    }))
    }
    function onAssigneeMoveEvent(value) {
      console.log(value);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('welcome', onWelcomeEvent);
    socket.on('test-message', onTestMsgEvent);
    socket.on('new-driver', onNewDriverEvent);
    socket.on('new-passenger', onNewPassengerEvent);
    socket.on('passenger-move', onPassengerMoveEvent);
    socket.on('driver-move', onDriverMoveEvent);
    socket.on('assignee-move', onAssigneeMoveEvent);
    
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('welcome', onWelcomeEvent);
      socket.off('test-message', onTestMsgEvent);
      socket.off('new-driver', onNewDriverEvent);
      socket.off('new-passenger', onNewPassengerEvent);
      socket.off('passenger-move', onPassengerMoveEvent);
      socket.off('driver-move', onDriverMoveEvent);
      socket.off('assignee-move', onAssigneeMoveEvent);
      
    };
  }, []);



  const onChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value.trim() 
    })) 
  }

  return (
    <div className="App">

      <ConnectionState isConnected={ isConnected } />
      <ConnectionManager userData={userData} setUserData={setUserData} id={userData._id} userName={userData.userName} role={userData.role} location={userData.location} isConnected={ isConnected } />
      <br></br>
  
      <input type="text" name="userName" id="user-name" onChange={onChange} value={userData.userName} />
      <select name="role" id=" =role" value={userData.role} onChange={onChange} >
        <option value="passenger" selected >Passenger</option>
        <option value="driver">Driver</option>
      </select>

      <MapComponent myData={userData} otherUsersData={otherUsersData} />
    </div>
  );
}

export default App;
