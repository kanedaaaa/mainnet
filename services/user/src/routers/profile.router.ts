import ProfileController from "../controllers/profile.controller";
import onlyAuth from "../middlewares/auth.middleware";
import { Router } from "express";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get("/", onlyAuth, async (req: any, res: any, next: any) => {
  await profileController.GetProfile(req, res, next);
});

profileRouter.put("/", onlyAuth, async (req: any, res: any, next: any) => {
  await profileController.UpdateProfile(req, res, next);
});

export default profileRouter;