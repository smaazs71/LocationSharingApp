import express from 'express'
import dotenv from 'dotenv'

import { initializeRoutes } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';


dotenv.config()

const port = process.env.PORT || 3000;

let app = express()


app.use(express.json())

app.use(express.urlencoded({ extended: false }))


app.use( '/', (req, res) => { res.send('Welcome') } )

app = initializeRoutes( app )


app.use(errorHandler)

app.listen( port, ( ) => {

    console.log('Server running on port: '+ port);
})
