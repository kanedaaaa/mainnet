import ProfileService from "../services/profile.service";
// temporarily using auth
import ValidateAndThrow from "../validators/auth.validator";
import { ValidationError } from "../handlers/error.handler";

class ProfileController extends ProfileService {
  public async GetProfile(req: any, res: any, next: any) {
    try {
      const profile = await this.getProfile(req.user.id);

      res.status(200).json(profile);
    } catch (err: any) {
      next(err);
    }
  }

  public async UpdateProfile(req: any, res: any, next: any) {
    try {
      const payload = req.body;

      if (req.body.password || req.body.email) {
        throw new ValidationError("Invalid field");
      }

      await ValidateAndThrow("updateProfile", payload);

      const updatedProfile = await this.updateProfile(req.user.id, payload);

      res.status(200).json(updatedProfile);
    } catch (err: any) {
      next(err);
    }
  }
}

export default ProfileController;