import { addUserInDB } from "../repository/index.js";

export const hoistedIOAddUser = (io, socket) => {
    return async function addUserLocation(payload) {
      console.log(
        `add event has been received with ${JSON.stringify(payload)} 🍅🍋`
      );

      console.log('Client connected with socket id: '+socket.id);
      // console.log(socket)             // To print circular structured data => log only object without any string
      // console.log(socket.handshake.query);

      const userName = socket.handshake.query.userName
      const role = socket.handshake.query.role
      const location = JSON.parse(socket.handshake.query.location)

      const socketId = socket.id
  
      if(userName==='' || role === '' || location === '')
        return
  
      try{
  
          const newUser = {
              userName,
              role,
              location, //: { type: "Point", coordinates: [ location.longitude, location.latitude] },
              socketId
          }
          const locationData = await addUserInDB(newUser)
  
          io.to(socketId).emit('welcome', locationData)
          
          if(role === 'driver'){
              socket.join('driver')
              socket.in('passenger').emit('new-driver', locationData)
              console.log("User added to driver's room");
          }else{
              socket.join('passenger')
              socket.in('driver').emit('new-passenger', locationData)
              console.log("user added to passenger's room");
          }

        }catch(e){
          console.log(e);
      }
  
    };
  };
  