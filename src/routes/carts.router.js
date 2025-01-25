import {Router} from 'express';
import CartManager from "../managers/CartManager.js";

const router = Router();
const cartManager = new CartManager('src/json/carts.json');

// Métodos GET para carritos
router.get('/:cid', function (req, res) {
	console.log('Id de carrito a buscar:', req.params.cid);
	const foundCart = cartManager.readCart(req.params.cid);
	if(!foundCart){
		return res.status(404).send({status: "error", error: "Carrito no encontrado."});
	}
	return res.send(foundCart.products);
});

// Métodos POST para carritos
router.post('/',(req,res) => {
	console.log('Pedido de creación de carrito.');
	cartManager.createCart()
	return res.json({message: 'Carrito agregado exitosamente.'});
});

// Métodos PUT para carritos
router.put('/:cid/product/:pid', (req,res) => {
	console.log('Id de carrito a actualizar:', req.params.cid);
	const foundCart = cartManager.updateCart(req.params.cid,req.params.pid);
	if(foundCart === -1){
		return res.status(404).send({status: "error", error: "Carrito no encontrado."})
	}
	return res.send({status: "success", message: "Carrito actualizado."});
});

// Métodos DELETE para carritos
router.delete('/:cid',(req,res) => {
	console.log('Id de carrito a eliminar:', req.params.cid);
	const foundCart = cartManager.deleteCart(req.params.cid)
	if(foundCart === -1){
		return res.status(404).send({status: "error", error: "Carrito no encontrado."})
	}
	return res.send({status: "success", message: "Carrito eliminado."});
});

export default router;