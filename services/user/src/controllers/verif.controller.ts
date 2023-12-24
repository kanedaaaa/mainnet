import VerificationService from "../services/verif.service";

class VerificationController extends VerificationService {
    public async VerifyEmail(req: any, res: any, next: any) {
        try {
            const token = req.body.token;

            await this.verifyEmail(token);

            res.send(200).json({
                message: "Email verified"
            })
        } catch (err: any) {
            next(err);
        }
    }

    public async ResendEmailVerification(req: any, res: any, next: any) {
        try {
            const email = req.body.email;

            await this.resendEmailVerfication(email);

            res.send(200).json({
                message: "Code sent"
            });
        } catch (err: any) {
            next(err);
        }
    }
}

export default VerificationController;