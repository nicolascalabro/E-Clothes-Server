import express from "express";
import http from "http";
import {engine} from "express-handlebars";
import {Server} from "socket.io";
import dotenv from "dotenv";

import apiRouter from "./routes/api-router.js";
import viewsRouter from "./routes/views-router.js";
import ProductManager from "./utils/ProductManager.js";
import connectMongoDB from "./config/db.js";
import { errorHandler } from "./middlewares/error-middleware.js";
//import __dirname from "../dirname.js";


// ------------- Dotenv Initialization -------------
dotenv.config();
//dotenv.config({path: __dirname + "/.env"});

// ------------- Server and Socket Creation -------------
const app = express();              
const server = http.createServer(app);          //Crea el server por fuera de express para implementar websocket
const io = new Server(server);                  //Crea el websocket

// ------------- Express Configuration -------------
app.use(express.json());
app.use(express.static("public"));              //Define a public como la raiz de los estaticos
//app.use(express.static(__dirname + "/public")); //Define a public como la raiz de los estaticos
app.use(express.urlencoded({entended: true}));  //Permite obtener los elementos de un formulario como un objeto

// ------------- Handlebars Configuration -------------
app.engine("handlebars", engine());             //Habilita el motor handlebars
app.set("view engine", "handlebars");           //Setea handlebars como motor de vistas, porque podemos tener varios
app.set("views", "./src/views");                //Setea la ruta de las vistas
//app.set("views", __dirname + "./src/views");  //Setea la ruta de las vistas

// ------------- MongoDB Connection -------------
connectMongoDB();

// ------------- Endpoints Handlers -------------
app.use("/api", apiRouter);
app.use("/", viewsRouter);

// ------------- Server-side websocket -------------
const productManager = new ProductManager("./src/utils/products.json");

//El metodo on escucha eventos. Connection es el evento de conexion de un cliente
io.on("connection", async (socket)=>{                 
    console.log("Nuevo cliente conectado");
    try {
        const products = await productManager.getProducts();
        socket.emit("all products", products);   //se emiten todos los productos al cliente especifico
    } catch (error) {
        console.log(error.message);
    }

    //Server recibe el id del producto que quiere borrar el cliente y emite el broadcast a todos los clientes.
    socket.on("delete product", async (prodId) => {
    try {
        const products = await productManager.deleteProductById(prodId); //se borra el producto y se obtienen todos los productos restantes
        io.emit("all products", products);     //se emiten todos los productos restantes a todos los clientes
    } catch (error) {
        console.log(error.message);
    }
    });

    //Server recibe el producto que quiere agregar el cliente y emite el broadcast a todos los clientes.
    socket.on("add product", async (product) => {  
        try {
            product.price = parseInt(product.price);
            product.status = product.status === 'True';
            product.stock = parseInt(product.stock);
            
            await productManager.addProduct(product); 
            io.emit("new product", product);    //se emite el nuevo producto a todos los clientes
        } catch (error) {
            console.log(error.message);
        }   
     });     
});

// ------------- Middleware Error Handler ------------
app.use(errorHandler);

// ------------- Server Startup -------------
server.listen(process.env.PORT, ()=>{
    console.log("Server started at port 8080");
});