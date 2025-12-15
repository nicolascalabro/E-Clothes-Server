import fs from "fs/promises";
import crypto from "crypto";

class ProductManager{

    constructor(pathFile){
        this.pathFile = pathFile;
    }
   
    generateID(){
        return crypto.randomUUID();
    }

    async getProducts(){
        try {
            const fileData = await fs.readFile(this.pathFile, "utf-8");
            const products = JSON.parse(fileData);
            return products;       

        } catch (error) {
            throw new Error (`Error while retriving products: ${error.message}`);
        }
    }

    async getProductById(prodId){
        try {
            const products = await this.getProducts();
            const targetProduct = products.find((prod) => prod.id === prodId);
            return targetProduct;

        } catch (error) {
            throw new Error (`Error while retriving the product: ${error.message}`);
        }
    }

    async addProduct(product){
        try {
            const productId = this.generateID();
            product = { id: productId, ...product };

            const products = await this.getProducts();
            products.push(product);         
            
            await fs.writeFile(this.pathFile, JSON.stringify(products, null, 2), "utf-8");
            return products;

        } catch (error) {
            throw new Error (`Error while adding the product: ${error.message}`);
        }

    }

    async updateProductById(prodId, updates){
        try {
            if (updates.id ) throw new Error("The ID can not be updated");

            const products = await this.getProducts();
            const indexProduct = products.findIndex((prod) => prod.id === prodId);
            if (indexProduct === -1) throw new Error("Product does not exist");

            products[indexProduct] = {...products[indexProduct], ...updates};
            
            await fs.writeFile(this.pathFile, JSON.stringify(products, null, 2), "utf-8");
            return products;

        } catch (error) {
            throw new Error (`Error while updating the product: ${error.message}`);
        }
    }
    
    async deleteProductById(prodId){
        try {
            const products = await this.getProducts();
            const filteredProducts = products.filter((prod) => prod.id !== prodId);

            await fs.writeFile(this.pathFile, JSON.stringify(filteredProducts, null, 2), "utf-8");
            return filteredProducts;
            
        } catch (error) {
            throw new Error (`Error while deleting the product: ${error.message}`);
        }
    }
}

export default ProductManager;