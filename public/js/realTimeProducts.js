// ------------- Client-side websocket -------------

//El cliente inicia la conexion con el server (Emite el evento de conexion que captura el server)
const socket = io();  

const formProduct = document.getElementById("formProduct");
const productGrid = document.getElementById("productGrid");

function createProductCard(prod) {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const title = document.createElement("h2");
    title.classList.add("product-title");
    title.textContent = `Titulo: ${prod.title}`;

    const description = document.createElement("h2");
    description.classList.add("product-title");
    description.textContent = `Descripcion: ${prod.description}`;

    const price = document.createElement("h3");
    price.classList.add("product-price");
    price.textContent = `Precio: $${prod.price}`; 

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("form-button");
    deleteButton.textContent = "Eliminar Producto";
    deleteButton.value = prod._id;

    deleteButton.addEventListener("click", (event) => {
        socket.emit("delete product", prod._id); 
    });

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(deleteButton);

    return card;
}

//El cliente recibe todos los productos cuando se conecta o cuando borra un producto , y los inyecta en su html
socket.on("all products", (data) => {
    productGrid.innerHTML = "";
    data.forEach((prod) => {
        const card = createProductCard(prod);
        productGrid.appendChild(card);
    });
});

//Cliente envia el formulario al server al hacer el post
formProduct.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(formProduct);
    const product = {};

    formData.forEach((value, key) => {
        product[key] = value;
    });

    socket.emit("add product", product); 
});

//El cliente recibe el nuevo producto y lo inserta en su html
socket.on("new product", (newProduct) => {
    const card = createProductCard(newProduct);
    productGrid.appendChild(card);
});