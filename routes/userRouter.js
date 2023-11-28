import { Router } from 'express'
import { getApplicationStats, getCurrentUser, updateUser } from '../controllers/userControler.js'
import { updateUserInput } from '../middleware/vallidationMiddleware.js'
import { authorizedPermisions } from '../middleware/authMIddleware.js'
import upload from '../middleware/multerMiddleware.js'
import { checkForTestUser } from '../middleware/authMIddleware.js'

const router = Router()

router.get('/current-user', getCurrentUser)
router.get('/admin/app-stats', [authorizedPermisions('admin'), getApplicationStats])
router.patch('/update-user', checkForTestUser, upload.single('avatar'), updateUserInput, updateUser)

export default router
