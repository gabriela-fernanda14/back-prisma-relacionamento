import express from 'express';

// Importar todas as rotas
import authRouter from './auth.routes.js';
import animesRouter from './animeRoutes.js';
import personagensRouter from './personagemRoutes.js';
import collectionRouter from './collectionRoutes.js';
import cardRouter from './cardRoutes.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

//rotas públicas
router.use('/auth', authRouter);

//rotas protegidas
router.use(authMiddleware); 

router.use('/animes', animesRouter);
router.use('/personagens', personagensRouter);
router.use('/colecoes', collectionRouter);
router.use('/cartas', cardRouter);

export default router;