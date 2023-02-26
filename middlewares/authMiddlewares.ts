import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {User} from "../models/UserModel";

class AuthMiddlewares {
  static authentication(req: Request, res: Response, next: NextFunction) { 
    try {
      const access_token: any = req.headers.access_token; 
      if (!access_token) { 
        throw {name: "MISSING_TOKEN"};
      }
      
      const key: string = process.env.SECRETKEY as string;
      
      jwt.verify(access_token, key, (err: any, decoded: any) => {
        if (err) { 
          throw {name: "INVALID_TOKEN"};
        }
        (<any>req).UserId = decoded.id;
        (<any>req).UserRole = decoded.role;
        next();
      });
    } catch (error) {
      next(error);
    }
  }

  static async authorization(req: Request, res: Response, next: NextFunction) { 
    try {
      const id = req.params.userid;
      const UserId: any = (<any>req).UserId;
      const searchUser: any = await User.findById(UserId);
      if (searchUser.id.toString() !== id) {
        throw {name: "INVALID_USER_ID"};
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  }

  static async adminAuthorization(req: Request, res: Response, next: NextFunction) {
    try {
      const access_token: any = req.headers.access_token;
      if (!access_token) {
        throw {name: "MISSING_TOKEN"};
      }

      const key: string = process.env.SECRETKEY as string;
      jwt.verify(access_token, key, (err: any, decoded: any) => {
        if (err) {
          throw {name: "INVALID_TOKEN"};
        }
        (<any>req).UserRole = decoded.role;
      });

      const UserRole: any = (<any>req).UserRole;

      if (UserRole !== "admin") {
        throw {name: "FORBIDDEN"};
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  }
}

export default AuthMiddlewares;
