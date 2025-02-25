import {Router} from 'express';
import productModel from '../models/product.model.js'
import cartModel from '../models/cart.model.js'

const router = Router();

// Métodos GET para productos
router.get('/', async (req,res) => {
	console.log('Pedido viewer de listado de productos de un carrito.');
	console.log('Id del carrito a buscar:', '67bcf226a8b70c7517b44185');
	try{
		const cid = '67bcf226a8b70c7517b44185';
		const foundCart = await cartModel.findOne({_id: cid}).lean();
		const products = foundCart.products
		return res.render('cartproducts',{products,cid});
	}catch(error){
		console.log(error)
		return res.status(500).send({status: 'error', error: 'Error al encontrar el carrito.'});
	}
});

export default router;