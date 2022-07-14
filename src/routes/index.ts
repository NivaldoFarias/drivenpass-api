import express from 'express';

import authRouter from './auth.route';
import credentialRouter from './credential.route';
import notesRouter from './notes.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/credentials', credentialRouter);
router.use('/notes', notesRouter);

export default router;
