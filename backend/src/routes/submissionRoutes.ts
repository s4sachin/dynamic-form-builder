import { Router } from 'express';
import { createSubmissionController, getSubmissionsController } from '../controllers/submissionController';

const router = Router();

router.post('/submissions', createSubmissionController);
router.get('/submissions', getSubmissionsController);

export default router;
