const nextRoutes = require('next-routes')
const routes = nextRoutes()

routes.add('ders', '/ders/:slug')

module.exports = routes
