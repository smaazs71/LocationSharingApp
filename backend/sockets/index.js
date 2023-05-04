import { hoistedIOAddUser } from "./addUserSocket.js";
import { hoistedIOMoveLocation } from "./moveLocationSocket.js";
import { hoistedIODisconnectUser } from "./deleteUserSocket.js";


const configureSockets = (io, socket) => {
    return {
        addUserLocation: hoistedIOAddUser(io, socket),
        moveLocation: hoistedIOMoveLocation(io, socket),
        disconnectUser: hoistedIODisconnectUser(io, socket),
      
    };
};
  
export const onConnection = (io) => async (socket) => {

    socket.broadcast.emit('test-message', 'New user connected')

    const { addUserLocation, moveLocation, disconnectUser } = configureSockets(io, socket);
  
    addUserLocation()

    socket.on("move-location", moveLocation)

    socket.on("disconnect", disconnectUser);

};

  