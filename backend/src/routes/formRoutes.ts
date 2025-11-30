import { Router } from 'express';
import { getFormSchemaController } from '../controllers/formController';

const router = Router();

router.get('/form-schema', getFormSchemaController);

export default router;
