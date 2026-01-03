import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        products: Array
    },
    {
        timestamps: true
    }
);  

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;