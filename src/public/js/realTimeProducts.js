import ProductManager from "../managers/ProductManager.js";
const productManager = new ProductManager('src/public/json/products.json');

const socket = io();
socket.emit('message', 'Me estoy comunicando desde un websocket.');

const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessage');
const messageContainer = document.getElementById('messageContainer');

sendMessageButton.addEventListener('click', () => {
    const message = messageInput.value;
    socket.emit('newMessage', message);
    messageInput.value = '';
})

socket.on('loadMessages', (messages)  => {
    messages.forEach( (message ) => {
        cargarMensaje(message);
    })
})

socket.on('newMessage', (message)  => {
    cargarMensaje(message);
})

function cargarMensaje(message){
    const messageElement = document.createElement('p');
    messageElement.textContent = `${message.socketid} : ${message.message}`;
    messageContainer.appendChild(messageElement);
}



const titleInput = document.getElementById('titleInput');
const descriptionInput = document.getElementById('descriptionInput');
const codeInput = document.getElementById('codeInput');
const priceInput = document.getElementById('priceInput');
const statusInput = document.getElementById('statusInput');
const stockInput = document.getElementById('stockInput');
const categoryInput = document.getElementById('categoryInput');
const thumbnailsInput = document.getElementById('thumbnailsInput');
const sendProductButton = document.getElementById('sendProduct');

sendProductButton.addEventListener('click', () => {
    const product = {}
	product['title'] = titleInput.value
	product['description'] = descriptionInput.value
	product['code'] = codeInput.value
	product['price'] = priceInput.value
	product['status'] = statusInput.value
	product['stock'] = stockInput.value
	product['category'] = categoryInput.value
	product['thumbnails'] = thumbnailsInput.value
	titleInput.value = ''
	descriptionInput.value = ''
	codeInput.value = ''
	priceInput.value = ''
	statusInput.value = ''
	stockInput.value = ''
	categoryInput.value = ''
	thumbnailsInput.value = ''
    socket.emit('newProduct', product);
})

socket.on('loadMessages', (messages)  => {
    messages.forEach( (message ) => {
        cargarMensaje(message);
    })
})

socket.on('newProduct', (product)  => {
    cargarMensaje(message);
})

function cargarMensaje(message){
    const messageElement = document.createElement('p');
    messageElement.textContent = `${message.socketid} : ${message.message}`;
    messageContainer.appendChild(messageElement);
}


