import { Router } from 'express'
import { login, logout, register } from '../controllers/authControler.js'
import { validateRegister, validateLogin } from '../middleware/vallidationMiddleware.js'

const router = Router()

router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
router.get('/logout', logout)

export default router
