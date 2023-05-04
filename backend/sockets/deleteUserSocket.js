import { deleteUserLocation } from "../repository/index.js";

export const hoistedIODisconnectUser = (io, socket) => {
    return async function disconnectUser(payload) {
      console.log(
        `Disconnected event has been received with ${JSON.stringify(payload)} 🍅🍋`
      );
    //   const newData = await updateLocationByuserName(payload)
        const deletedUserLocation = await deleteUserLocation(socket.id)

        socket.broadcast.emit('disconnect-user', deletedUserLocation)

    };
  };
  