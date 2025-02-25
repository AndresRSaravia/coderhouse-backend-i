import {Router} from 'express';
import cartModel from '../models/cart.model.js'

const router = Router();

// Métodos GET para carritos
router.get('/:cid', async (req, res) => {
	console.log('Id del carrito a buscar:', req.params.cid);
	try{
		const cid = req.params.cid;
		const foundCart = await cartModel.findOne({_id: cid});
		return res.send(foundCart);
	}catch(error){
		console.log(error)
		return res.status(500).send({status: 'error', error: 'Error al encontrar el carrito.'});
	}
});

// Métodos POST para carritos
router.post('/', async (req,res) => {
	try{
		console.log('Pedido de creación de carrito.');
		const newCart = new cartModel({'products': []})
		await newCart.save();
		return res.json({status: 'success', message: 'Carrito agregado exitosamente.'});
	}catch(error){
		console.log(error)
		return res.status(500).send({status: 'error', error: 'Error al crear un producto.'});
	}
});

// Métodos PUT para carritos
router.put('/:cid/products/:pid', async (req,res) => {
	console.log('Id del carrito a actualizar:', req.params.cid);
	console.log('Id del producto a agregar:', req.params.pid);
	try{
		const cid = req.params.cid;
		const foundCart = await cartModel.findOne({_id: cid});
		if (!foundCart) {
			return res.status(404).send({status: "error", error: "Carrito no encontrado."})
		}
		const pid = req.params.pid;
		const pindex = foundCart.products.findIndex(p => p._id === pid.toString());
		if(pindex === -1){
			const product = {
				"_id": pid.toString(),
				"quantity": 1
			};
			(foundCart.products).push(product);
		}else{
			foundCart.products[pindex].quantity += 1;
		}
		const result = await cartModel.updateOne({_id:cid}, foundCart);
		return res.send({status: "success", message: "Producto agregado al carrito.", payload: result});
	}catch(error){
		console.log(error)
		return res.status(500).send({status: 'error', error: 'Error al actualizar el carrito.'});
	}
});

// Métodos DELETE para carritos
router.delete('/:cid', async (req,res) => {
	console.log('Id del carrito a eliminar:', req.params.cid);
	try{
		const cid = req.params.cid;
		const foundCart = await cartModel.findOne({_id: cid});
		if (!foundCart) {
			return res.status(404).send({status: "error", error: "Carrito no encontrado."})
		}
		const result = await cartModel.deleteOne({_id: cid});
		return res.send({status:'success', message: 'Carrito eliminado.', payload: result});
	}catch(error){
		console.log(error)
		return res.status(500).send({status: 'error', error: 'Error al borrar el carrito.'});
	}
});

router.delete('/:cid/products/:pid', async (req,res) => {
	console.log('Id del carrito a actualizar:', req.params.cid);
	console.log('Id del producto a eliminar:', req.params.pid);
	try{
		const cid = req.params.cid;
		const foundCart = await cartModel.findOne({_id: cid});
		if (!foundCart) {
			return res.status(404).send({status: "error", error: "Carrito no encontrado."})
		}
		const pid = req.params.pid;
		const pindex = foundCart.products.findIndex(p => p._id === pid.toString());
		if(pindex === -1){
			return res.status(404).send({status: "error", error: "Producto en el carrito no encontrado."})
		}else{
			foundCart.products.splice(pindex,1);
		}
		const result = await cartModel.updateOne({_id:cid}, foundCart);
		return res.send({status: "success", message: "Producto eliminado del carrito.", payload: result});
	}catch(error){
		console.log(error)
		return res.status(500).send({status: 'error', error: 'Error al borrar el producto del carrito.'});
	}
});

export default router;