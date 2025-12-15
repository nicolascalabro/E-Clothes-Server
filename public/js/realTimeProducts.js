// ------------- Client-side websocket -------------

//El cliente inicia la conexion con el server (Emite el evento de conexion que captura el server)
const socket = io();   

//El cliente recibe todos los productos cuando se conecta o cuando borra un producto, y los inyecta en su html
socket.on("all products", (data) => {
    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = "";
    data.forEach((prod) => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        const img = document.createElement("img");
        img.classList.add("product-image");
        img.src = prod.thumbnails;

        const title = document.createElement("h2");
        title.classList.add("product-title");
        title.textContent = prod.title;

        const price = document.createElement("h3");
        price.classList.add("product-price");
        price.textContent = prod.price;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("form-button");
        deleteButton.textContent = "Delete";
        deleteButton.value = prod.id;

        deleteButton.addEventListener("click", (event) => {
            socket.emit("delete product", prod.id); 
        });

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(deleteButton);
        
        productGrid.appendChild(card);
    });
});

//Cliente envia el formulario al server al hacer post
const formProduct = document.getElementById("formProduct");
const inputTitle = document.getElementById("inputTitle");
const inputPrice = document.getElementById("inputPrice");

formProduct.addEventListener("submit", (event) => {
    const title = inputTitle.value;
    const price = inputPrice.value;

    socket.emit("add product", {title: title, price: price}); 
});

//Cliente recibe el broadcast y lo inserta en su html
socket.on("broadcast new product", (data) => {
    console.log(data);
    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = "";

    const card = document.createElement("div");
    card.classList.add("product-card");

    //const img = document.createElement("img");
    //img.classList.add("product-image");
    //img.src = prod.thumbnails;

    const title = document.createElement("h2");
    title.classList.add("product-title");
    title.textContent = prod.title;

    const price = document.createElement("h3");
    price.classList.add("product-price");
    price.textContent = prod.price;

    //card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);

    productGrid.appendChild(card); 
});
