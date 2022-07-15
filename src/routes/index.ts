import express from 'express';

import authRouter from './auth.route';
import notesRouter from './notes.route';
import networksRoutes from './network.route';
import documentRouter from './document.route';
import credentialRouter from './credential.route';
import CreditCardsRouter from './credit_card.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/notes', notesRouter);
router.use('/networks', networksRoutes);
router.use('/documents', documentRouter);
router.use('/credentials', credentialRouter);
router.use('/credit-cards', CreditCardsRouter);

export default router;
