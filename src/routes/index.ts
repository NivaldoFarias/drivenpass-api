import express from 'express';

import authRouter from './auth.route';
import notesRouter from './notes.route';
import networksRoutes from './network.route';
import credentialRouter from './credential.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/notes', notesRouter);
router.use('/networks', networksRoutes);
router.use('/credentials', credentialRouter);

export default router;
