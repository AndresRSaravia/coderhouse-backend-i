import {Router} from 'express';
import ProductManager from "../public/managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager('src/public/json/products.json');

// Métodos GET para productos
router.get('/',(req,res) => {
	console.log('Pedido de listado de productos.');
	const products = productManager.readProducts()
	return res.json(products);
});

router.get('/:pid', function (req, res) {
	console.log('Id de producto a buscar:', req.params.pid);
	const foundProduct = productManager.readProduct(req.params.pid);
	if(!foundProduct){
		return res.status(404).send({status: "error", error: "Producto no encontrado."});
	}
	return res.send(foundProduct);
});

// Método POST para productos
router.post('/',(req,res) => {
	console.log('Pedido de creación de producto.');
	const newProduct = req.body;
	const incompleteValues1 = !newProduct.title||!newProduct.description||!newProduct.code||(newProduct.price == null)
	const incompleteValues2 = (newProduct.status == null)||(newProduct.stock == null)||!newProduct.category||!newProduct.thumbnails
	const incompleteValues = incompleteValues1||incompleteValues2
	if(incompleteValues){
		return res.status(400).send({status: "error", error: "Valores incompletos."});
	}
	productManager.createProduct(newProduct);
	return res.json({message: 'Producto agregado exitosamente.'});
});

// Método PUT para productos
router.put('/:pid', (req,res) => {
	console.log('Id de producto a actualizar:', req.params.pid);
	delete req.body.id;
	const index = productManager.updateProduct(req.params.pid,req.body);
	if(index === -1){
		return res.status(404).send({status: "error", error: "Producto no encontrado."})
	}
	return res.send({status: "success", message: "Producto actualizado."});
});

// Método DELETE para productos
router.delete('/:pid',(req,res) => {
	console.log('Id de producto a eliminar:', req.params.pid);
	const index = productManager.deleteProduct(req.params.pid);
	if(index == -1){
		return res.status(404).send({status: "error", error: "Producto no encontrado."});
	}
    return res.send({status: "success", message: "Producto eliminado."});
});

export default router;