const socket = io();
socket.emit('product', 'Me estoy comunicando desde un websocket.');

const titleInput = document.getElementById('titleInput');
const descriptionInput = document.getElementById('descriptionInput');
const codeInput = document.getElementById('codeInput');
const priceInput = document.getElementById('priceInput');
const statusInput = document.getElementById('statusInput');
const stockInput = document.getElementById('stockInput');
const categoryInput = document.getElementById('categoryInput');
const thumbnailsInput = document.getElementById('thumbnailsInput');
const sendProductButton = document.getElementById('sendProduct');
const productContainer = document.getElementById('productContainer');

titleInput.value = 'obj1'
descriptionInput.value = 'd1'
codeInput.value = 0
priceInput.value = 0
statusInput.value = 0
stockInput.value = 0
categoryInput.value = ''
thumbnailsInput.value = ''
sendProductButton.addEventListener('click', () => {
    let product = {}
	product['title'] = titleInput.value
	product['description'] = descriptionInput.value
	product['code'] = codeInput.value
	product['price'] = priceInput.value
	product['status'] = statusInput.value
	product['stock'] = stockInput.value
	product['category'] = categoryInput.value
	product['thumbnails'] = thumbnailsInput.value
	titleInput.value = 'obj1'
	descriptionInput.value = 'd1'
	codeInput.value = 0
	priceInput.value = 0
	statusInput.value = 0
	stockInput.value = 0
	categoryInput.value = ''
	thumbnailsInput.value = ''
    socket.emit('newProduct', product);
})

socket.on('loadProducts', (products)  => {
    products.forEach( (product) => {
        loadProduct(product);
    })
})

socket.on('newProduct', (product)  => {
    loadProduct(product);
})

function loadProduct(product){
    const productElement = document.createElement('p');
    productElement.textContent = `${product.title} (${product.id}): ${product.description} (${product.code}, ${product.category}) ($${product.price}, ${product.stock} unidades)`;
	const btn = document.createElement('button');
	btn.id = product.id
	btn.textContent = 'Borrar';
	btn.className = 'delete'
	btn.type = 'submit'
	btn.addEventListener('click', () => {
		socket.emit('deleteProduct', product.id);
	})
    productContainer.appendChild(productElement);
    productContainer.appendChild(btn);
}
