import express from "express";
import ProductManager from "../utils/ProductManager.js";
import CartManager from "../utils/CartManager.js";

const apiRouter = express.Router();
const productManager = new ProductManager("./src/utils/products.json");
const cartManager = new CartManager("./src/utils/carts.json");

// ------------- Products Endpoints -------------
apiRouter.get("/products", async (req, res) =>{
    try {
        const products = await productManager.getProducts();
        res.status(200).json({message: "Products has been retrieved", products: products});

    } catch (error) {
        res.status(500).json({message: error.message});
    }    
});

apiRouter.get("/products/:prodid", async (req, res) =>{
    try {
        const prodId = req.params.prodid;
        const targetProduct = await productManager.getProductById(prodId);
        res.status(200).json({message: "Product has been retrieved", product: targetProduct});

    } catch (error) {
        res.status(500).json({message: error.message});
    }    
});

apiRouter.post("/products", async (req, res) =>{
    try {
        const product = req.body;
        const products = await productManager.addProduct(product);
        res.status(200).json({message: "Product has been added", products: products});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

apiRouter.put("/products/:prodid", async (req, res) => {
    try {
        const prodId = req.params.prodid;
        const updates = req.body;

        const products = await productManager.updateProductById(prodId, updates);
        res.status(200).json({message: "Product has been updated", products: products});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

apiRouter.delete("/products/:prodid", async (req, res) => {
    try {
        const prodId = req.params.prodid;
        const products = await productManager.deleteProductById(prodId);
        res.status(200).json({message: "Product has been deleted", products: products});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// ------------- Carts Endpoints -------------
apiRouter.get("/carts", async (req, res) =>{
    try {
        const carts = await cartManager.getCarts();
        res.status(200).json({message: "Carts has been retrieved", carts: carts});

    } catch (error) {
        res.status(500).json({message: error.message});
    }    
});

apiRouter.get("/carts/:cartid", async (req, res) =>{
    try {
        const cartId = req.params.cartid;
        const targetCart = await cartManager.getCartById(cartId);
        res.status(200).json({message: "Cart has been retrieved", cart: targetCart});

    } catch (error) {
        res.status(500).json({message: error.message});
    }    
});

apiRouter.post("/carts", async (req, res) =>{
    try {
        const carts = await cartManager.createCart();
        res.status(200).json({message: "Cart has been created", carts: carts});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

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

export default apiRouter;