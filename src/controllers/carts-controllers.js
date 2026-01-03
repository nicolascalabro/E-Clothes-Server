import Cart from "../models/cart-model.js"; 
import { throwHttpError } from "../utils/httpError.js";

export const getAllCarts = async (req, res, next) =>{
    try {
        const carts = await Cart.find().lean();   //EL metodo lean limpia metadata que trae find
        res.status(200).json({message: "Carts has been retrieved", payload: carts});
    } catch (error) {
        next(error);
    }    
};

export const getCartById = async (req, res, next) =>{
    try {
        const cartId = req.params.cartid;
        const targetCart = await Cart.findById(cartId).lean();
        if(!targetCart) throwHttpError("Product not found", 404);

        res.status(200).json({message: "Cart has been retrieved", cart: targetCart});

    } catch (error) {
        next(error);
    }    
};

export const addCart = async (req, res, next) =>{
    try {
        const cart = req.body;
        const newCart = await Cart.create(cart);
        res.status(201).json({message: "Cart has been created", payload: newCart});

    } catch (error) {
        next(error);
    }
};