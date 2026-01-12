import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minLength: 5,
            maxLength: 50
        },
        description: {
            type: String,
            required: true,
            minLength: 5,
            maxLength: 200
        },
        code: {
            type: String,
            required: true,
            trim: true,
            uppercase: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        status: {
            type: Boolean,
            required: true
        },
        stock: {
            type: Number,
            required: true,
            min: 0
        },
        category: {
            type: String,
            required: true,
            enum: ["Remeras","Buzos","Camperas", "Pantalones", "Vestidos", "Camisas", "Faldas", "Accesorios", "Calzados", "Chalecos"]
        },
        thumbnail: {
            type: String,
            trim: true,
            default: "product.jpg"
        }
    },
    {
        timestamps: true
    }
);

//Indices
productSchema.index({title: 1}, {unique: true});
productSchema.index({description: "text"});
productSchema.index({code: 1}, {unique: true});
productSchema.index({price: 1});
productSchema.index({category: 1});

//Plug-in de paginacion
productSchema.plugin(paginate);

const Product = mongoose.model("Product", productSchema);

export default Product;