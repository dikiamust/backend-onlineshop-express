import {Router, Request, Response, NextFunction} from "express";
import userRouter from "./userRouter";
import productRouter from "./productRouter";
import orderRouter from "./orderRouter"
import authMiddlewares from "../middlewares/authMiddlewares";
import errorHandler from "../middlewares/errorHandler";

class Routes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
    this.product();
    this.user();
    this.auth();
    this.order()
    this.errorHandler();
  }

  public routes(): void {
    this.router.get("/", (req: Request, res: Response) => {
      res.status(200).json({message: "Onlineshop API is running!"});
    });
  }

  public product(): void {
    this.router.use(productRouter);
  }

  public user(): void {
    this.router.use(userRouter);
  }

  public auth(): void {
    this.router.use(authMiddlewares.authentication);
  }

  public order(): void {
    this.router.use(orderRouter);
  }

  public errorHandler(): void {
    this.router.use(errorHandler);
  }
}

export default new Routes().router;
