import express, {Application, NextFunction, Request, Response} from "express";
import Routes from "./routes/indexRouter";
import connectMongoDB from "./configs/db";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan"

class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.plugins();
    this.route();
    dotenv.config();
  }

  protected plugins(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan("dev"))
    this.app.use(express.urlencoded({extended: true}));
    connectMongoDB();

    this.app.use((req : Request, res: Response, next: NextFunction) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Expose-Headers", "Authorization")
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
      );
      next();
    });
  }

  protected route(): void {
    this.app.use(Routes);
  }
}

export default new App().app;
