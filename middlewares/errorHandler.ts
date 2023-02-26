import {ErrorRequestHandler, Request, Response, NextFunction} from "express";

export default function errorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let code;
  let name = err.name;
  let message;

  switch (name) {
    case "REQUIRED":
      code = 400;
      message = "There is a section that has not yet been filled.";
      break;

    case "INVALID_INPUT":
      code = 400;
      message = "The stock or price column cannot be filled with negative numbers.!";
      break;
    
    case "INVALID_ROLE":
      code = 400;
      message = "Invalid role. There are only two roles, customer and admin.";
      break;

    case "FALSE_LOGIN":
      code = 401;
      message = "Email or password invalid!";
      break;

    case "INVALID_TOKEN":
      code = 401;
      message = "The access token is invalid or has expired. Please check your access token and try again.";
      break;

    case "MISSING_TOKEN":
      code = 401;
      message = "Access to this resource requires authentication. Please log in to your account to access this resource.";
      break;

    case "FORBIDDEN":
      code = 401;
      message = "Access to this resource is prohibited.!";
      break;
    
    case "INVALID_USER_ID":
      code = 401;
      message = "Authorization error: The user ID in the token does not match the user ID provided";
      break;

    case "NOT_FOUND":
      code = 401;
      message = "Not found!";
      break;

    case "PRODUCT_NOT_FOUND":
      code = 401;
      message = "We could not find the product you were looking for in our system.";
      break;
    
    case "PURCHASE_ORDER":
      code = 401;
      message = "We're sorry since the stock of the product is still available, you can make a purchase-order instead";
      break;

    case "NOT_EDITED":
      code = 401;
      message = "failed to update! ";
      break;

    case "NOT_DELETED":
      code = 401;
      message = "failed to delete!";
      break;

    case "NO_STOCK":
      code = 401;
      message = "Unfortunately, we do not currently have any stock available. However, you can still place a pre-order to ensure you receive the item as soon as it becomes available.";
      break;

    default:
      code = 500;
      message = "Internal Server Error: Sorry, something went wrong on our end. Our team has been notified and we are working to fix the issue as soon as possible. Please try again later.";
  } 

  if(err.toString() === 'ValidationError: role: `customers` is not a valid enum value for path `role`.'){
    return  res.status(400).json({success: false, message: 'Invalid role. There are only two roles, customer and admin.'});
  } 
  
  if(err.toString() == `MongoError: E11000 duplicate key error collection: onlineshop-dev.users index: email_1 dup key: { : "${req.body.email}" }`){
    return  res.status(409).json({success: false, message: 'Email already exist!.'});
  }

  if(err.toString() == `MongoError: E11000 duplicate key error collection: onlineshop-dev.products index: name_1 dup key: { : "${req.body.name}" }`){
    return  res.status(409).json({success: false, message: 'Name of product already exist!.'});
  } 

  if(err.name === 'ValidationError') {
    return  res.status(400).json({success: false, message: err.toString()});
  }
  
  res.status(code).json({success: false, message});
}
