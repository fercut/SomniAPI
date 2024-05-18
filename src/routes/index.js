import express from 'express';
import { login } from '../controllers/login-controller.js';
import { contactController } from '../controllers/contactController.js';
import miscRouter from './misc-router.js';
import userRouter from './user-router.js';
import articleRouter from './article-router.js';
import orderRouter from './order-router.js';
import { checkRoot } from '../middlewares/auth-middleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/send-email', contactController);

router.use(miscRouter);
router.use('/users', userRouter);
router.use('/articles', articleRouter);
router.use('/orders', orderRouter)


export default router;
