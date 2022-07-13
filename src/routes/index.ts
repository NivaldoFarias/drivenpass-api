import express from 'express';

import authRouter from './auth.route';
import credentialRouter from './credential.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/credentials', credentialRouter);

export default router;
