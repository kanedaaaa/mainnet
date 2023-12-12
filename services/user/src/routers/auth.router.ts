import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/signup', async (req, res, next) => {
    await authController.Signup(req, res, next);
})

authRouter.post('/login', async (req, res, next) => {
    await authController.Login(req, res, next);
})

export default authRouter;