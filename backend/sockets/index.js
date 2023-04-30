import { hoistedIODriver } from "./driverSocker.js";
import { hoistedIOUser } from "./userSocket.js";

const configureSockets = (io, socket) => {
    return {
      driverLocation: hoistedIODriver(io, socket),
      userLocation: hoistedIOUser(io, socket),
    };
};
  
export const onConnection = (io) => async (socket) => {

    console.log('Client connected with socket id: '+socket.id);
    socket.broadcast.emit('test-message', 'Welcome to our server')
    console.log(socket)             // To print circular structured data => log only object without any string
    if(socket.handshake.headers.data === 'driver'){
        socket.join('driver')
        socket.in('user').emit('new-driver', 'New driver added')
        console.log('Driver Room');
    }else{
        console.log('User Room');
        socket.join('user')
        socket.in('driver').emit('new-user', 'New user added')
    }


    console.log('socket.handshake.headers.data.role: '+socket.handshake.headers.data);
    socket.on('test-client', (data) => {
        io.emit('test-server', 'This is Server: '+data)
    })
    socket.emit('socket-test', 'Message from socket')

    // const userGeo = await db.Geolocation.update(
    //   { socketID: socket.id },
    //   { where: { id: socket.theUser.id } }
    // );
    const { userLocation, driverLocation } = configureSockets(io, socket);
  
    socket.on("user-move", userLocation);
    socket.on("driver-move", driverLocation);
  };
  