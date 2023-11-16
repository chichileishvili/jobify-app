import { Router } from 'express'

const router = Router()

import {
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
  createJob,
} from '../controllers/jobController.js'

router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

export default router
