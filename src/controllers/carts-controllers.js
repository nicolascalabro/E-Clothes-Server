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
        res.status(200).json({message: "Cart has been retrieved", payload: targetCart});

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

export const addProductToCart = async (req, res, next) => {
    try {
        const cartId = req.params.cartid;
        const prodId = req.params.prodid;

        //Primero se intenta incrementar el producto
        let cart = await Cart.findOneAndUpdate(
            {
                //Objeto de filtrado
                _id: cartId,
                "products.product": prodId
            }, 
            {
                //Operacion
                $inc: {"products.$.quantity": 1 }
            }, 
            {
                //Options
                new: true
            }    
        );

        //Si el producto no esta en el carrito, se ahdiere
        if (!cart){
            cart = await Cart.findByIdAndUpdate(
                cartId,
                {
                    $push: {
                        products: {product: prodId, quantity: 1}
                    }
                },
                {
                    new: true
                }
            );
        };

        if(!cart) throwHttpError("Cart not found", 404);
        res.status(200).json({message: "Product has been updated or added to cart", payload: cart});

    } catch (error) {
         next(error);
    }
}