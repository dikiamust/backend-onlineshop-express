import {NextFunction, Request, Response} from "express";
import {Order} from "../models/OrderModel"
import {Product} from "../models/ProductModel";
import {ETypeOrder} from '../models/enum/ETypeOrder'

class OrderController {
  static async createOrder(req: Request, res: Response, next: NextFunction) {
    const UserId: any = (<any>req).UserId;
    const { productId,  quantity, typeOrder } = req.body;

    try {
      const findProduct = await Product.findById(productId);
      if (!findProduct) {
        throw {name: "NOT_FOUND"};
      }

      // customers can only pre-order when the stock of product is zero 
      if(findProduct.stock <= 0 && typeOrder === ETypeOrder.PRE_ORDER){
        const createPreOrder = await Order.create({
          userId: UserId,
          productId,
          totalPrice: findProduct.price * quantity,
          quantity,
          typeOrder: ETypeOrder.PRE_ORDER
        });

        return res.status(201).json({
          success: true,
          message: "Pre-Order was created successfully!",
          data: createPreOrder,
        });
      }

      if(quantity > findProduct.stock || findProduct.stock <= 0){
        throw {name: "NO_STOCK"};
      }  
      
      if(typeOrder !== ETypeOrder.PURCHASE_ORDER){
        throw {name: "PURCHASE_ORDER"};
      }

      const createPurchaseOrder = await Order.create({
        userId: UserId,
        productId,
        totalPrice: findProduct.price * quantity,
        quantity,
        typeOrder
      });

      const updateStock = await Product.findByIdAndUpdate(
        productId,
        {$inc: {stock: -quantity}},
        {new: true}
      );

      return res.status(201).json({
        success: true,
        message: "Purchase Order was created successfully!",
        data: createPurchaseOrder,
      });
    } catch (err) {
      next(err);
    }
  }

  static async findAllOrdersByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const UserId: any = (<any>req).UserId;
      const findAllOrder = await Order.find({userId: UserId}).populate(
        "productId"
      );

      if (!findAllOrder) {
        throw {name: "NOT_FOUND"};
      }

      res.status(200).json({
        success: true,
        message: "All orders successfully displayed.",
        data: findAllOrder,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default OrderController;
