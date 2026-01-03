import express from "express";

import {getAllProducts, getProductById, addProduct, updateProductById, deleteProductById} from "../controllers/products-controllers.js";
import {getAllCarts, getCartById, addCart} from "../controllers/carts-controllers.js";

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

/*
apiRouter.post("/carts/:cartid/product/:prodid", async (req, res) =>{
    try {
        const cartId = req.params.cartid;
        const prodId = req.params.prodid;
        const carts = await cartManager.addProductToCart(cartId, prodId);
        res.status(200).json({message: "Product has been added to the cart", carts: carts});
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
*/

export default apiRouter;