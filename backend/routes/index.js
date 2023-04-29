import userRoutes from './UsersRoutes/userRoutes.js'

const allRoutes = [ userRoutes ];

export const initializeRoutes = (app) => {
    allRoutes.forEach( (router) => {
        app.use( `/api/v1/${router.name}`, router.route );
    } )
    return app
}
