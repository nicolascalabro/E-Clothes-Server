import Product from "../models/product-model.js"; 
import { throwHttpError } from "../utils/httpError.js";

export const getAllProducts = async (req, res, next) =>{
    try {
        const products = await Product.find().lean();
        res.status(200).json({message: "Products has been retrieved", payload: products});
    } catch (error) {
        next(error);
    }    
};

export const getProductById = async (req, res, next) =>{
    try {
        const prodId = req.params.prodid;
        console.log(prodId);
        const targetProduct = await Product.findById(prodId).lean();
        if(!targetProduct) throwHttpError("Product not found", 404);
        
        res.status(200).json({message: "Product has been retrieved", payload: targetProduct});

    } catch (error) {
        next(error);
    }    
};

export const addProduct = async (req, res, next) =>{
    try {
        const product = req.body;
        const newProduct = await Product.create(product);
        res.status(201).json({message: "Product has been added", payload: newProduct});

    } catch (error) {
        next(error);
    }
};

export const updateProductById = async (req, res, next) => {
    try {
        const prodId = req.params.prodid;
        const updates = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(prodId, updates, {new: true, runValidators: true});
        if(!updatedProduct) throwHttpError("Product not found", 404);

        res.status(200).json({message: "Product has been updated", payload: updatedProduct});

    } catch (error) {
        next(error);
    }
};

export const deleteProductById = async (req, res, next) => {
    try {
        const prodId = req.params.prodid;
        const deletedProduct = await Product.findByIdAndDelete(prodId);
        if(!deletedProduct) throwHttpError("Product not found", 404);

        res.status(200).json({message: "Product has been deleted", payload: deletedProduct});

    } catch (error) {
        next(error);
    }
};