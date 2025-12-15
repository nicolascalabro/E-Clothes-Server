import express from "express";
import ProductManager from "../utils/ProductManager.js";
import uploader from "../utils/uploader.js";

const viewsRouter = express.Router();
const productManager = new ProductManager("./src/utils/products.json");

// ------------- Views Endpoint -------------
viewsRouter.get("/", async (req, res) =>{
  try {
    const user = {username: "NicoDev", isAdmin: true};
    const products = await productManager.getProducts();

    res.render("home", {products, user});
  } catch (error) {
    res.render("error");
    console.log(error.message);
  }
});

// ------------- Realtime Products Endpoints -------------
viewsRouter.get("/realtimeproducts", (req, res) =>{
  try {
    res.render("realtimeproducts");
  } catch (error) {
    res.render("error");
    console.log(error.message);
  }
})

viewsRouter.post("/realtimeproducts", uploader.single("thumbnailFile"), async (req, res) =>{
  try {
    const title = req.body.title;
    const description = req.body.description;
    const code = req.body.code;
    const price = parseInt(req.body.price);
    const status = req.body.status === "true";
    const stock = parseInt(req.body.stock);
    const category = req.body.category;
    const thumbnails = "/media/imgs/" + req.file.filename;

    await productManager.addProduct({title, description, code, price, status, stock, category, thumbnails});  
    res.redirect("/realtimeproducts");
    
  } catch (error) {
    res.render("error");
    console.log(error.message);
  }
});

export default viewsRouter;