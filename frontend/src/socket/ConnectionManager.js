import { socket } from './socket.js';

export function ConnectionManager({ userData, setUserData, isConnected}) {
  function connect() {
    socket.io.opts.query = {userName: userData.userName, role: userData.role, location: JSON.stringify(userData.location)}
    socket.connect();
  }

  function move(){
    const longitude = userData.location.coordinates[0] + 0.165 - Math.random()/3 
    const latitude = userData.location.coordinates[1] + 0.165 - Math.random()/3;
    const value = {
      id: userData._id,
      location: {
        longitude,
        latitude
      }
    }
      if(userData._id!=='id'){

        const newLocation = {
          type: 'Point',
          coordinates: [ longitude, latitude ]
        }
        setUserData((prevData) => ({
          ...prevData,
          ['location']: newLocation
        }))
        socket.emit( 'move-location', value );
      }
    
  }
  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <button onClick={ connect } disabled={ userData.userName === '' || isConnected ? true : false }  >Connect</button>
      <button onClick={ disconnect } disabled={ isConnected ? false : true } >Disconnect</button>
      <button onClick={ move } disabled={ isConnected ? false : true } >Move</button>
    </>
  );
}
