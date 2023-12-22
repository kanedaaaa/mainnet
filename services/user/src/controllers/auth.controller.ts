import { AuthService, ISignupPayload } from "../services/auth.service";
import ValidateAndThrow from "../validators/auth.validator";
import { sendPostSignup, sendEmailVerification } from "../services/internal/email.service";

class AuthController extends AuthService {
    public async Signup(req: any, res: any, next: any) {
        const payload = req.body as ISignupPayload;
    
        try {
            await ValidateAndThrow("signup", payload);
            await this.signup(payload);

            // await sendPostSignup(payload.email);
            const randomJWT = this.generateJWT(0, true);
            // await sendEmailVerification(payload.email, randomJWT);
    
            res.status(200).json({
                message: "User created successfully",
                devOnly: randomJWT, // never include devonly in reference
            });
        } catch (err: any) {
            next(err);
        }
    }

    public async Login(req: any, res: any, next: any) {
        const { email, password } = req.body;
        
        try {
            await ValidateAndThrow("login", { email, password });
            const token = await this.login(email, password);
    
            res.status(200).json({
                token
            });
        } catch (err: any) {
            next(err);
        }
    }
}

export default AuthController
