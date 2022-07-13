import express from 'express';

import requireToken from '../middlewares/token.middleware';
import processHeader from '../middlewares/header.middleware';

import authRouter from './auth.route';
import credentialRouter from './credential.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use(processHeader('authorization'));
router.use(requireToken);
router.use('/credentials', credentialRouter);

export default router;
