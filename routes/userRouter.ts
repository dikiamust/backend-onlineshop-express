import {Router} from "express";
import userController from "../controllers/userController";
import authMiddlewares from "../middlewares/authMiddlewares";

class UserRoute {
  router: Router;

  constructor() {
    this.router = Router();
    this.route();
  }

  route(): void {
    this.router.post("/users/register", userController.register);
    this.router.post("/users/login", userController.login);
    this.router.use(authMiddlewares.authentication);
    this.router.put("/users/:userid", userController.editUser);
  }
}

export default new UserRoute().router;
