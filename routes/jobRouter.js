import { Router } from 'express'

const router = Router()

import {
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
  createJob,
  showStats,
} from '../controllers/jobController.js'
import { validateIdParam, validateJobInput } from '../middleware/vallidationMiddleware.js'
import { checkForTestUser } from '../middleware/authMIddleware.js'

router.route('/').get(getAllJobs).post(checkForTestUser, validateJobInput, createJob)
router.route('/stats').get(showStats)
router
  .route('/:id')
  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJob)

export default router
