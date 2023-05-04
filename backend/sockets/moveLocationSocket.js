import { updateLocationById } from "../repository/index.js";

export const hoistedIOMoveLocation = (io, socket) => {
    return async function updateLocation(payload) {
      console.log(
        `move event has been received with ${JSON.stringify(payload)} 🍅🍋`
      );
      const newData = await updateLocationById(payload)

      if(newData.assigneeId){
        console.log(newData.assigneeId+" Assignee data");
        socket.to(newData.assigneeId.socketId).emit('assignee-move', newData)
      }else if(newData.role === 'driver'){
        socket.in('passenger').emit('passenger-move', newData)
      }else if(newData.role === 'passenger'){
        socket.in('driver').emit('driver-move', newData)
      }

    };
  };
  