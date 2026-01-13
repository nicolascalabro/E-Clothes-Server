import express from "express";

import {getAllProducts, getProductById, addProduct, updateProductById, deleteProductById} from "../controllers/products-controllers.js";
import {getAllCarts, getCartById, addCart, deleteCartById, addProductToCart, deleteProductFromCart} from "../controllers/carts-controllers.js";

const apiRouter = express.Router();

// ------------- Products Endpoints -------------
apiRouter.get("/products", getAllProducts);
apiRouter.get("/products/:prodid", getProductById);
apiRouter.post("/products", addProduct);
apiRouter.put("/products/:prodid", updateProductById);
apiRouter.delete("/products/:prodid", deleteProductById);

// ------------- Carts Endpoints -------------
apiRouter.get("/carts", getAllCarts);
apiRouter.get("/carts/:cartid", getCartById);
apiRouter.post("/carts", addCart);
apiRouter.delete("/carts/:cartid", deleteCartById);
apiRouter.post("/carts/:cartid/product/:prodid", addProductToCart);
apiRouter.delete("/carts/:cartid/product/:prodid", deleteProductFromCart);

export default apiRouter;