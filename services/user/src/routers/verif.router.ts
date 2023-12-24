import { Router } from 'express';
import VerificationController from '../controllers/verif.controller';

const verifRouter = Router();
const verifController = new VerificationController();

verifRouter.post("/email", async (req: any, res: any, next: any) => {
    await verifController.VerifyEmail(req, res, next);
})

verifRouter.post("/resend-email", async (req: any, res: any, next: any) => {
    await verifController.ResendEmailVerification(req, res, next);
})

export default verifRouter;
