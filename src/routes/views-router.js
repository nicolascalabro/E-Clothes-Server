import express from "express";

import Product from "../models/product-model.js";

const viewsRouter = express.Router();

// ------------- Home Endpoint -------------
/*
viewsRouter.get("/", async (req, res) =>{
  try {
    const products = await Product.find().lean();
    res.render("home", {products});
  } catch (error) {
    res.render("error");
  }
});
*/

viewsRouter.get("/", async (req, res) =>{
  try {
    const limit = req.query.limit || 4;
    const page = req.query.page || 1;

    const productsData = await Product.paginate({}, {limit: limit, page: page, lean: true});   
    const products = productsData.docs;
    delete productsData.docs;

    const links = [];
    for(let i = 1; i <= productsData.totalPages; i++){
      links.push( { pageNumber: i, linkToPage: `?limit=${limit}&page=${i}` } );
    }
    
    res.render("home", {products, links});
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