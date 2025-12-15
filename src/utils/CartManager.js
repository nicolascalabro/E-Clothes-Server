import fs from "fs/promises";
import crypto from "crypto";

class CartManager{

    constructor(pathFile){
        this.pathFile = pathFile;
    }
   
    generateID(){
        return crypto.randomUUID();
    }

    async getCarts(){
        try {
            const fileData = await fs.readFile(this.pathFile, "utf-8");
            const carts = JSON.parse(fileData);
            return carts;       

        } catch (error) {
            throw new Error (`Error while retriving carts: ${error.message}`);
        }
    }

    async getCartById(cartId){
        try {
            const carts = await this.getCarts();
            const targetCart = carts.find((cart) => cart.id === cartId);
            return targetCart;

        } catch (error) {
            throw new Error (`Error while retriving the cart: ${error.message}`);
        }
    }
   
    async createCart(){
        try {
            const cartId = this.generateID();
            const newCart = { id: cartId, products: [] };

            const carts = await this.getCarts();
            carts.push(newCart);         
            
            await fs.writeFile(this.pathFile, JSON.stringify(carts, null, 2), "utf-8");
            return carts;

        } catch (error) {
            throw new Error (`Error while creating the cart: ${error.message}`);
        }
    }

    async addProductToCart(cartId, prodId){
        try {
            const carts = await this.getCarts();
            const indexCart = carts.findIndex((cart) => cart.id === cartId);
            if (indexCart === -1) throw new Error("Cart does not exist");

            const indexProd = carts[indexCart].products.findIndex((prod) => prod.id === prodId);
            
            if (indexProd === -1){
                carts[indexCart].products.push({id: prodId, quantity: 1});         
            }else{
                const currQuantity = carts[indexCart].products[indexProd].quantity;
                carts[indexCart].products[indexProd].quantity = currQuantity + 1;
            }           

            await fs.writeFile(this.pathFile, JSON.stringify(carts, null, 2), "utf-8");
            return carts;
            
        } catch (error) {
            throw new Error (`Error while adding the product to the cart: ${error.message}`);
        }
    }
}

export default CartManager;