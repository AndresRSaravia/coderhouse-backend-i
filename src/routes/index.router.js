import {Router} from 'express';
import ProductManager from "../public/managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager('src/public/json/products.json');

// Métodos GET para productos
router.get('/',(req,res) => {
	console.log('Pedido viewer de listado de productos.');
	const products = productManager.readProducts()
	res.render('products',{products})
});

export default router;