import express from "express";

import Product from "../models/product-model.js";

const viewsRouter = express.Router();

// ------------- Home Endpoint -------------
viewsRouter.get("/", async (req, res) =>{
  try {
    const products = await Product.find().lean();
    res.render("home", {products});
  } catch (error) {
    res.render("error");
  }
});

// ------------- Realtime Products Endpoint -------------
viewsRouter.get("/realtimeproducts", async (req, res) =>{
  try {
    res.render("realtimeproducts");
  } catch (error) {
    res.render("error");
  }
})

export default viewsRouter;