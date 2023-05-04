import express from 'express'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import { createServer } from 'http'
import cors from 'cors'

import { initializeRoutes } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectMongoDB } from './config/mongoDBConfig.js';
import { onConnection } from './sockets/index.js'

dotenv.config()

connectMongoDB();

const port = process.env.PORT || 3000;

let app = express()


app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: false }))


// app.use( '/', (req, res) => { res.send('Welcome') } )

app = initializeRoutes( app )


app.use(errorHandler)



// Socket.io implementation
const httpServer = createServer(app)

const io = new Server( httpServer, {
    cors: {
        origin: '*',
        methods: [ 'GET', 'POST' ]
    }
})


io.on('connection', onConnection(io))

// socket middleware 
// io.use((socket, next) => {
//     if (isValid(socket.request)) {
//       next();
//     } else {
//       next(new Error("invalid"));
//     }
//   });


// const customNameSpace = io.of('/custom-namespace')

// customNameSpace.on('connection', onConnection(customNameSpace))

httpServer.listen( port, () => {
    console.log(`Server listening on port: ${port}`);
})

