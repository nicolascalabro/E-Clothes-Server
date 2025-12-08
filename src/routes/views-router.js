import express from "express";
import ProductManager from "../ProductManager.js"

const viewsRouter = express.Router();
const productManager = new ProductManager("./src/products.json");

// ------------- Views Endpoint -------------
viewsRouter.get("/home", (req, res) =>{
  res.render("home");
});

viewsRouter.get("/dashboard", async (req, res) =>{
  try {
    const user = {username: "NicoDev", isAdmin: true};
    const products = await productManager.getProducts();

    res.render("dashboard", {products, user});
  } catch (error) {
    res.render("error");
    console.log(error.message);
  }
});

export default viewsRouter;