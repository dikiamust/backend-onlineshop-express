import {Router} from "express";
import orderController from "../controllers/orderController";
import authMiddlewares from "../middlewares/authMiddlewares";

class OrderRoute {
  router: Router;

  constructor() {
    this.router = Router();
    this.route();
  }

  route(): void {
    this.router.post(
      "/orders/:userid",
      authMiddlewares.authorization,
      orderController.createOrder
    );

    this.router.get(
      "/orders/:userid",
      authMiddlewares.authorization,
      orderController.findAllOrdersByUser
    );
  }
}

export default new OrderRoute().router;
