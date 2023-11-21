import { Router } from 'express'
import { login, register } from '../controllers/authControler.js'
import { validateRegister, validateLogin } from '../middleware/vallidationMiddleware.js'
const router = Router()

router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)

export default router
