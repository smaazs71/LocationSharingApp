import userRoutes from './UsersRoutes/userRoutes.js'
import locationRoutes from './LocationRoutes/locationRoutes.js';

const allRoutes = [ userRoutes, locationRoutes ];

export const initializeRoutes = (app) => {
    allRoutes.forEach( (router) => {
        app.use( `/api/v1/${router.name}`, router.route );
    } )
    return app
}
