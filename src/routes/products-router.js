import express from "express";
import ProductManager from "../ProductManager.js"
import uploader from "../utils/uploader.js";

const productsRouter = express.Router();
const productManager = new ProductManager("./src/products.json");

// ------------- Products Endpoints -------------
productsRouter.post("/", uploader.single("thumbnailFile"), async (req, res) =>{
  try {
    const title = req.body.title;
    const description = req.body.description;
    const code = req.body.code;
    const price = parseFloat(req.body.price);
    const status = req.body.status === "true";
    const stock = parseInt(req.body.stock);
    const category = req.body.category;
    const thumbnails = "/media/imgs/" + req.file.filename;

    await productManager.addProduct({title, description, code, price, status, stock, category, thumbnails});  

    res.redirect("/dashboard");
  } catch (error) {
    res.render("error");
    console.log(error.message);
  }
  
});

export default productsRouter;