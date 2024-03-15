const { Router } = require('express')
const SessionController = require('./controllers/session-ctrl')
const UserController = require('./controllers/user-ctrl')
const authMiddleware = require('./middlewares/auth')

const routes = new Router()

routes.post('/user', UserController.create)
routes.post('/session', SessionController.create)

routes.post('/change-password', authMiddleware, UserController.changePassword)

module.exports = routes