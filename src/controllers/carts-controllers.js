import Cart from "../models/cart-model.js"; 
import Product from "../models/product-model.js";
import { throwHttpError } from "../utils/httpError.js";

export const getAllCarts = async (req, res, next) =>{
    try {
        const carts = await Cart.find().lean();   //EL metodo lean limpia metadata que trae find
        res.status(200).json({status: "Success", message: "Carts has been retrieved", payload: carts});
    } catch (error) {
        next(error);
    }    
};

export const getCartById = async (req, res, next) =>{
    try {
        const cartId = req.params.cartid;
        const targetCart = await Cart.findById(cartId).populate("products.product");
        if(!targetCart) throwHttpError("Cart not found", 404);
        res.status(200).json({status: "Success", message: "Cart has been retrieved", payload: targetCart});

    } catch (error) {
        next(error);
    }    
};

export const addCart = async (req, res, next) =>{
    try {
        const newCart = await Cart.create({});
        res.status(201).json({status: "Success", message: "Cart has been created", payload: newCart});

    } catch (error) {
        next(error);
    }
};

export const deleteCartById = async (req, res, next) => {
    try {
        const cartId = req.params.cartid;
        const deletedCart = await Cart.findByIdAndDelete(cartId);
        if(!deletedCart) throwHttpError("Cart not found", 404);

        res.status(200).json({status: "Success", message: "Cart has been deleted", payload: deletedCart});

    } catch (error) {
        next(error);
    }
};


export const addProductToCart = async (req, res, next) => {
    try {
        const cartId = req.params.cartid;
        const prodId = req.params.prodid;
        const quantity  = Number(req.body.quantity) || 1;

        //Verifica si el carrito existe
        const targetCart = await Cart.findById(cartId).lean();
        if(!targetCart) throwHttpError("Cart not found", 404);

        //Verifica si el producto existe
        const targetProduct = await Product.findById(prodId).lean();
        if(!targetProduct) throwHttpError("Product not found", 404);

        //Verifica si el carrito contiene el producto y actualiza la cantidad
        let updatedCart = await Cart.findOneAndUpdate(
            {
                //Objeto de filtrado
                _id: cartId,
                "products.product": prodId
            }, 
            {
                //Operacion
                $inc: {"products.$.quantity": quantity}
            }, 
            {
                //Options
                new: true,
                runValidators: true
            }    
        );

        //Si el producto no esta en el carrito, se adhiere
        if (!updatedCart){
            updatedCart = await Cart.findByIdAndUpdate(
                cartId,
                {
                    $push: {
                        products: {product: prodId, quantity: quantity}
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            );
        };

        res.status(200).json({status: "Success", message: "Product has been updated or added to the cart", payload: updatedCart});

    } catch (error) {
        next(error);
    }
}