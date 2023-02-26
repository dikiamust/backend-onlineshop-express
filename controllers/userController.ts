import {User} from "../models/UserModel";
import {NextFunction, Request, Response} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

class UserController {
  constructor() {
    dotenv.config();
  }
  static async register(req: Request, res: Response, next: NextFunction) {
    const { username, role, phone, email, password, shippingAddress } = req.body
    try {
      if (!username || !role ||!phone || !email || !password) {
        throw {name: "REQUIRED"};
      }

      if(role === 'customer' && !shippingAddress){ 
        throw {name: "REQUIRED"};
      }

      const register = await User.create({
        username,
        role,
        phone,
        email,
        password: bcrypt.hashSync(password, 8),
        shippingAddress
      });

      return res.status(201).json({
        success: true,
        message: `The user was successfully registered as a ${role}!`,
        data: register,
      });
    } catch (err) {  
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password} = req.body
    try {
      const loginEmail: any = await User.findOne({email});
      if (!loginEmail) {
        throw {name: "FALSE_LOGIN"};
      }

      const loginPassword = bcrypt.compareSync(
        password,
        loginEmail.password
      );

      if (!loginPassword) {
        throw {name: "FALSE_LOGIN"};
      } else {
        const key: string = process.env.SECRETKEY as string;
        let token = jwt.sign({id: loginEmail.id, role: loginEmail.role }, key, {
          expiresIn: "1h",
        });
        
        res.status(200).json({
          message: "You have successfully logged in",
          email: loginEmail.email,
          role: loginEmail.role,
          access_token: token,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async editUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {userid} = req.params;
      const {username, address, phone, email} = req.body;
      for (const key in req.body) {
        if (!req.body[key]) {
          delete req.body[key];
        }
      }
      const edit = await User.findByIdAndUpdate(
        userid,
        req.body,
        {new: true}
      );

      if (!edit) {
        throw {name: "NOT_EDITED"};
      }
      res.status(200).json({
        success: true,
        message: "You have successfully updated your account",
        data: edit,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
