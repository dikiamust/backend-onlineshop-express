import {Product} from "../models/ProductModel";
import {NextFunction, Request, Response} from "express";

class ProductController {
  static async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, stock, imageUrl, description } = req.body;
      if (!name || !price || !stock || !imageUrl || !description) {
        throw {name: "REQUIRED"};
      }

      if ( price < 0 || stock < 0 ) {
        throw {name: "INVALID_INPUT"};
      }

      const createProduct = await Product.create({
        name,
        price,
        stock,
        imageUrl,
        description
      });

      res.status(201).json({
        success: true,
        message: "Product was created successfully!",
        data: createProduct,
      });
    } catch (err) {
      next(err);
    }
  }

  static async detailProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      const searchProduct = await Product.findById(productId);
      if (!searchProduct) {
        throw {name: "NOT_FOUND"};
      } else {
        res.status(200).json({
          success: true,
          message: "Product found",
          data: searchProduct,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async editProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const {name, price, stock, imageUrl, description} = req.body;
      const { productId } = req.params;
     
      for (const key in req.body) {
        if (!req.body[key]) {
          delete req.body[key];
        }
      }
      const edit = await Product.findByIdAndUpdate(
        productId,
        req.body,
        {new: true}
      );

      if(edit === null) {
        throw {name: "PRODUCT_NOT_FOUND"};
      }

      res.status(200).json({
        success: true,
        message: "successfully updated this product",
        data: edit,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      const deleteProduct = await Product.findByIdAndDelete(productId);
      if(deleteProduct === null) {
        throw {name: "PRODUCT_NOT_FOUND"};
      }
      res.status(200).json({
        success: true,
        message: "success to delete this product",
        data: deleteProduct,
      });
    } catch (err) {
      next(err);
    }
  }

  static async findAllProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const findAllProduct = await Product.find();
      if (findAllProduct.length > 0) {
        res.status(200).json({
          success: true,
          message: "All products have been displayed.",
          totalProduct: findAllProduct.length,
          data: findAllProduct,
        });
      } else {
        throw {name: "NOT_FOUND"};
      }
    } catch (err) {
      next(err);
    }
  }
}

export default ProductController;
