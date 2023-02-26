import {Router} from "express";
import productController from "../controllers/productController";
import authMiddlewares from "../middlewares/authMiddlewares";

class ProductRoute {
  router: Router;

  constructor() {
    this.router = Router();
    this.route();
  }

  route(): void {
  
    this.router.get("/products", productController.findAllProduct);

    this.router.get("/products/:productId", productController.detailProduct );

    this.router.post("/products", authMiddlewares.adminAuthorization , productController.createProduct);

    this.router.put("/products/:productId", authMiddlewares.adminAuthorization, productController.editProduct);

    this.router.delete("/products/:productId", authMiddlewares.adminAuthorization, productController.deleteProduct);

   
  }
}

export default new ProductRoute().router;
