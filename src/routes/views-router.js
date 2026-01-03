import express from "express";

import ProductManager from "../utils/ProductManager.js";

const viewsRouter = express.Router();
const productManager = new ProductManager("./src/utils/products.json");

// ------------- Views Endpoint -------------

viewsRouter.get("/", async (req, res) =>{
  try {
    const products = await productManager.getProducts();

    res.render("home", {products});
  } catch (error) {
    res.render("error");
    console.log(error.message);
  }
});


// ------------- Realtime Products Endpoints -------------
viewsRouter.get("/realtimeproducts", async (req, res) =>{
  try {
    res.render("realtimeproducts");
  } catch (error) {
    res.render("error");
    console.log(error.message);
  }
})

export default viewsRouter;