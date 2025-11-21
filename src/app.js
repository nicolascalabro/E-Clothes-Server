import express from "express";
import ProductManager from "./ProductManager.js";
import CartManager from "./CartManager.js";

const app = express();
const productManager = new ProductManager("./src/products.json");
const cartManager = new CartManager("./src/carts.json");

app.use(express.json());

// ------------- Products Endpoint -------------

app.get("/api/products", async (req, res) =>{
    try {
        const products = await productManager.getProducts();
        res.status(200).json({message: "Products has been retrieved", products: products});

    } catch (error) {
        res.status(500).json({message: error.message});
    }    
});

app.get("/api/products/:prodid", async (req, res) =>{
    try {
        const prodId = req.params.prodid;
        const targetProduct = await productManager.getProductById(prodId);
        res.status(200).json({message: "Product has been retrieved", product: targetProduct});

    } catch (error) {
        res.status(500).json({message: error.message});
    }    
});

app.post("/api/products", async (req, res) =>{
    try {
        const product = req.body;
        const products = await productManager.addProduct(product);
        res.status(200).json({message: "Product has been added", products: products});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.put("/api/products/:prodid", async (req, res) => {
    try {
        const prodId = req.params.prodid;
        const updates = req.body;

        const products = await productManager.updateProductById(prodId, updates);
        res.status(200).json({message: "Product has been updated", products: products});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.delete("/api/products/:prodid", async (req, res) => {
    try {
        const prodId = req.params.prodid;
        const products = await productManager.deleteProductById(prodId);
        res.status(200).json({message: "Product has been deleted", products: products});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// ------------- Carts Endpoint -------------

app.get("/api/carts", async (req, res) =>{
    try {
        const carts = await cartManager.getCarts();
        res.status(200).json({message: "Carts has been retrieved", carts: carts});

    } catch (error) {
        res.status(500).json({message: error.message});
    }    
});

app.get("/api/carts/:cartid", async (req, res) =>{
    try {
        const cartId = req.params.cartid;
        const targetCart = await cartManager.getCartById(cartId);
        res.status(200).json({message: "Cart has been retrieved", cart: targetCart});

    } catch (error) {
        res.status(500).json({message: error.message});
    }    
});

app.post("/api/carts", async (req, res) =>{
    try {
        const carts = await cartManager.createCart();
        res.status(200).json({message: "Cart has been created", carts: carts});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post("/api/carts/:cartid/product/:prodid", async (req, res) =>{
    try {
        const cartId = req.params.cartid;
        const prodId = req.params.prodid;
        const carts = await cartManager.addProductToCart(cartId, prodId);
        res.status(200).json({message: "Product has been added to the cart", carts: carts});
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// ------------- Server Startup -------------

app.listen(8080, () => {
    console.log("Server started at port 8080");
});